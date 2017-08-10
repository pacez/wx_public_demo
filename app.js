var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan');
//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var homepage = require('./routes/homepage');
var api = require('./routes/common/api');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
//设置session
app.use(session({
    secret: 'pananancy', //为了安全性的考虑设置secret属性
    cookie: {maxAge: 60 * 1000 * 30}, //设置过期时间 30分钟
    resave: true, // 即使 session 没有被修改，也保存 session 值，默认为 true
    saveUninitialized: false, //
}));

app.use('/',express.static(path.join(__dirname, 'public')));

app.use('/', homepage);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

var appid="wx6e4c2f790332f816",
    appsecret="62aa7950604031c4df099658fe13709d";


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('common/error', {
      title: 'error page',
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('common/error', {
    title: 'error page',
    message: err.message,
    error: {}
  });
});


module.exports = app;
