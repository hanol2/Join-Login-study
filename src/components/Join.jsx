import React,{useRef, useState} from 'react'
import { Form, Button } from 'react-bootstrap';
import axios from '../axios';

const Join = () => {
  const idRef = useRef();
  const pwRef = useRef();
  const pw2Ref = useRef();
  const nameRef = useRef();
  const addRef = useRef();
  
  const spanRef = useRef();
  const span2Ref = useRef();

  const [text, setText] = useState();

  /** 아이디의 중복을 체크해주는 함수*/ 
  const checkId = ()=>{
    console.log('check id function', idRef.current.value)
    // 입력한 아이디가 있는 경우
    if (idRef.current.value !== ""){
      // 중복체크 시작
      axios.post('/user/checkId', {
            id : idRef.current.value
      })
      .then(res => {
        console.log('중복 체크 결과', res.data.result)
        if(res.data.result == "uniq"){
          // 만약 ID가 uniq한 아이디라면, 더이상 유저가 해당 내용을 수정X
          idRef.current.disabled = true;
          spanRef.current.style.color = 'green';
          setText("사용가능한 ID입니다")
        } else {
          idRef.current.value = "";
          setText("중복된 ID입니다. 다른 ID를 사용해주세요!")
        }
      })
    }
  }
  
  /** 회원가입을 진행하는 함수 */
  const handleJoin =(e)=>{
    e.preventDefault(); //페이지 이동을 막아주기
    console.log('handle join function');
    console.log(idRef.current.value)

    if (pwRef.current.value == pw2Ref.current.value){
      span2Ref.current.innerText = "";
      // 회원가입 로직 시작
      axios.post('/user/join', {
            id : idRef.current.value,
            pw : pwRef.current.value,
            name : nameRef.current.value,
            address : addRef.current.value
      })
      .then( res => {
        console.log(res.data)
        if(res.data.msg == "success"){
          alert("환영합니다");
          window.location.href="/"
        } else {
          alert("다시한번 확인해주세요");
          window.location.href="/join"
        }
      })
    }else{
      // 비번 다시 적어
      span2Ref.current.style.color = 'red';
      span2Ref.current.innerText = "※비밀번호를 다시 확인해주세요!";
    }
  }

  return (
    <div>
      <h1>회원가입</h1>
      <hr />
      <Form onSubmit={handleJoin}>
        <Form.Group className="mb-3" controlId="formBasicId">
          <Form.Label>ID</Form.Label>
          <Form.Control type="text" placeholder="Enter Id" ref={idRef}/>
        </Form.Group>

        <div className='d-grid gap-2 mb-3'>
        <Button variant='light' onClick={checkId}>중복체크</Button>
          <span ref={spanRef} style = {{color : 'red'}}>{text}</span>

        </div>
        <Form.Group className="mb-3" controlId="formBasicPw1">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control type="password" placeholder="Enter Password" ref={pwRef}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPw2">
          <Form.Label>비밀번호 확인</Form.Label>
          <Form.Control type="password" placeholder="Confirm Password" ref={pw2Ref} />
        </Form.Group>
          <span ref={span2Ref} style = {{color : 'red'}}></span>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>이름</Form.Label>
          <Form.Control type="text" placeholder="Enter Name" ref={nameRef} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>이메일주소</Form.Label>
          <Form.Control type="email" placeholder="Enter Email" ref={addRef}/>
        </Form.Group>

        <div className='d-grid gap-2 mb-3'>
        <Button variant='info' type='submit'>회원가입</Button>
        </div>

      </Form>
    </div>
  )
}

export default Join