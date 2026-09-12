import jwt from "jsonwebtoken";
async function identifyUser(req, res, next) {
  const token = req.cookies.token;

  let decoded = null;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(400).json({
        message: "Inavlid Token",
      });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
      error: error.message,
    });
  }
}

export default identifyUser;
