import express from "express";
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../src/config/firebase.config"; // Ensure you have your Firebase config here
import upload from "../src/middleware/multer"; // Ensure you have your multer setup here
import dotenv from "dotenv";
import initWebRoutes from "./routes/web";
import initApiRoutes from "./routes/api";
import bodyParser from "body-parser";
import { getDownloadURL } from "firebase/storage";
import cors from "cors";
const admin = require("firebase-admin");
dotenv.config();
const authRouter = require("./routes/auth");
require("../passport");
const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

//configViewEngine(app);
initWebRoutes(app);
initApiRoutes(app);
app.use("/api/auth", authRouter);
var serviceAccount = require(process.env.Credential);
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET, // Ensure this is set
  credential: admin.credential.cert(serviceAccount),
});

async function uploadImage(file, quantity) {
  const storageFB = getStorage();
  await signInWithEmailAndPassword(
    auth,
    process.env.FIREBASE_USER,
    process.env.FIREBASE_AUTH
  );

  if (quantity === "single") {
    const dateTime = Date.now();
    const fileName = `images/${dateTime}-${file.originalname}`;
    const storageRef = ref(storageFB, fileName);
    const metadata = {
      contentType: file.mimetype,
    };
    await uploadBytesResumable(storageRef, file.buffer, metadata);
    return fileName;
  } else if (quantity === "multiple") {
    const fileNames = [];
    for (let i = 0; i < file.length; i++) {
      const dateTime = Date.now();
      const fileName = `images/${dateTime}-${file[i].originalname}`;
      const storageRef = ref(storageFB, fileName);
      const metadata = {
        contentType: file[i].mimetype,
      };
      await uploadBytesResumable(storageRef, file[i].buffer, metadata);
      fileNames.push(fileName);
    }
    return fileNames;
  }
}

app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const imageUrl = await uploadImage(req.file, "single");
    const imageUrlWithPath = imageUrl.split("/").pop();
    res.status(200).send({ imageUrlWithPath });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.post("/upload-multiple", upload.array("images", 12), async (req, res) => {
  try {
    const imageUrls = await uploadImage(req.files, "multiple");
    res.status(200).send({ imageUrls });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Lấy tham chiếu tới bucket storage

app.get("/down-image", async (req, res) => {
  try {
    const fileName = req.body.fileName; // Tên file ảnh được truyền qua query string

    // Tham chiếu tới file trong Firebase Storage
    if (!fileName) {
      return res.status(400).send("Filename is required");
    }

    const bucket = admin.storage().bucket();
    const file = bucket.file(`images/${fileName}`);

    file
      .getSignedUrl({
        action: "read",
        expires: "03-17-2025",
      })
      .then((url) => {
        res.status(200).send({ url });
      })
      .catch((err) => {
        res.status(500).send("Error retrieving image link + " + err.message);
      });
  } catch (error) {
    res.status(500).send("Lỗi khi lấy URL tải ảnh error: " + error.message);
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
