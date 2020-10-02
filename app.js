const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose=require('mongoose');


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const mainCategoryRouter=require('./routes/mainCategory');
const subCategoryRouter=require('./routes/subCategory');
const commentRouter=require('./routes/comment');
const postRouter=require('./routes/post');

const app = express();

//Connect to database
mongoose.connect(process.env.DB_URL,{ useNewUrlParser: true ,useUnifiedTopology: true} ).then(()=>{
  console.log('Database connection success.');
}).catch((err)=>{
  console.log(`Database connection failed: ${err}`);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Routers
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/maincategory',mainCategoryRouter);
app.use('/subcategory',subCategoryRouter);
app.use('/comment',commentRouter);
app.use('/post',postRouter);

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
