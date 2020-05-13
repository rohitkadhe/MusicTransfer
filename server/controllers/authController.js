const User = require("../models/User");
const authHelper = require("../helpers/authHelper");
const Time = require("../constants/time");

const registerUser = async (req, res, next) => {
  const { email, password, name } = req.body;
  try {
    if (
      User.validModel(email, password, name) &&
      !(await User.accountExists(email))
    ) {
      const hashedPassword = await authHelper.hashPassword(password);

      const user = new User(email, name, hashedPassword);

      const savedUser = await user.save(["id", "name", "email"]);
      const token = authHelper.genToken(
        { id: user.id },
        { expiresIn: Time.ONE_HOUR }
      );

      res.json({ user: savedUser, token });
    }
  } catch (err) {
    next(err);
  }
};

const signInUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (User.validSignInRequest(email, password)) {
      const user = await User.findUser(email);

      if (await User.validCredentials(password, user.password)) {
        const token = authHelper.genToken(
          { id: user.id },
          { expiresIn: Time.ONE_HOUR }
        );

        res.json({
          user: new User(user.email, user.name, undefined, user.id),
          token,
        });
      }
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { registerUser, signInUser };
