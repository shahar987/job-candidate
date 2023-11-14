const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const util = require('util') ;

const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');


//create jwt token
const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000
      
    });
  };


//send the token in a cookie so the browser be abele to store it
const createSendToken = (user, statusCode, req, res) => {
    const token = signToken(user.id);
    res.header('Access-Control-Allow-Credentials', true);
    res.cookie('jwt', token, {
      expires: new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    });
  
    res.status(statusCode).json({
      status: 'success',
      token
    });
  };


//compare password in the database vs password user provide and check if they match
const correctPassword = async(userPassword, dbPassword) =>{
  return await bcrypt.compare(userPassword, dbPassword); 
}


//signup
exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    createSendToken(newUser, 201, req, res);
  });


//signin
exports.signin = catchAsync(async (req, res, next) => {
    const { username, password } = req.body;
  
    //check if email and password exist
    if (!username || !password) {
      return next(new AppError('Please provide username and password!', 400));
    }
    //check if user exists
    const user = await User.findOne({ where: { username: username } });
    //check if password is correct
    if (!user || !(await correctPassword(password, user.password))) {
      return next(new AppError('Incorrect username or password', 401));
    }
    
    createSendToken(user, 200, req, res);
});

//prevent access if user not authorized
exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (req.cookies) {
    token = req.cookies['jwt'];
  } else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];

  } 

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }
  
  //verification token
  const decoded = await util.promisify(jwt.verify)(token, process.env.JWT_SECRET);
  
  //check if user still exists
  const currentUser = await User.findByPk(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    );
  }
  
  next();
});

  