//DEPENDENCIES//
const express = require("express");
const router = express.Router();
////////////////////////////////////////////////////////////////
//ABL - import//
const CoachAbl = require("../Abl/coach-abl");
////////////////////////////////////////////////////////////////
//FUNCTIONS//
const checkAuth = require("../Functions/checkAuth");
const isAdmin = require("../Functions/isAdmin");
const {
  coachAddValidation,
  coachUpdateValidation,
  coachGetValidation,
  coachDeleteValidation,
} = require("../Functions/validator");
////////////////////////////////////////////////////////////////
//ROUTES//
router
  .route("/coach")
  //ADD COACH//
  .post(checkAuth, coachAddValidation, async (req, res) => {
    const result = await CoachAbl.create(req, res);
    res.status(200).send(result);
  })

  //UPDATE COACH//
  .put(checkAuth, coachUpdateValidation, async (req, res) => {
    const result = await CoachAbl.update(req, res);
    res.status(200).send(result);
  })

  //GET COACH//
  .get(coachGetValidation, async (req, res) => {
    const result = await CoachAbl.get(req, res);
    res.status(200).send(result);
  })

  //DELETE COACH// + isadmin
  .delete(checkAuth, isAdmin, coachDeleteValidation, async (req, res) => {
    const result = await CoachAbl.delete(req, res);
    res.status(200).send(result);
  });
////////////////////////////////////////////////////////////////
module.exports = router;
