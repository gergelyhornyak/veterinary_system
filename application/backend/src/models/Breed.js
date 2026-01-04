import mongoose from "mongoose";

const BreedSchema = new mongoose.Schema({
  species:     { type: String, required: true},
  value:          { type: String, required: true},
  label:          { type: String}
});

export const Breed = mongoose.model("Breed", BreedSchema);