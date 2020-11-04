const verifyToken = (req, res, next) => {
  authorization_header = req.headers.authorization;
  try {
    const headerContents = authorization_header.split(' ');
    const token = headerContents[1];
    req.token = token;
    next();
  } catch (err) {
    req.token = '';
    next({ statusCode: 401, message: '401 Unauthorized' });
  }
};

module.exports = verifyToken;
