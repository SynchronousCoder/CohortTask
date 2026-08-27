const jwt = require("jsonwebtoken");
const blackListModel = require("../models/blacklist.model");

async function identifyUser(req, res, next) {
  const token = req.cookies.token;

  const isTokenBlackListed = await blackListModel.findOne({
    token
  })

  if(isTokenBlackListed){
    return res.status(401).json({
      message: "Unauthrozied User, Token is blacklisted"
    })
  }
  
  if (!token) {
    return res.status(401).json({
      message: "unauthrozied User, Doesn't have Token",
    });
  }

  let decoded = null;

  try {
    decoded = await jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(409).json({
      message: "Unauthrozied User, Token not verified",
    });
  }

  req.user = decoded;
  next()
}

module.exports = identifyUser;