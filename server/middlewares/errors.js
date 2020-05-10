const errorHelper = require("../helpers/errorHelper");

module.exports = (err, req, res, next) => {
  errorHelper.handleError(err, res);
};
