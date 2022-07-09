//DEPENDENCIES//
const express = require("express");
const router = express.Router();
////////////////////////////////////////////////////////////////
//ABL - import//
const LoginAbl = require("../Abl/login-abl");
////////////////////////////////////////////////////////////////
//FUNCTIONS//
const checkAuth = require("../Functions/checkAuth");
const isAdmin = require("../Functions/isAdmin");
const {
  registerValidation,
  loginValidation,
} = require("../Functions/validator");

////////////////////////////////////////////////////////////////
//ROUTES//
router
  .route("/login")
  //REGISTER// OK
  .post(registerValidation, async (req, res) => {
    const result = await LoginAbl.register(req, res);
    res.status(200).send(result);
  })

  //LOGIN TO PROFILE// OK
  .get(loginValidation, async (req, res) => {
    const result = await LoginAbl.login(req, res);
    res.status(200).send(result);
  });

//CHECK TOKEN// OK
router.route("/check").post(checkAuth, async (req, res) => {
  const result = await LoginAbl.checkAuth(req, res);
  res.status(200).send(result);
});

//CHECK IF IS ADMIN//
////////////////////////////////////////////////////////////////
module.exports = router;
