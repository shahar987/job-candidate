const express = require("express");

const db = require("./src/db/database");

const app = express();

// set port, listen for requests
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
