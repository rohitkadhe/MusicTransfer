const verifyToken = (req, res, next) => {
  authorization_header = req.headers.authorization;
  if (authorization_header !== 'undefined') {
    const headerContents = authorization_header.split(' ');
    const token = headerContents[1];
    req.token = token;
  } else {
    req.token = '';
  }
  next();
};

module.exports = verifyToken;
