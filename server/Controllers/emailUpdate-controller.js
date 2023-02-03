//DEPENDENCIES//
const express = require("express");
const router = express.Router();
////////////////////////////////////////////////////////////////
//ABL - import//
const EmailUpdateAbl = require("../Abl/emailUpdate-abl");
//VALIDATION//
const { emailUpdateValidation } = require("../Functions/validator");
////////////////////////////////////////////////////////////////
//ROUTES//
router.route("/call").post(emailUpdateValidation, async (req, res) => {
  const result = await EmailUpdateAbl.update(req, res);
  res.status(200).send(result);
});
////////////////////////////////////////////////////////////////
module.exports = router;
