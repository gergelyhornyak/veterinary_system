import mongoose from "mongoose";

const drugSchema = new mongoose.Schema({
  did:            { type: String, required: true, unique: true },
  value:          { type: String, required: true},
  label:          { type: String}
});

export const Drug = mongoose.model("Drug", drugSchema);
