import express from "express";
import { Patient } from "../models/Patient.js";

const router = express.Router();

router.get("/", (req, res) => res.json({ status: "online", service: "backend" }));
router.get("/all", async (req, res) => {

  const patients = await Patient.find({});
  res.json(patients);
});

//router.get("/:uid", getPatientByUID);
//router.get("/:uid/fullname", getUserFullname);
//router.get("/:uid/email", getUserEmail);
//router.get("/:uid/pet", getUserPet);

router.post("/register", async (req, res) => {
  try {
    const { lastname, firstname, 
      email, mobile, address, birthday } = req.body;
    if (!lastname) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // 2️⃣ Check if username or email already exists
    const existing = await Patient.findOne({ $and: [{ lastname }, {email}] }); // decide primary identifiers
    if (existing) {
      //return res.status(400).json({ error: "Patient already exists" });
      return res.status(201).json({ message: "Patient updated successfully", uid: existing.uid });
    }

    let uuid = crypto.randomUUID();

    // 4️⃣ Create new user
    const newPatient = new Patient({
      uid: uuid,
      lastname: lastname,
      firstname: firstname,
      email: email,
      mobile: mobile,
      address: address,
      registered: new Date().toISOString(),
      pet: [],
      record: []
    });

    await newPatient.save();

    res.status(201).json({ message: "Patient registered successfully", uid: uuid });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/:uid/data", async (req, res) => {
  try {
    const { uid } = req.params;
    const owner = await Patient.findOne({uid:uid});
    if (!owner) return res.status(401).json("Owner not found");
    res.status(200).json(owner);
  } catch (err) {
    console.error(err);
    res.status(401).json({message:"Not found owner data"});
  }
})

export default router;
