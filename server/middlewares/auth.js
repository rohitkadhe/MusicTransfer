const authHelper = require("../helpers/authHelper");

const verifyAuth = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    res.status(401).send({ Error: "Missing token. Request denied" });
    next();
  }
  try {
    const decoded = authHelper.decode(token);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).send({ Error: "Invalid token" });
    next();
  }
};

module.exports = verifyAuth;
