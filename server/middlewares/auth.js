const authHelper = require("../helpers/authHelper");
const Errors = require("../constants/errors");
const MusicTransferError = require("../helpers/errorHelper").MusicTransferError;

const { MISSING_TOKEN } = Errors;

// This middleware can be used to protect any routes that require auth
const verifyAuth = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    next(new MusicTransferError(MISSING_TOKEN, Errors.BAD_REQUEST));
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
