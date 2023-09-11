var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
  const protypePickList = [req.body.text];
  const pickList = protypePickList[0].split(",");
  const pickAnyOne = () => {
    const randomIndex = Math.floor(Math.random() * pickList.length);
    return pickList[randomIndex];
  };
  const response = {
    text: `이런..아쉽지만 ${pickAnyOne()}이 선택된걸 어쩌겠어요. 운명이라 생각하고 받아드려야죠.`,
    responseType: "inChannel",
  };
  res.status(200).json(response);
});

module.exports = router;
