class MusicTransferError extends Error {
  constructor(message, code) {
    super();
    this.code = code;
    this.message = message;
  }
}

const handleError = (err, res) => {
  const { code, message } = err;
  console.log(code, message);
  console.log("here");
  res.status(code).json({
    Error: {
      message,
      code,
    },
  });
};

module.exports = { MusicTransferError, handleError };
