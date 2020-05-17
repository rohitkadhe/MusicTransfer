const dbHelper = require("../helpers/dbHelper");
const authHelper = require("../helpers/authHelper");
const HttpErrors = require("../constants/httpErrors");
const Errors = require("../constants/musicTransferErrors");
const MusicTransferError = require("../helpers/errorHelper").MusicTransferError;

const { validEmail, validPassword, isEmpty } = authHelper;
const { BAD_REQUEST, NOT_FOUND, UNAUTHORIZED } = HttpErrors;
const {
  INVALID_FIELDS,
  ACCOUNT_EXISTS,
  USER_NOT_FOUND,
  INVALID_CREDENTIALS,
} = Errors;

class User {
  constructor(email, name, password, id) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  static validModel(email, name, password) {
    const res = validEmail(email) && validPassword(password) && !isEmpty(name);
    console.log(validEmail(email), validPassword(password), !isEmpty(name));
    if (!res) {
      throw new MusicTransferError(INVALID_FIELDS, BAD_REQUEST);
    }
    return true;
  }
  static validSignInRequest(email, password) {
    const res = validEmail(email) && validPassword(password);
    if (!res) {
      throw new MusicTransferError(INVALID_FIELDS, BAD_REQUEST);
    }
    return true;
  }
  static async validCredentials(reqPassword, password) {
    const authenticated = await authHelper.comparePasswords(
      reqPassword,
      password
    );
    if (!authenticated) {
      throw new MusicTransferError(INVALID_CREDENTIALS, UNAUTHORIZED);
    }
    return authenticated;
  }

  async save(returnParams) {
    const res = await dbHelper.save("users", this, returnParams);
    return res[0];
  }

  static async accountExists(email) {
    const res = await dbHelper.find("users", "email", { email });
    if (res.length !== 0)
      throw new MusicTransferError(ACCOUNT_EXISTS, BAD_REQUEST);
    return false;
  }
  static async findUser(email) {
    const res = await dbHelper.find("users", ["*"], { email });
    if (res.length == 0)
      throw new MusicTransferError(USER_NOT_FOUND, NOT_FOUND);
    return res[0];
  }
}
module.exports = User;
