//DEPENDENCIES//
const express = require("express");
const router = express.Router();
////////////////////////////////////////////////////////////////
//ABL - import//
const FitnessAbl = require("../Abl/fitness-abl");
////////////////////////////////////////////////////////////////
//FUNCTIONS//
const checkAuth = require("../Functions/checkAuth");
const isAdmin = require("../Functions/isAdmin");
const {
  fitnessRemoveValidation,
  fitnessAddValidation,
  fitnessUpdateValidation,
  fitnessGetValidation,
} = require("../Functions/validator");
////////////////////////////////////////////////////////////////
//ROUTES//
router
  .route("/fitness")
  //ADD FITNESS / WELNESS//
  .post(checkAuth, fitnessAddValidation, async (req, res) => {
    const result = await FitnessAbl.create(req, res);
    res.status(200).send(result);
  })

  //UPDATE FITNESS//
  .put(checkAuth, fitnessUpdateValidation, async (req, res) => {
    const result = await FitnessAbl.update(req, res);
    res.status(200).send(result);
  })

  //GET WELLNESS//
  .get(fitnessGetValidation, async (req, res) => {
    const result = await FitnessAbl.get(req, res);
    res.status(200).send(result);
  })

  //DELETE WELNESS// + isadmin
  .delete(checkAuth, isAdmin, fitnessRemoveValidation, async (req, res) => {
    const result = await FitnessAbl.delete(req, res);
    res.status(200).send(result);
  });
////////////////////////////////////////////////////////////////
module.exports = router;
