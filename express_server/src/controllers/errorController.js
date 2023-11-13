const AppError = require('./../utils/appError');


const handleDuplicateFieldsDB = err => {
  const value = err.errors[0].value
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = () => {
  return new AppError('Invalid input data.', 400);
};

const handleJWTError = () =>
  new AppError('Invalid token. Please log in again!', 401);

const handleJWTExpiredError = () =>
  new AppError('Your token has expired! Please log in again.', 401);

//send errors functions
const sendErrorDev = (err, req, res) => {
  
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    });
  }

  //RENDERED WEBSITE
  console.error('ERROR', err);
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: err.message
  });
};

const sendErrorProd = (err, req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    //Operational, trusted error: send message to client
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        success: false,
        message: err.message
      });
    }
    console.error('ERROR', err);
    return res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

module.exports = (err, req, res, next) => {
    
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (process.env.NODE_ENV === 'dev') {
    
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'prod') {
    let error = { ...err };
    error.message = err.message;

    if(error.name === 'SequelizeUniqueConstraintError') error = handleDuplicateFieldsDB(error);
    if(error.message.startsWith('Illegal arguments')) error = handleValidationErrorDB();
    if(error.name === 'SequelizeValidationError') error = handleValidationErrorDB();
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();
    
    sendErrorProd(error, req, res);
  }
};
