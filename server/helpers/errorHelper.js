const HttpErrors = require("../constants/httpErrors");
class MusicTransferError extends Error {
  constructor(message, statusCode) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}

const handleError = (err, res) => {
  let { statusCode, message } = err;
  if (!statusCode || !message) {
    statusCode = HttpErrors.INTERNAL_SERVER_ERROR;
    message = "Internal Server Error";
  }

  res.status(statusCode).json({
    Error: {
      message: message.charAt(0).toUpperCase() + message.slice(1),
      statusCode,
    },
  });
};

module.exports = { MusicTransferError, handleError };
