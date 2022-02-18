const express = require("express");
const json = require("express").json();
const path = require("path");
const cors = require("cors"); //solve CORS problems
const app = express();

const PORT = process.env.PORT || 5000;

////////////////////////////////////////////////////////////////
//MIDDLEWARE//
app.use(json);
app.use(express.urlencoded({ extended: true })); //encode incoming requests
app.use(cors());
app.use(express.static(path.join(__dirname, "./Public/build"))); //build location

////////////////////////////////////////////////////////////////
//ROUTE-CONTROLL//
const fitness = require("./Controllers/fitness-controller.js");
const coach = require("./Controllers/coach-controller.js");
const user = require(".Controllers/user-controller.js");

app.use("/api-fitness", fitness);
app.use("/api-coach", coach);
app.use("/api-user", user);

////////////////////////////////////////////////////////////////
//DATABASE CONNECTION//
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(
  process.env.DB_CONNECTION, //přístup do .env => nutno upravit
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Database connected!");
  }
);

////////////////////////////////////////////////////////////////
//publikování index.html na volání basic route => "/"
//enable only with builded version of app !!!
/*
app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'Public','build','index.html'));
});
*/
////////////////////////////////////////////////////////////////

app.listen(PORT, () => {
  console.log("Server běží na portu " + PORT);
});
