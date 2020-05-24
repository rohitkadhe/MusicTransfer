const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const MusicTransferError = require("../helpers/errorHelper").MusicTransferError;
const HttpErrors = require("../constants/httpErrors");
const { INVALID_CREDENTIALS } = require("../constants/musicTransferErrors");
require("../config/env");

const validEmail = (email) => {
  const regEx = /\S+@\S+\.\S+/;
  return regEx.test(email);
};

const validPassword = (password) => {
  if (password === undefined || password.length < 8 || password === "") {
    return false;
  }
  return true;
};

const isEmpty = (input) => {
  if (input === undefined || input === "") {
    return true;
  }
  return false;
};

const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

const comparePasswords = async (reqPassword, userPassword) => {
  try {
    const res = await bcrypt.compare(reqPassword, userPassword);
    return res;
  } catch (err) {
    throw new MusicTransferError(INVALID_CREDENTIALS, HttpErrors.UNAUTHORIZED);
  }
};

const genToken = (payload, options) => {
  const secret = process.env.SECRET;
  try {
    const token = jwt.sign(payload, secret, options);
    return token;
  } catch (err) {
    throw new MusicTransferError(err.message, HttpErrors.INTERNAL_SERVER_ERROR);
  }
};

const verify = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    return decoded;
  } catch (err) {
    throw new MusicTransferError(err.message, HttpErrors.UNAUTHORIZED);
  }
};

module.exports = {
  validEmail,
  validPassword,
  hashPassword,
  isEmpty,
  comparePasswords,
  genToken,
  verify,
};
