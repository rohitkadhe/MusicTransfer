const dbUtil = require("../../utils/dbUtil");

const {
  validEmail,
  validPassword,
  isEmpty,
  comparePasswords,
} = require("../../utils/authUtil");

const MusicTransferError = require("../../helpers/errorHelper")
  .MusicTransferError;

const {
  BAD_REQUEST,
  NOT_FOUND,
  UNAUTHORIZED,
} = require("../../constants/httpErrors");

const {
  INVALID_FIELDS,
  ACCOUNT_EXISTS,
  USER_NOT_FOUND,
  INVALID_CREDENTIALS,
} = require("../../constants/musicTransferErrors");

class User {
  constructor(email, name, password, id) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  static validModel(email, name, password) {
    const res = validEmail(email) && validPassword(password) && !isEmpty(name);
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
    const authenticated = await comparePasswords(reqPassword, password);
    if (!authenticated) {
      throw new MusicTransferError(INVALID_CREDENTIALS, UNAUTHORIZED);
    }
    return authenticated;
  }

  async save(returnParams) {
    const res = await dbUtil.save("users", this, returnParams);
    return res[0];
  }

  static async accountExists(email) {
    const res = await dbUtil.find("users", "email", { email });
    if (res.length !== 0)
      throw new MusicTransferError(ACCOUNT_EXISTS, BAD_REQUEST);
    return false;
  }
  static async findUser(email) {
    const res = await dbUtil.find("users", ["*"], { email });
    if (res.length == 0)
      throw new MusicTransferError(USER_NOT_FOUND, NOT_FOUND);
    return res[0];
  }
}
module.exports = User;
