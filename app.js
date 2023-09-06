var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// const nunjucks = require('nunjucks');

var indexRouter = require('./routes/index');
var golaRouter = require('./routes/goladream');
// var usersRouter = require('./routes/users');

var app = express();

// view engine setup!
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'njk');
// nunjucks.configure('views', { 
//   express: app,
//   watch: true,
// });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.post('/goladream', function(req, res, next) {
  const data = req.body;
  console.log(data)
  const choosePlace = () => {
      const placeList = ["세무서","유안타","회식"]
      const randomIndex = Math.floor(Math.random() * placeList.length);
      return placeList[randomIndex]
  }
  const response = {
      "text" : choosePlace(),
      "responseType" : "inChannel"
  }
  res.status(200).json(response);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

//get 요청d
// app.get('/goladream',function(req,res){
//   res.send('hello world')
// })

// error handler
app.use(function(err, req, res, next) {
  // Set the response content type to JSON
  res.setHeader('Content-Type', 'application/json');

  // Create a JSON response with error information
  const errorResponse = {
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  };

  // Set the status code to the error status or 500 (Internal Server Error) if not available
  res.status(err.status || 500);

  // Send the JSON response
  res.send(JSON.stringify(errorResponse));
});


module.exports = app;
