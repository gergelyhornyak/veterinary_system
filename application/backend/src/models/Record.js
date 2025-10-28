import mongoose from "mongoose";

export const recordSchema = new mongoose.Schema({
  rid:          { type: String, unique: true, required: true },
  date:         { type: Date, required: true},
  type:         { type: String, required: true },
  drug:         { type: mongoose.Schema.Types.Mixed},
  treatment:    { type: mongoose.Schema.Types.Mixed},
  vaccination:  { type: mongoose.Schema.Types.Mixed},
  receipt:      { type: String},
  photo:        { type: String },
  note:         { type: String }
});

export const Record = mongoose.model("Record", recordSchema);
