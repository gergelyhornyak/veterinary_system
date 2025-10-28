import mongoose from "mongoose";

export const logSchema = new mongoose.Schema({
  lid:          { type: String, unique: true, required: true },
  date:         { type: Date, required: true},
  owner:        { type: String },
  pet:          { type: String },
  record:       { type: String },
  action:       { type: String },
});

export const Log = mongoose.model("Log", logSchema);
