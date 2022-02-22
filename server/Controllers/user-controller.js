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
  .route("/user")
  .post((req, res) => {
    //some ABL -functions
    res.send("post");
  })
  .put((req, res) => {
    //some ABL -functions
    res.send("put");
  })
  .get((req, res) => {
    //some ABL -functions
    res.send("get");
  })
  .delete((req, res) => {
    //some ABL -functions
    res.send("delete");
  });
////////////////////////////////////////////////////////////////
module.exports = router;
