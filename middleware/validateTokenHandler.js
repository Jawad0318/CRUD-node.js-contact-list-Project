const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const ValidateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHandler = req.headers.authorization || req.headers.Authorization;
  if (authHandler && authHandler.startsWith('Bearer')) {
    token = authHandler.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error('user is not authorized');
      }

      req.user = decoded.user;
      next();
    });
    if (!token) {
      res.status(401);
      throw new Error('user is not authorized or token is missing');
    }
  }
});
module.exports = ValidateToken;
