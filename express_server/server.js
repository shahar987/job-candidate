require('dotenv').config()
const express = require("express");
const cors = require('cors');
const cookieParser = require('cookie-parser');

const AppError = require("./src/utils/appError")
const authRouter = require("./src/routers/authRouter");
const candidateRouter = require('./src/routers/candidateRouter');
const globalErrorHandler = require('./src/controllers/errorController');

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: true }))

// set port, listen for requests
const PORT = 8080;

app.use(cors({
  origin: true,
  credentials: true,
}));


app.use('/api/auth', authRouter);
app.use('/api/candidates', candidateRouter);
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });

app.use(globalErrorHandler);

app.use(cookieParser());



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
