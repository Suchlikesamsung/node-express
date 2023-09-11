const express = require("express");
const router = express.Router();
const ment = [
  `당신은 혼신의 힘을 담아 골랐지만 제삐가 나와버렸네요..`,
  `망할! 당신이 제일 싫어하는 제삐가 나타났습니다!`,
  `아쉽네요..실력이 제삐을(를) 뽑는 실력이라는걸..`,
  `와! 드디어 제삐가 걸렸어요!`,
  `이런..커피 내기는 아니길 빌어요 제삐가 선택됬네요`,
  `세상에나 제삐을(를) 고르는 사람있어요?`,
  `절 욕하지말아주세요 제삐가 나온건 단지 운이라고요!`,
  `운이라고 생각했나요? 맞아요! 제삐을(를) 뽑은건 당신의 나쁘거나 좋은 운 때문이에요!`,
  `이젠 더이상 쓸말도 없어요.. 제삐가 나온걸 운명으로 받아드려요..`,
  `로또 1등에는 실패했지만 제삐을(를) 뽑는데는 성공했네요`
]



// POST 요청에 대한 라우터 정의
router.post("/pickanyone", function (req, res, next) {
  const protypePickList = [req.body.text];
  const pickList = protypePickList[0].split(",");
  const pickAnyOne = () => {
    const randomIndex = Math.floor(Math.random() * pickList.length);
    return pickList[randomIndex];
  };
  const mentPick = text => {
    const randomIndex = Math.floor(Math.random() * ment.length); // 랜덤 인덱스 선택
    const selectedMent = ment[randomIndex]; // 랜덤 문장 선택
    return selectedMent.replace('제삐', `${text}`); // 인수 추가하여 반환
  }

  const response = {
    text: mentPick(pickAnyOne()),
    responseType: "inChannel",
  };
  res.status(200).json(response);
});

module.exports = router;
