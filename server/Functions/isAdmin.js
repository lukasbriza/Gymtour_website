const { ValidationError } = require("./errorBuilder");
const { resBuild } = require("./responseBuilder");

module.exports = (req, res, next) => {
  if (req.body.data.userData.isAdmin == false) {
    let response = resBuild(req.body.data);
    new ValidationError("User haven´t admin role.", res, response);
  } else {
    next();
  }
};
