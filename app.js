var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')
const session = require('express-session');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminModel = require('./model/admin')

const adminRouter = require('./routes/admin')


const User = require('./model/User')
const productmodel = require('./model/food')

// let newpdocut = {
//   name:" Plain Rice and kontomire stew",
//   url :'plainrice.jpg',
//   price: 50,
//   description:' palatable food with alll the neccesary nutrient needed for life ',
//   day:"monday"
// }

// let submit = new productmodel(newpdocut)
// if(submit.save()){
//   console.log('charlie you have submitted the a product');
// }

// let signIn = {
//   name : "azumah",
//   password:"00000000000",
//   email:"azumah@gmail.com",
//   adminPrivilege:"yes"
// }

// let AdminLogin = new  adminModel(signIn)
// AdminLogin.save()


var app = express();
 const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({secret:'my secret', resave:false, saveUninitialized:false}))
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(adminRouter);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'products')));
app.use('/', indexRouter);
app.use('/users', usersRouter);

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
 // ifLogIn:req.session.isLoggedIn
app.use(function(req, res, next){
res.locals = {
  ifLogIn:req.session.isLoggedIn
}
next();

})

//connecting mongoose application
mongoose.connect("mongodb://localhost:27017/azumahrestaurant", {
  useNewUrlParser: "true",
})
mongoose.connection.on("error", err => {
  console.log("err", err)
})
mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected")
})



module.exports = app;

