const express = require("express")
const router = express.Router()
const controllers = require("../controllers/auth.controller");
const middleware = require("../middlewares/auth.middleware");

router.post("/register", controllers.registerUser);
router.post("/login", controllers.loginUser)
router.get("/get-me", middleware, controllers.getMe);
router.get("/logout", middleware, controllers.LogoutUser);

module.exports = router;