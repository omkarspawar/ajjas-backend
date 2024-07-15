const express = require("express");
const bodyparser = require('body-parser');
const stats = require("./model/statsmodel");
const db = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const fs = require("fs");
const path = require('path');

db.connectDB()

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());

// Body-parser middleware
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())

app.use("/api", require("./routes/statisticsRoutes"));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


