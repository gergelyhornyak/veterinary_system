import mongoose from "mongoose";

const ownerSchema = new mongoose.Schema({
  uid:        { type: String, unique: true, required: true },
  fullname:   { type: String, required: true },
  email:      { type: Array },
  mobile:     { type: Array },
  address:    { type: String, required: true },
  registered: { type: Date },
  pet:        [{ type: String }],
  record:     [{ type: String }],
  debt:       { type: Number, default: 0 },
});

export const Owner = mongoose.model("Owner", ownerSchema);
