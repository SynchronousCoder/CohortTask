const songModel = require("../models/song.model");
const storageService = require("../services/storage.service");
const id3 = require("node-id3");

async function uploadSong(req, res) {
  const { mood } = req.body;
  const songBuffer = req.file.buffer;

  const tags = id3.read(songBuffer);

  console.log("=>", tags.title);

  const [songFile, posterFile] = await Promise.all([
    storageService.uploadSong({
      buffer: songBuffer,
      fileName: tags.title + ".mp3",
      folder: "/moodify/songs",
    }),
    storageService.uploadSong({
      buffer: tags.image.imageBuffer,
      fileName: tags.title + ".jpg",
      folder: "/moodify/posters",
    }),
  ]);

  console.log("=>", songFile, posterFile, songBuffer);

  const song = await songModel.create({
    url: songFile.url,
    posterUrl: posterFile.url,
    title: tags.title,
    mood: mood,
  });

  res.status(201).json({
    message: "Song added successfully",
    song,
  });
}

async function getSong(req, res) {
  const { mood } = req.query;
  const [song] = await songModel.aggregate([
    { $match: { mood } }, // mood ke basis pe filter
    { $sample: { size: 1 } }, // ek random document pick karega
  ]);

  res.status(200).json({
    message: "song fetched successfully.",
    song,
  });
}
module.exports = {
  uploadSong,
  getSong,
};
