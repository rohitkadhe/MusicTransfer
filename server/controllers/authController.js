const User = require("../models/MusicTransfer/User");
const authUtil = require("../utils/authUtil");
const Time = require("../constants/time");

const register = async (req, res, next) => {
  const { email, password, name } = req.body;
  try {
    if (
      User.validModel(email, password, name) &&
      !(await User.accountExists(email))
    ) {
      const hashedPassword = await authUtil.hashPassword(password);

      const user = new User(email, name, hashedPassword);

      const savedUser = await user.save(["id", "name", "email"]);
      const token = authUtil.genToken(
        { id: user.id },
        { expiresIn: Time.ONE_HOUR }
      );

      res.json({ user: savedUser, token });
    }
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (User.validSignInRequest(email, password)) {
      const user = await User.findUser(email);

      if (await User.validCredentials(password, user.password)) {
        const token = authUtil.genToken(
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

module.exports = { register, login };
