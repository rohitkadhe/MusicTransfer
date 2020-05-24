const HttpErrors = require("../constants/httpErrors");

class MusicTransferError extends Error {
  constructor(message, statusCode) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}

class AxiosError extends Error {
  constructor(error) {
    super();
    this.message = error.response.data.error.message;
    this.statusCode = error.response.status;
  }
}

const handleError = (err, res) => {
  let { statusCode, message } = err;
  if (!statusCode) {
    statusCode = HttpErrors.INTERNAL_SERVER_ERROR;
  }
  if (!message) {
    message = "Unknown Server Error";
  }
  res.status(statusCode).json({
    Error: {
      message,
      statusCode,
    },
  });
};

module.exports = { MusicTransferError, AxiosError, handleError };
