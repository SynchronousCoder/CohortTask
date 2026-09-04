const express = require("express");
const upload = require("../middleware/upload.middleware")
const controller = require("../controller/song.controller")

const songRouter = express.Router();

/**
 * /api/song/
 */
songRouter.post("/", upload.single("song"), controller.uploadSong);

/**
 * api/song?mood=suprised
 */
songRouter.get("/", controller.getSong)

module.exports = songRouter;
