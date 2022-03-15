//DEPENDENCIES//
const express = require("express");
const router = express.Router();
////////////////////////////////////////////////////////////////
//ABL - import//
const TopAbl = require("../Abl/top-abl");
const NotificationAbl = require("../Abl/notification-abl");
////////////////////////////////////////////////////////////////
//FUNCTIONS//
const checkAuth = require("../Functions/checkAuth");
const isAdmin = require("../Functions/isAdmin");
const {
  topUpdateValidation,
  notificationCreateValidation,
  notificationDeleteValidation,
} = require("../Functions/validator");
////////////////////////////////////////////////////////////////
//ROUTES//
router
  .route("/top")
  //MAKE TOPPED FITNESS// + isadmin
  .put(checkAuth, isAdmin, topUpdateValidation, async (req, res) => {
    const result = await TopAbl.update(req, res);
    res.status(200).send(result);
  });
router
  .route("/notification")
  //CREATE NOTIFICATION//
  .post(checkAuth, notificationCreateValidation, async (req, res) => {
    const result = await NotificationAbl.create(req, res);
    res.status(200).send(result);
  })
  //DELETE NOTIFICATION// + isadmin
  .delete(checkAuth, notificationDeleteValidation, async (req, res) => {
    const result = await NotificationAbl.delete(req, res);
    res.status(200).send(result);
  });
////////////////////////////////////////////////////////////////
module.exports = router;
