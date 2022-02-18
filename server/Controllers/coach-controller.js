//DEPENDENCIES//
const express = require("express");
const router = express.Router();
////////////////////////////////////////////////////////////////
//ABL - import//

////////////////////////////////////////////////////////////////
//SCHEMA TEMPLATE - import//
//Ajv schema pro kontrolu vstupu - lze použít při vkládání do db
const controllSchema = require("../Schemas/schemaExampleAjv");
////////////////////////////////////////////////////////////////
//ROUTES//
router
  .route("/coach")
  .post((req, res) => {
    //some ABL -functions
  })
  .put((req, res) => {
    //some ABL -functions
  })
  .get((req, res) => {
    //some ABL -functions
  });

router.route("/remove").post((req, res) => {});
////////////////////////////////////////////////////////////////
module.exports = router;
