const jwt = require("jsonwebtoken")
const dotenv = require("dotenv");
dotenv.config();
const verifyToken = async (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  let token = "";
  if (bearerHeader) {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    token = bearerToken;
  }
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    res.locals.user = decoded;
    console.log(res.locals);
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;