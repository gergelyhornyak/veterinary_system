import express from "express";
import multer from "multer";
import crypto from "crypto";
import path from "path";
import { Photo } from "../models/Photo.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // make sure this folder exists
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = crypto.randomUUID() + ext;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

router.get("/", (req, res) => res.json({ status: "online", service: "backend" }));
router.get("/all", async (req, res) => {
  const photos = await Photo.find({});
  res.json(photos);
});

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const uuid = crypto.randomUUID();
    const photoPath = `/uploads/${req.file.filename}`; // accessible via static route

    const newPhoto = new Photo({
      pid: uuid,
      filename: req.file.originalname,
      path: photoPath,
      mimetype: req.file.mimetype,
      size: req.file.size,
      created: new Date(),
    });

    await newPhoto.save();

    res.status(201).json({
      message: "Photo uploaded successfully",
      url: photoPath,
      id: uuid,
    });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
