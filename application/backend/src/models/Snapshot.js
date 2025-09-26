import mongoose from "mongoose";

export const snapshotSchema = new mongoose.Schema({
  sid:          { type: String, unique: true, required: true },
  date:         { type: Date, required: true},
  owner:        { type: mongoose.Schema.Types.Mixed },
  pet:          { type: mongoose.Schema.Types.Mixed },
  anamnesis:    { type: Array, of:mongoose.Schema.Types.Mixed },
  symptoms:     { type: Array, of:mongoose.Schema.Types.Mixed },
  therapy:      { type: Array, of:mongoose.Schema.Types.Mixed },
  note:         { type: String }
});

export const Snapshot = mongoose.model("Snapshot", snapshotSchema);
