var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var addCommentRouter = require('./routes/addComment');
var getCommentRouter = require('./routes/getComment');

var fs = require('fs');
var path = require('path');

var app = express();

// chat.log 초기화
try {
  let resText = "<p>노희재: 안녕하세요!</p><p>전찬민: 아무말이나 써봤어요.</p><p>이슬기: 네 반갑습니다~</p><p>이병민: 저도 반갑습니다</p>"
  fs.writeFileSync(path.join(__dirname,'chat.log'), resText, 'utf-8');
  console.log('OK');
}catch(e){
  console.log(e);
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/addcomment', addCommentRouter);
app.use('/getcomment', getCommentRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
