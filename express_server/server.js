require('dotenv').config()
const express = require("express");

const AppError = require("./src/utils/appError")
const userRouter = require("./src/routers/usersRouter");

const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))

// set port, listen for requests
const PORT = 8080;


app.use('/api/v1/users', userRouter);
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  });


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
