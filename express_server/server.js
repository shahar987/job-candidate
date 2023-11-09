require('dotenv').config()
const express = require("express");

const AppError = require("./src/utils/appError")
const authRouter = require("./src/routers/authRouter");
const candidateRouter = require('./src/routers/candidateRouter');
const globalErrorHandler = require('./src/controllers/errorController');

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))

// set port, listen for requests
const PORT = 8080;


app.use('/api/auth', authRouter);
app.use('/api/candidates', candidateRouter);
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });

app.use(globalErrorHandler);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
