const authHelper = require("../helpers/authHelper");
const Errors = require("../constants/errors");
const MusicTransferError = require("../helpers/errorHelper").MusicTransferError;

// This middleware can be used to protect any routes that require auth
const verifyAuth = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    next(new MusicTransferError("Missing token", Errors.BAD_REQUEST));
  }
  try {
    const decoded = authHelper.verify(token);
    req.user = decoded;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = verifyAuth;
