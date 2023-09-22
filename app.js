// require("dotenv").config(); // 환경 변수 로드

// const oracledb = require("oracledb");
// const dbConfig = {
//   user: process.env.DB_USERID,
//   password: process.env.DB_USERPASSWORD,
//   connectString: process.env.DB_URL,
// };

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const schedule = require('node-schedule');



const golaRouter = require("./routes/goladream");
const pickRouter = require("./routes/pickanyone");
const indexRouter = require("./routes/index");
const dbtest = require("./routes/dbtest");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// let dbPool;

// oracledb.createPool(dbConfig, (err, pool) => {
//   if (err) {
//     console.error("커넥션 풀 생성 에러: ", err.message);
//     return;
//   }
//   console.log("커넥션 풀 생성 성공!");
//   app.set("dbPool", pool);
// });

app.use("/", golaRouter);

app.use("/", indexRouter);

app.use("/", pickRouter);

app.use("/", dbtest);

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
app.use(function (req, res, next) {
  next(createError(404));
});


const axios = require("axios");

function sendDoorayMessage(botName, text) {
  const hookUrl =
    "https://hook.dooray.com/services/3241943531530916096/3631380616712603191/wqFZJEBLStuIA1ynMqY8DA";
  const payload = {
    botName,
    botIconImage: "https://static.dooray.com/static_images/dooray-bot.png",
    text,
  };

  axios
    .post(hookUrl, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log("Response:", response.data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function checkTimeAndSendMessages() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const formatTime = `${(hours < 10 ? "0" : "") + hours}:${(minutes < 10 ? "0" : "") + minutes}`;

  // 현재 시간 출력
  console.log(`현재 시각 ${formatTime}`);

  // 퇴근 시간 확인 및 메시지 전송
  if (hours >= 9 && hours < 18) {
    const remainingHours = 18 - hours;
    sendDoorayMessage("잔여시간 알림", `현재 시각 ${formatTime} 입니다. 퇴근까지 ${remainingHours}시간 남았습니다.`);
  }

  // 점심시간 확인 및 메시지 전송
  if (formatTime === "11:30") {
    sendDoorayMessage("점심시간 알림", "점심시간 초 비상 점심시간 점심시간 점심시간");
  }

  if (formatTime === "18:00") {
    sendDoorayMessage("퇴근시간 알림", "퇴근시간인데 아직 퇴근못하는 흑우 읍제 ㅋㅋㅋ?")
  }

}

// 정각마다 실행
// const now = new Date();
// const minutesUntilNextHour = 60 - now.getMinutes();
// const initialDelay = minutesUntilNextHour * 60 * 1000; // 분을 밀리초로 변환
// setTimeout(checkTimeAndSendMessages, 1000);


const job = schedule.scheduleJob('0 * * * *', checkTimeAndSendMessages);




//get 요청d
// app.get('/goladream',function(req,res){
//   res.send('hello world')
// })

// 오류 핸들러
app.use(function (err, req, res, next) {
  // 응답의 컨텐츠 타입을 JSON으로 설정합니다.
  res.setHeader("Content-Type", "application/json");

  // 에러 정보를 포함한 JSON 응답을 생성합니다.
  const errorResponse = {
    message: err.message,
    error: req.app.get("env") === "development" ? err : {},
  };

  // 상태 코드를 에러 상태로 설정하거나, 사용 가능한 경우 500 (내부 서버 오류)로 설정합니다.
  res.status(err.status || 500);

  // JSON 응답을 전송합니다.
  res.send(JSON.stringify(errorResponse));
});

// 커넥션 풀 종료 핸들러

process.on("exit", () => {
  if (dbPool) {
    dbPool.close((err) => {
      if (err) {
        console.error("커넥션 풀 종료 중 오류가 발생했어요: ", err.message);
      } else {
        console.log("커넥션 풀 종료!.");
      }
    });
  }
});

module.exports = app;
