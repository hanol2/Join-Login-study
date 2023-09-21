import React from 'react'
import { Card } from 'react-bootstrap';
import Header from './Header';
import Join from './Join';
import Login from './Login';
import MemberList from './MemberList';
import Delete from './Delete';
import MyPage from './MyPage';
import Main from './Main'
import {Routes, Route} from 'react-router-dom';

const Body = () => {
  return (
    <div>
      <Card>
        {/* Application의 Header */}
        <Header/>
        
        {/* Application의 Body */}
        <Card.Body>
          <Routes>
            <Route path='/main' element={<Main/>}></Route>
            <Route path='/join' element={<Join/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/memberlist' element={<MemberList/>}></Route>
            <Route path='/delete' element={<Delete/>}></Route>
            <Route path='/mypage' element={<MyPage/>}></Route>
          </Routes>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Body