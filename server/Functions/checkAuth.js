const jwt = require("jsonwebtoken");
const { resBuild } = require("./responseBuilder");
const { ValidationError } = require("./errorBuilder");

module.exports = (req, res, next) => {
  let response = resBuild();

  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SIGN_KEY);
    response.data = {
      authenticated: true,
      tokenExpired: false,
      userData: decoded,
    };
    req.body.data = response.data;
    next();
  } catch (err) {
    if (err.message == "jwt expired") {
      response.data = {
        authenticated: false,
        tokenExpired: true,
        expiredAt: err.expiredAt,
      };
      res.status(200).send(response);
    } else {
      new ValidationError("Token verification error.", res, response);
      return;
    }
  }
};
