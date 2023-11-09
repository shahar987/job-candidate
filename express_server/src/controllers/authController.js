const { json } = require('body-parser');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');


//create jwt token
const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });
  };

//send the token in a cookie so the browser be abele to store it
const createSendToken = (user, statusCode, req, res) => {
    const token = signToken(user.id);
  
    res.cookie('jwt', token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
    });
  
    res.status(statusCode).json({
      status: 'success',
      token
    });
  };

exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    createSendToken(newUser, 201, req, res);
  });