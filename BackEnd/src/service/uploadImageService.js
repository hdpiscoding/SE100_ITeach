const admin = require("firebase-admin");
const uuid = require("uuid-v4");
const express = require("express");
const multer = require("multer");
const uploadImage = async (file) => {
  const bucket = admin.storage().bucket();
  const id = uuid();
  const fileName = `${id}-${file.originalname}`;
  const fileUpload = bucket.file(fileName);

  const stream = fileUpload.createWriteStream({
    metadata: {
      contentType: file.mimetype,
    },
  });

  return new Promise((resolve, reject) => {
    stream.on("error", (error) => {
      reject(error);
    });

    stream.on("finish", async () => {
      try {
        await fileUpload.makePublic();
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
        resolve(publicUrl);
      } catch (error) {
        reject(error);
      }
    });

    stream.end(file.buffer);
  });
};

const upload = multer({
  storage: multer.memoryStorage(),
});

const app = express();

app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const publicUrl = await uploadImage(req.file);
    res.status(200).send({ url: publicUrl });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = app;
