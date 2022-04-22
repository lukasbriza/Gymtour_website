//DEPENDENCIES//
const express = require("express");
const router = express.Router();
const ImagesAbl = require("../Abl/images-abl");
//ROUTES-FOR TEST//

router
  .route("/image")
  .post(async (req, res) => {
    const result = await ImagesAbl.upload(req, res);
    res.status(200).send(result);
  })
  .get(async (req, res) => {
    await ImagesAbl.get(req, res);
  })
  .delete(async (req, res) => {
    const result = await ImagesAbl.remove(req, res);
    res.status(200).send(result);
  });

module.exports = router;
