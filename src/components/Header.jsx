import React from 'react'
import { Card, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {

  /** 로그아웃하는 함수*/
  const handleLogout = () => {
    console.log('logout')

    // sessionStorage.removeItem('user)
    // ==> "undefined"

    sessionStorage.setItem('user', null);
    window.location.href = "/main"

  }

  return (
    <Card.Header>
      <Nav variant="tabs">
        <Link to="/main">
          <Button variant='light'>Main</Button>
        </Link>


        {JSON.parse(sessionStorage.getItem('user')) == null ?
          (
            /* 비회원권한 - 회원가입, 로그인 */
            < div >

              <Link to="/join">
                <Button variant='light'>회원가입</Button>
              </Link>
              <Link to="/login">
                <Button variant='light'>로그인</Button>
              </Link>
            </div>

          )
          : (

            /* 회원권한 - 회원검색, 마이페이지, 회원탈퇴, 로그아웃*/
            <div>

              <Link to="/memberlist">
                <Button variant='light'>회원검색</Button>
              </Link>
              <Link to="/mypage">
                <Button variant='light'>마이페이지</Button>
              </Link>
              <Link to="/delete">
                <Button variant='light'>회원탈퇴</Button>
              </Link>
            </div>

          )}



        {/* Case 1) Session을 서버에 저장한 경우라면?
        - node routes로 이동해서 서버에서 로그아웃 시켜줘야함
        */}
        {/* <Link to="#"> */}

        {/* Case 2) Session을 브라우저에 저장한 경우라면?  */}
        <Button variant='light' onClick={handleLogout}>로그아웃</Button>
        {/* </Link> */}
      </Nav>
    </Card.Header >
  )
}

export default Header