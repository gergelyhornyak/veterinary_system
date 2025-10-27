import mongoose from "mongoose";

const photoSchema = new mongoose.Schema({
  pid: { type: String, required: true, unique: true },
  filename: { type: String },
  path: { type: String },
  mimetype: { type: String },
  size: { type: Number },
  created: { type: Date, default: Date.now },
});

export const Photo = mongoose.model("Photo", photoSchema);
