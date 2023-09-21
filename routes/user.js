/* User와 관련된 Router 모음 
    - DB와 연결 가능 
    - 기능 : 회원가입, 아이디 중복체크, 로그인, 회원탈퇴, 로그아웃, 회원 검색
    - 작성자 : 김한솔 (23. 09. 19) v11
*/

const express = require('express');
const router = express.Router();
const conn = require('../config/database');

//  회원가입 시 ID 중복체크 
router.post('/checkid', (req, res) => {
    console.log('checkId Router!', req.body);
    let { id } = req.body;

    let sql = 'SELECT id FROM project_member WHERE id = ?';
    conn.query(sql, [id], (err, rows) => {
        console.log('rows', rows);
        console.log('err', err);

        if (err == null) {
            // 오류 X
            if (rows.length > 0) {
                // 중복
                res.json({ result: "dup" });
            } else {
                // 가입 가능
                res.json({ result: "uniq" });
            }
        }
    });
})

// 회원가입 라우터
router.post('/join', (req, res) => {
    console.log('Join Router!', req.body)
    let { id, pw, name, address } = req.body;

    let sql = 'INSERT INTO project_member VALUES (?,?,?,?)';
    conn.query(sql, [id, pw, name, address], (err, rows) => {
        console.log('rows', rows);
        console.log('err', err);
        if (rows) {
            // 회원가입 성공
            res.json({ msg: 'success' })
        } else {
            // 회원가입 실패
            res.json({ msg: 'failed' })
        }

    });
})

// 로그인 라우터
router.post('/login', (req, res) => {
    console.log('login Router!', req.body)
    const {id, pw} = req.body
    
    let sql = 'SELECT id,user_name,address FROM project_member WHERE id=? and pw=?';
    conn.query(sql, [id, pw], (err, rows) => {
        console.log('rows', rows);
        console.log('err', err);
        if (rows.length > 0) {
            // 로그인 성공
            res.json({ 
                msg: 'success',
                user : rows[0]
                })
        } else {
            // 로그인 실패
            res.json({ msg: 'failed'})
        }

    });
})

// 비밀번호 수정
router.post('/checkPW', (req,res)=>{
    console.log('checkPw Router!', req.body)
    const {id, pw, setPw} = req.body;

    let sql = 'UPDATE project_member SET pw=? WHERE id = ?'
    conn.query(sql, [pw,id], (err,rows)=>{
        console.log('rows', rows);
        console.log('err', err);
        if (rows) {
            // 수정 성공
            res.json({ 
                msg: 'success',
                user : rows[0]
                })
        } else {
            // 수정 실패
            res.json({ msg: 'failed'})
        }
    })
})

// 회원 정보 수정
// router.post('/modify', (req,res)=>{
//     console.log('modify Router!', req.body)
//     const {id, pw, setPw} = req.body;

//     let sql = 'UPDATE project_member SET pw=? WHERE id = ?'
//     conn.query(sql, [pw,id], (err,rows)=>{
//         console.log('rows', rows);
//         console.log('err', err);
//         if (rows) {
//             // 수정 성공
//             res.json({ 
//                 msg: 'success'
//                 })
//         } else {
//             // 수정 실패
//             res.json({ msg: 'failed'})
//         }
//     })
// })

module.exports = router; 
