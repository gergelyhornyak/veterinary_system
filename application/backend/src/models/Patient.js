import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  uid:        { type: String, unique: true, required: true },
  lastname:   { type: String, required: true },
  firstname:  { type: Array },
  email:      { type: Array },
  mobile:     { type: Array },
  address:    { type: String },
  registered: { type: Date },
  pet:        [{ type: String }],
  record:     [{ type: String }]
});

export const Patient = mongoose.model("Patient", patientSchema);
