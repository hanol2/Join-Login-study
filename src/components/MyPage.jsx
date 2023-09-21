import React, { useState, useRef } from 'react'
import { Table, Button, Form, Modal, Row, Col } from 'react-bootstrap'
import axios from '../axios';

const MyPage = () => {

  const userObj = JSON.parse(sessionStorage.getItem('user'));

  const pwRef = useRef();
  const setPwRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();
  const changeBtn = useRef();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const changePWD = (e) => {
    e.preventDefault();
    console.log('changePWD function')
    console.log(setPwRef.current.value)
    axios.post('/user/checkPW', {
      id: userObj.user_name,
      pw: userObj.pw,
      setPw: setPwRef.current.value,
    }).then(res => {
      console.log(res.data)
      if (res.data.msg == "success") {
        alert("비밀번호 수정 성공!");
        changeBtn.current.disabled = true;
        window.location.href = '/mypage'
      } else {
        alert("다시 확인해주세요!");
        window.location.href = '/mypage'
      }
    })
  }

  const handleModify = (e) => {
    e.preventDefault();
    console.log('handleModify function')
     axios.post('/user/modify', {
      id: userObj.user_name,
      pw: pwRef.current.pw,
      setPw: setPwRef.current.value,
    })
    // .then(res => {
    //   console.log(res.data)
    //   if (res.data.msg == "success") {
    //     alert("회원정보 수정 성공!");
    //     window.location.href = '/main'
    //   } else {
    //     alert("다시 확인해주세요!");
    //     window.location.href = '/mypage'
    //   }
    // })
  }

  return (
    <div className="main-body">
      <h1>마이페이지</h1>
      <div align="center">
        <Table striped="columns">
          <tbody align="center">
            <tr>
              <td>ID</td>
              <td>{userObj.user_name}</td>
            </tr>
            <tr>
              <td>비밀번호</td>
              <td>
                <div className="d-grid gap-2" >
                  <Button 
                    ref={changeBtn}
                    variant="light"
                    size="sm"
                    onClick={handleShow}
                  > 비밀번호 변경
                  </Button>
                </div>
              </td>
            </tr>
            <tr>
              <td>이름</td>
              <td>
                <Form.Control
                  ref={nameRef}
                  defaultValue={userObj.user_name}
                  type="text"
                  size="sm"
                />
              </td>
            </tr>
            <tr>
              <td>email</td>
              <td>
                <Form.Control
                  ref={emailRef}
                  defaultValue={userObj.address}
                  type="text"
                  size="sm"

                />
              </td>
            </tr>
          </tbody>
        </Table>
        <Row>
          <Col>
            <div className='d-grid gap mb-3'>
              <Button variant="info" size="lg" onClick={handleModify}>
                수정완료
              </Button>
            </div>
          </Col>
        </Row>
      </div>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>비밀번호 수정</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>현재 비밀번호</Form.Label>
          <Form.Control type="password" size="sm" ref={pwRef}/>
          <Form.Label>바꿀 비밀번호</Form.Label>
          <Form.Control type="password" size="sm" ref={setPwRef} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="info" onClick={changePWD}>
            비밀번호 수정
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default MyPage