require('dotenv').config()
const express = require("express");
const cors = require('cors');
const cookieParser = require('cookie-parser');

const AppError = require("./src/utils/appError");
const authRouter = require("./src/routers/authRouter");
const candidateRouter = require('./src/routers/candidateRouter');
const globalErrorHandler = require('./src/controllers/errorController');

const app = express();
const bodyParser = require('body-parser');

app.use(cookieParser());

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

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


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}.`);
});
