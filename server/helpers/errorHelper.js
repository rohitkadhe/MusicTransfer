const Errors = require("../constants/errors");
class MusicTransferError extends Error {
  constructor(message, statusCode) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}

const handleError = (err, res) => {
  var { statusCode, message } = err;
  if (!statusCode) {
    statusCode = Errors.INTERNAL_SERVER_ERROR;
  }

  res.status(statusCode).json({
    Error: {
      message: message.charAt(0).toUpperCase() + message.slice(1),
      statusCode,
    },
  });
};

module.exports = { MusicTransferError, handleError };
