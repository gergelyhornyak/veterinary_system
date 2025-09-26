import mongoose from "mongoose";

export const petSchema = new mongoose.Schema({
  pid:         { type: String, unique: true, required: true },
  chipid:      { type: String, unique: true},
  name:        { type: Array },
  species:     { type: Array },
  breed:       { type: Array },
  colour:      { type: String },
  birthday:    { type: Date },
  sex:         { type: String },
  passport:    { type: mongoose.Schema.Types.Mixed },
  weight:      { type: Number },
  record:      [{ type: String }]
});

export const Pet = mongoose.model("Pet", petSchema);
