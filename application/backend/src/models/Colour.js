import mongoose from "mongoose";

const ColourSchema = new mongoose.Schema({
  value:          { type: String, required: true},
  label:          { type: String}
});

export const Colour = mongoose.model("Colour", ColourSchema);