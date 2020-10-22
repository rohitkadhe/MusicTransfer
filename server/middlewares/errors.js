const errorHelper = require('../helpers/errorHelper');

module.exports = (req, res, next) => {
  errorHelper.handleError(err, res);
};
