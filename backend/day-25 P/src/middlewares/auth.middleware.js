const jwt = require("jsonwebtoken");
const blacklistModel = require("../models/blacklist.model");

async function authMiddleware(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthrozied User",
    });
  }

  // Check if token is blacklisted
  const blacklistToken = await blacklistModel.findOne({ token });
  if (blacklistToken) {
    return res.status(401).json({
      message: "Token is blacklisted. Please login again.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid User",
    });
  }
}

module.exports = authMiddleware;
