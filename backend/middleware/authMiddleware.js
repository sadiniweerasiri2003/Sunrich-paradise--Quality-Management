const jwt = require('jsonwebtoken');

// Middleware function to authenticate JSON Web Tokens
const authenticateToken = (req, res, next) => {
  // Retrieve the JWT from the request headers
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  // If token is not provided, return 401 Unauthorized
  if (token == null) {
    return res.sendStatus(401);
  }

  // Verify the JWT token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      // If token is invalid, return 403 Forbidden
      return res.sendStatus(403);
    }
    // If token is valid, attach the user information to the request object
    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };
