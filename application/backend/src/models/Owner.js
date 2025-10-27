import mongoose from "mongoose";

const ownerSchema = new mongoose.Schema({
  uid:        { type: String, unique: true, required: true },
  fullname:   { type: String, required: true },
  address:    { type: String, required: true },
  email:      { type: String },
  mobile:     { type: String },
  registered:  { type: Date, default: Date.now },
  pet:        [{ type: String }],
  lastvisit:  { type: Date },
  debt:       { type: Number, default: 0 },
});

export const Owner = mongoose.model("Owner", ownerSchema);
