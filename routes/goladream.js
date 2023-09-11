var express = require("express");
var router = express.Router();

// POST 요청에 대한 라우터 정의
router.post('/goladream', function (req, res, next) {
  const data = req.body;
  console.log(data);
  const choosePlace = () => {
    const placeList = ["세무서", "유안타", "회식"];
    const randomIndex = Math.floor(Math.random() * placeList.length);
    return placeList[randomIndex];
  };
  const response = {
    text: `딱 봐도 ${choosePlace()}는(은) 맛없는 메뉴겠네요.`,
    responseType: "inChannel",
  };
  res.status(200).json(response);
});

module.exports = router;
