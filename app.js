require('dotenv').config(); // 환경 변수 로드

const dbUrl = process.env.DB_URL;
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');



const golaRouter = require('./routes/goladream');
const pickRouter = require('./routes/pickanyone');
const indexRouter = require('./routes/index');

const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', golaRouter);

app.use('/', indexRouter);

app.use('/', pickRouter);

// app.use('/users', usersRouter);
// app.post('/goladream', function(req, res, next) {
//   const data = req.body;
//   console.log(data)
//   const choosePlace = () => {
//       const placeList = ["세무서","유안타","회식"]
//       const randomIndex = Math.floor(Math.random() * placeList.length);
//       return placeList[randomIndex]
//   }
//   const response = {
//       "text" : `딱 봐도 ${choosePlace()}는 맛없는 메뉴겠네요.`,
//       "responseType" : "inChannel"
//   }
//   res.status(200).json(response);
// });

// app.post("/pickanyone", function (req, res, next) {
//   const protypePickList = [req.body.text];
//   const pickList = protypePickList[0].split(',');
//   const pickAnyOne = () => {
//     const randomIndex = Math.floor(Math.random() * pickList.length);
//     return pickList[randomIndex];
//   };
//   const response = {
//     text:`이런..아쉽지만 ${pickAnyOne()}이 선택된걸 어쩌겠어요. 운명이라 생각하고 받아드려야죠.`,
//     responseType: "inChannel",
//   };
//   res.status(200).json(response);
// });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

//get 요청d
// app.get('/goladream',function(req,res){
//   res.send('hello world')
// })

// 오류 핸들러
app.use(function(err, req, res, next) {
  // 응답의 컨텐츠 타입을 JSON으로 설정합니다.
  res.setHeader('Content-Type', 'application/json');

  // 에러 정보를 포함한 JSON 응답을 생성합니다.
  const errorResponse = {
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  };

  // 상태 코드를 에러 상태로 설정하거나, 사용 가능한 경우 500 (내부 서버 오류)로 설정합니다.
  res.status(err.status || 500);

  // JSON 응답을 전송합니다.
  res.send(JSON.stringify(errorResponse));
});

console.log(`${dbUrl} 잘되나???` )


module.exports = app;
