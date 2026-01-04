import mongoose from "mongoose";

const SpeciesSchema = new mongoose.Schema({
  value:          { type: String, required: true},
  label:          { type: String}
});

export const Species = mongoose.model("Species", SpeciesSchema);