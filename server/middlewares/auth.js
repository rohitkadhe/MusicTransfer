const authUtil = require("../utils/authUtil");
const MusicTransferError = require("../helpers/errorHelper").MusicTransferError;
const HttpErrors = require("../constants/httpErrors");
const { MISSING_TOKEN } = require("../constants/musicTransferErrors");

// This middleware can be used to protect any app routes that require auth
const verifyAppAuth = (req, res, next) => {
  const authString = req.header("Authorization");
  if (authUtil.isEmpty(authString)) {
    return next(new MusicTransferError(MISSING_TOKEN, HttpErrors.BAD_REQUEST));
  }
  const [bearer, token] = authString.split(" ");

  if (bearer != "Bearer" || token == "") {
    return next(new MusicTransferError(MISSING_TOKEN, HttpErrors.BAD_REQUEST));
  }

  try {
    const decoded = authUtil.verify(token);
    req.user = decoded;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = verifyAppAuth;
