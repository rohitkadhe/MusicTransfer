const authHelper = require("../helpers/authHelper");
const Errors = require("../constants/errors");
const MusicTransferError = require("../helpers/errorHelper").MusicTransferError;
const HttpErrors = require("../constants/httpErrors");

const { MISSING_TOKEN } = Errors;

// This middleware can be used to protect any routes that require auth
const verifyAuth = (req, res, next) => {
  const authString = req.header("Authorization");
  const [bearer, token] = authString.split(" ");

  if (bearer != "Bearer" || !token) {
    return next(new MusicTransferError(MISSING_TOKEN, HttpErrors.BAD_REQUEST));
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
