import mongoose from "mongoose";

const drugSchema = new mongoose.Schema({
  value:          { type: String, required: true},
  label:          { type: String}
});

export const Drug = mongoose.model("Drug", drugSchema);
