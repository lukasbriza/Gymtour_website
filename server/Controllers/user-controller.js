//DEPENDENCIES//
const express = require("express");
const router = express.Router();
////////////////////////////////////////////////////////////////
//ABL - import//
const UserAbl = require("../Abl/user-abl");
////////////////////////////////////////////////////////////////
//FUNCTIONS//
const checkAuth = require("../Functions/checkAuth");
const isAdmin = require("../Functions/isAdmin");
const {
  updateUservalidation,
  deleteUservalidation,
} = require("../Functions/validator");
////////////////////////////////////////////////////////////////
//ROUTES//
router
  .route("/user")
  //UPDATE USER//
  .put(checkAuth, updateUservalidation, async (req, res) => {
    const result = await UserAbl.update(req, res);
    res.status(200).send(result);
  })
  //DELETE USER// - remove owned objects on call not implemented
  .delete(checkAuth, isAdmin, deleteUservalidation, async (req, res) => {
    const result = await UserAbl.delete(req, res);
    res.status(200).send(result);
  });
////////////////////////////////////////////////////////////////
module.exports = router;
