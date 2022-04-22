//DEPENDENCIES//
const express = require("express");
const router = express.Router();
////////////////////////////////////////////////////////////////
//ABL - import//
const FilterAbl = require("../Abl/filter-abl");
////////////////////////////////////////////////////////////////
//ROUTES//
router.route("/get").get(async (req, res) => {
  const result = await FilterAbl.get(req, res);
  res.status(200).send(result);
});

module.exports = router;
