var dbHelper = require("../helpers/dbHelper");
var authHelper = require("../helpers/authHelper");
var Errors = require("../constants/errors");
var MusicTransferError = require("../helpers/errorHelper").MusicTransferError;
var authHelper = require("../helpers/authHelper");
const { validEmail, validPassword, isEmpty } = authHelper;
const { BAD_REQUEST, NOT_FOUND } = Errors;

class User {
  constructor(email, name, password, id) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  static validModel(email, name, password) {
    var res = validEmail(email) && validPassword(password) && !isEmpty(name);
    if (!res) {
      throw new MusicTransferError(
        "Bad request. Ensure email, password, name are present and formatted correctly",
        BAD_REQUEST
      );
    }
    return true;
  }

  static async validCredentials(reqPassword, password) {
    var error = new MusicTransferError(
      "Invalid credentials",
      Errors.UNAUTHORIZED
    );
    try {
      var authenticated = await authHelper.comparePasswords(
        reqPassword,
        password
      );
      if (!authenticated) {
        throw err;
      }
      return authenticated;
    } catch (err) {
      throw error;
    }
  }

  async save(returnParams) {
    var res = await dbHelper.save("users", this, returnParams);
    return res[0];
  }

  static async accountExists(email) {
    const res = await dbHelper.find("users", "email", { email });
    if (res.length !== 0)
      throw new MusicTransferError(
        "An account with that email already exists",
        BAD_REQUEST
      );
    return false;
  }
  static async findUser(email) {
    const res = await dbHelper.find("users", ["*"], {
      email,
    });
    if (res.length == 0)
      throw new MusicTransferError(
        "An account with that email wad not found",
        NOT_FOUND
      );
    return res[0];
  }
}
module.exports = User;
