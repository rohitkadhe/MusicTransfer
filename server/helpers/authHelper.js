const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("../env/env");

const validEmail = (email) => {
  const regEx = /\S+@\S+\.\S+/;
  return regEx.test(email);
};

const validPassword = (password) => {
  if (password === undefined || password.length <= 5 || password === "") {
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
  var hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

const comparePasswords = async (reqPassword, userPassword) => {
  var res = await bcrypt.compare(reqPassword, userPassword);
  return res;
};

const genToken = (payload, options) => {
  const secret = process.env.SECRET;
  try {
    const token = jwt.sign(payload, secret, options);
    return token;
  } catch (err) {
    throw err;
  }
};

const decode = (token) => {
  try {
    const decoded = jwt.decode(token, process.env.SECRET);
    return decoded;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  validEmail,
  validPassword,
  hashPassword,
  isEmpty,
  comparePasswords,
  genToken,
  decode,
};
