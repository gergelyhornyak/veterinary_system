import mongoose from "mongoose";

export const recordSchema = new mongoose.Schema({
  rid:          { type: String, unique: true, required: true },
  date:         { type: Date, required: true},
  vaccination:  { type: Array, of:mongoose.Schema.Types.Mixed },
  treatment:    { type: Array, of:mongoose.Schema.Types.Mixed },
  weight:       { type: mongoose.Schema.Types.Mixed },
  note:        { type: String }
});

export const Record = mongoose.model("Record", recordSchema);
