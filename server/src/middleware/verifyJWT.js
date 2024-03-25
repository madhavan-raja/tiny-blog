const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const verifyJWT = (token) => {
  const decodedToken = jwt.verify(token, JWT_SECRET);
  const userId = decodedToken.userId;

  return userId;
};

module.exports = verifyJWT;
