import mongoose from "mongoose";

export const petSchema = new mongoose.Schema({
  pid:         { type: String, unique: true, required: true },
  chipid:      { type: String },
  passportid:  { type: String },
  name:        { type: String },
  species:     { type: String },
  breed:       { type: Array },
  colour:      { type: Array },
  sex:         { type: String },
  neuter:      { type: Boolean },
  alive:       { type: Boolean },
  birthday:    { type: Date },
  record:      [{ type: String }]
});

export const Pet = mongoose.model("Pet", petSchema);
