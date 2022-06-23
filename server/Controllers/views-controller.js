//DEPENDENCIES//
const express = require("express");
const router = express.Router();
////////////////////////////////////////////////////////////////
//ABL - import//
const ViewsAbl = require("../Abl/views-abl");
////////////////////////////////////////////////////////////////
//FUNCTIONS//
////////////////////////////////////////////////////////////////
//ROUTES//
router
  .route("/views")
  .get(async (req, res) => {
    const result = await ViewsAbl.getViews(req, res);
    res.status(200).send(result);
  })
  .post(async (req, res) => {
    const result = await ViewsAbl.updateByOne(req, res);
    res.status(200).send(result);
  });
////////////////////////////////////////////////////////////////
module.exports = router;
