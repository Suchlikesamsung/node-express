const express = require("express");
const router = express.Router();
const oracledb = require("oracledb");

router.post("/dbselect", function (req, res, next) {
  const dbStatus = req.app.get("dbPool");
  dbStatus.getConnection((err, connection) => {
    if (err) {
      console.error("커넥션 풀이 말대꾸..?: ", err.message);
      res.status(500).send("데이터베이스 에러");
      return;
    }

    const uuid = 'asdasd123';
    const query = 'SELECT * FROM MEMBER WHERE UUID = :uuid';

    // 쿼리 실행
    connection.execute(query, [spoid], (queryErr, result) => {
        if (queryErr) {
            console.error('쿼리 실행 에러', queryErr.message);
            res.status(500).send('쿼리에러');
        } else {
            console.log(result.rows);
            res.json(result.rows);
        }

        connection.close((closeErr) => {
            if (closeErr) {
                console.error("커넥션 풀이 말대꾸..?: ", closeErr.message);
            }
        });
    });
  });
});

module.exports = router;