import React from 'react'

const Main = () => {
  
  // 현재 세션 값?
  const userObj = JSON.parse(sessionStorage.getItem('user'));
  console.log('session', userObj)

  return (
    <div>
      {userObj == null ? (<h1>로그인을 해주세요...</h1>) : (<h1>{userObj.user_name}님 환영합니다!</h1>)}
    </div>
  )
}

export default Main