const authHelper = require("../helpers/authHelper");
const Errors = require("../constants/errors");
const MusicTransferError = require("../helpers/errorHelper").MusicTransferError;

const { UNAUTHORIZED, BAD_REQUEST } = Errors;

// This middleware can be used to protect any routes that require auth
const verifyAuth = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    next(new MusicTransferError("Missing token", BAD_REQUEST));
  }
  try {
    const decoded = authHelper.decode(token);
    req.user = decoded;
    next();
  } catch (err) {
    next(new MusicTransferError("Invalid token", UNAUTHORIZED));
  }
};

module.exports = verifyAuth;
