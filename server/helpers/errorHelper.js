const Errors = require("../constants/errors");
class MusicTransferError extends Error {
  constructor(message, statusCode) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}

const handleError = (err, res) => {
  const { statusCode, message } = err;
  if (!statusCode) {
    statusCode = Errors.INTERNAL_SERVER_ERROR;
  }
  console.log(statusCode, message);
  res.status(statusCode).json({
    Error: {
      message,
      statusCode,
    },
  });
};

module.exports = { MusicTransferError, handleError };
