const express = require('express');
const app = express();

const indexRouter = require('./routes/');
const userRouter = require('./routes/user');

const path = require('path');

// cross 오류를 해결하기 위한 모듈
const cors = require('cors');

// cors 오류를 해결하기 위한 미들웨어
app.use(cors());

// body-parser 미들웨어를 대체하는 express 내장 모듈
app.use(express.urlencoded({extended : true}));
app.use(express.json());

// 포트 번호(서버입구) 설정 , 없으면 3001로 들어감
app.set('port', process.env.PORT || 3001);

// 정적인 파일 관리
app.use(express.static(path.join(__dirname, 'react-project', 'build')))

// 라우터 미들웨어
app.use('/', indexRouter);
app.use('/user', userRouter);

// 포트번호 get해서 누군가 들어오면 계속 기다릴거에요
app.listen(app.get('port'), ()=>{
    console.log('port waiting... 🐼')
});
