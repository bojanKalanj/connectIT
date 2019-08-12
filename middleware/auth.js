const jwt = require('jsonwebtoken');
const config = require('config');
const tokenSecret = config.get('jwtSecret');

module.exports = function(req, res, next) {
  const token = req.header('x-auth-token');

  if (!token) {
    res.status(401).json({ msg: 'No token. Authorisation denied!' });
  }

  try {
    const decoded = jwt.verify(token, tokenSecret);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
