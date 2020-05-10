var db = require("../db/db");
var User = require("../models/User");
var authHelper = require("../helpers/authHelper");
var Errors = require("../constants/errors");
var MusicTransferError = require("../helpers/errorHelper").MusicTransferError;

const { validEmail, validPassword, isEmpty } = authHelper;
const { BAD_REQUEST, UNAUTHORIZED, NOT_FOUND } = Errors;

const registerUser = async (req, res, next) => {
  const { email, password, name } = req.body;
  try {
    if (!validEmail(email) || !validPassword(password) || isEmpty(name)) {
      throw new MusicTransferError(
        "Bad request. Ensure email, password, name are formatted correctly",
        BAD_REQUEST
      );
    }
    const userExists = await db
      .from("users")
      .select("email")
      .where({ email: req.body.email });

    if (userExists.length !== 0) {
      throw new MusicTransferError(
        "An account with that email already exists",
        BAD_REQUEST
      );
    }
    const hashedPassword = await authHelper.hashPassword(password);

    const result = await db("users")
      .insert(User(email, hashedPassword, name))
      .returning(["id", "email", "name"]);

    const user = result[0];
    const token = authHelper.genToken({ id: user.id, iat: Date.now() });

    res.json({ user: result[0], token });
  } catch (err) {
    next(err);
  }
};

const signInUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!validEmail(email) || !validPassword(password)) {
      throw new MusicTransferError("Invalid credentials", UNAUTHORIZED);
    }
    const user = await db.from("users").select("*").where({ email: email });
    if (user.length === 0) {
      throw new MusicTransferError(
        "User with that email was not found",
        NOT_FOUND
      );
    }
    if (await authHelper.comparePasswords(password, user[0].password)) {
      const token = authHelper.genToken({ id: user.id, iat: Date.now() });
      res.json({
        user: User(user[0].id, user[0].password, user[0].email),
        token,
      });
    } else {
      throw new MusicTransferError("Invalid credentials", UNAUTHORIZED);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { registerUser, signInUser };
