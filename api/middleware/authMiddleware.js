const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies?.access_token;
  // console.log(req.cookies, token);
  if (!token) {
    return next("Unauthorized");
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return next("Unauthorized token");
    }
    req.user = user;
    next();
  });
};

module.exports = {
  verifyToken,
};
