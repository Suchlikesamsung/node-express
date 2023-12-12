const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../utils/mysql');

router.post("/memberlogin",async (req,res) => {
    try {
        const { id, password } = req.body;
        // if(!token || token != tokenpass){
        //     return  res.status(401).json({ result : '보안 토큰 오류'})
        // } 
        const result = await authenticateUser(id, password);
        if (result) {
          res.status(200).json({ result: '인증 성공' });
        } else {
          res.status(401).json({ error: '인증 실패' });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: '내부 서버 오류' });
      }
});

module.exports = router;
