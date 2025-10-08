import express from "express";
import { Owner } from "../models/Owner.js";

const router = express.Router();

router.get("/", (req, res) => res.json({ status: "online", service: "backend" }));
router.get("/all", async (req, res) => {

  const patients = await Owner.find({});
  res.json(patients);
});

router.post("/register", async (req, res) => {
  try {
    const { fullname, email, mobile, address, birthday } = req.body;
    if (!fullname || !address) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // 2️⃣ Check if username or email already exists
    const existing = await Owner.findOne({ $and: [{ fullname }, {address}] }); // decide primary identifiers
    if (existing) {
      //return res.status(400).json({ error: "Patient already exists" });
      return res.status(201).json({ message: "Owner updated successfully", uid: existing.uid });
    }

    let uuid = crypto.randomUUID();

    // 4️⃣ Create new user
    const newPatient = new Owner({
      uid: uuid,
      fullname,
      email: email,
      mobile: mobile,
      address: address,
      registered: new Date().toISOString(),
      pet: [],
      record: []
    });

    await newPatient.save();

    res.status(201).json({ message: "Owner registered successfully", uid: uuid });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/:uid/data", async (req, res) => {
  try {
    const { uid } = req.params;
    const owner = await Owner.findOne({uid:uid});
    if (!owner) return res.status(401).json("Owner not found");
    res.status(200).json(owner);
  } catch (err) {
    console.error(err);
    res.status(401).json({message:"Not found owner data"});
  }
})

router.post("/:uid/update/fullname", async (req, res) => {
  try {
    const { uid } = req.params;
    const { fullname } = req.body;
    const owner = await Owner.findOne({uid:uid});
    if (!owner) return res.status(401).json("Owner not found");
    owner.fullname = fullname;
    owner.save();
    res.status(200).json(owner);
  } catch (err) {
    console.error(err);
    res.status(401).json({message:"Not found owner data"});
  }
})

router.post("/:uid/update/address", async (req, res) => {
  try {
    const { uid } = req.params;
    const { address } = req.body;
    const owner = await Owner.findOne({uid:uid});
    if (!owner) return res.status(401).json("Owner not found");
    owner.address = address;
    owner.save();
    res.status(200).json(owner);
  } catch (err) {
    console.error(err);
    res.status(401).json({message:"Not found owner data"});
  }
})

router.post("/:uid/update/pet", async (req, res) => {
  try {
    const { uid } = req.params;
    const { oldPID, newPID } = req.body;
    const owner = await Owner.findOne({uid:uid});
    if (!owner) return res.status(401).json("Owner not found");
    // owner.pet list find old pet id, and replace with new pet id
    owner.save();
    res.status(200).json(owner);
  } catch (err) {
    console.error(err);
    res.status(401).json({message:"Not found owner data"});
  }
})

export default router;
