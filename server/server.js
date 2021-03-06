require("dotenv").config();
const express = require("express");
const cors = require("cors");
const xss = require("xss-clean");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const methodOverride = require("method-override");

const config = require("./Config/securityOptions");
const path = require("path");

const app = express();
const mongoose = require("mongoose");

const PORT = process.env.PORT || 5000;

////////////////////////////////////////////////////////////////
//SECURITY//

app.use(xss()); //prevent cross site scripting XSS
app.use(helmet()); //use unique header for http requests
app.use(cors());
app.use(require("express").json({ limit: config.jsonLimit }));

app.use(
  "/api-fitness",
  rateLimit({
    max: config.rateLimit.maxRequests,
    windowMs: config.rateLimit.windowMS,
    message: config.rateLimit.message,
  })
);
app.use(
  "/api-coach",
  rateLimit({
    max: config.rateLimit.maxRequests,
    windowMs: config.rateLimit.windowMS,
    message: config.rateLimit.message,
  })
);
app.use(
  "/api-user",
  rateLimit({
    max: config.rateLimit.maxRequests,
    windowMs: config.rateLimit.windowMS,
    message: config.rateLimit.message,
  })
);
app.use(
  "/api-login",
  rateLimit({
    max: config.rateLimit.maxRequests,
    windowMs: config.rateLimit.windowMS,
    message: config.rateLimit.message,
  })
);
app.use(
  "/api-admin",
  rateLimit({
    max: config.rateLimit.maxRequests,
    windowMs: config.rateLimit.windowMS,
    message: config.rateLimit.message,
  })
);
app.use(
  "/api-notification",
  rateLimit({
    max: config.rateLimit.maxRequests,
    windowMs: config.rateLimit.windowMS,
    message: config.rateLimit.message,
  })
);
app.use(
  "/api-filter",
  rateLimit({
    max: config.rateLimit.maxRequests,
    windowMs: config.rateLimit.windowMS,
    message: config.rateLimit.message,
  })
);

//API IMAGES RATE LIMIT??//
/************************/
////////////////////////////////////////////////////////////////
//MIDDLEWARE//
app.use(express.urlencoded({ extended: true })); //encode incoming requests
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "./Public/build"))); //build location
////////////////////////////////////////////////////////////////
//ROUTE-CONTROLL//
const fitness = require("./Controllers/fitness-controller.js");
const coach = require("./Controllers/coach-controller.js");
const user = require("./Controllers/user-controller.js");
const login = require("./Controllers/login-controller.js");
const admin = require("./Controllers/admin-controller.js");
const filter = require("./Controllers/filter-controller.js");
const images = require("./Controllers/images-controller.js");
const views = require("./Controllers/views-controller.js");

app.use("/api-filter", filter);
app.use("/api-fitness", fitness);
app.use("/api-coach", coach);
app.use("/api-user", user);
app.use("/api-login", login);
app.use("/api-admin", admin);
app.use("/api-images", images);
app.use("/api-views", views);

////////////////////////////////////////////////////////////////
//DATABASE CONNECTION//
//******** TODO TRY CATCH BLOCK *********//
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connection created!");
    console.log("URI: " + process.env.DB_CONNECTION);
  }
);
////////////////////////////////////////////////////////////////
//RESOLVE DEVELOPMENT STATE//
app.get("*", (req, res) => {
  if (process.env.DEVELOPMENT_STATE === "false") {
    res.send("here");
    // res.sendFile(path.resolve(__dirname, "Public", "build", "index.html"));
  } else {
    res.send("nothere");
  }
});
app.listen(PORT, () => {
  console.log("Server b?????? na portu " + PORT);
});
////////////////////////////////////////////////////////////////
