const jwt = require("jsonwebtoken");

const verifyJWT = (token) => {
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decodedToken.userId;

  return userId;
};

module.exports = verifyJWT;
