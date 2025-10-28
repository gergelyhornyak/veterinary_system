import express from "express";
import { Owner } from "../models/Owner.js";
import crypto from "crypto";

const router = express.Router();

router.get("/", (req, res) => res.json({ status: "online", service: "backend" }));
router.get("/all", async (req, res) => {
  const owners = await Owner.find({});
  res.json(owners);
});

router.get("/:uid/data", async (req, res) => {
  try {
    const { uid } = req.params;
    const owner = await Owner.findOne({ uid: uid });
    if (!owner) return res.status(401).json({ error: "Owner not found"});
    res.status(200).json(owner);
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Not found owner data" });
  }
});

router.get("/:uid/active", async (req, res) => {
  try {
    const { uid } = req.params;
    const owner = await Owner.findOne({ uid: uid });
    if (!owner) return res.status(401).json({ error: "Owner not found"});
    if ((new Date() - owner.lastvisit) / (1000 * 60 * 60 * 24) > 365) {
      res.status(200).json({ message: "Owner is inactive", active: false });
    } else {
      res.status(200).json({ message: "Owner is active", active: true });
    }
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Not found owner data" });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { fullname, email, mobile, address } = req.body;
    if (!fullname || !address) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // 2️⃣ Check if username or email already exists
    const existing = await Owner.findOne({ $and: [{ fullname }, { address }] }); // primary identifiers
    if (existing) {
      return res.status(401).json({ error: "Owner already exists" });
      //return res.status(201).json({ message: "Owner updated successfully", uid: existing.uid });
    }

    let uuid = crypto.randomUUID();

    // 4️⃣ Create new user
    const newOwner = new Owner({
      uid: uuid,
      fullname,
      email: email,
      mobile: mobile,
      address: address,
      registered: new Date().toISOString(),
      pet: []
    });

    await newOwner.save();

    res.status(201).json({ message: "Owner registered successfully", uid: uuid });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/:uid/update/info", async (req, res) => {
  try {
    const { uid } = req.params;
    const { 
      fullname, address, mobile, email
     } = req.body;
    const owner = await Owner.findOne({ uid: uid });
    if (!owner) return res.status(401).json({ error: "Owner not found" });
    if (owner.fullname === fullname && owner.address === address &&
        owner.mobile === mobile && owner.email === email) {
      return res.status(200).json({ message: "No changes detected" });
    }
    if(fullname !== owner.fullname) owner.fullname = fullname;
    if(address !== owner.address) owner.address = address;
    if(mobile !== owner.mobile) owner.mobile = mobile;
    if(email !== owner.email) owner.email = email;

    await owner.save();
    res.status(200).json({message: "Owner updated successfully", uid: owner.uid});
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Not found owner data" });
  }
});

router.post("/:uid/update/pet", async (req, res) => {
  try {
    const { uid } = req.params;
    const { newPet } = req.body;
    const owner = await Owner.findOne({ uid: uid });
    if (!owner) return res.status(401).json({ error: "Owner not found" });
    console.debug(owner.pet, newPet);
    owner.pet.push(newPet);
    console.debug(owner.pet, newPet);
    await owner.save();
    res.status(200).json({ message: "Pet updated successfully", uid: owner.uid, pid: owner.pet });
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Not found owner data" });
  }
});

router.post("/:uid/remove/pet", async (req, res) => {
  try {
    const { uid } = req.params;
    const { pet } = req.body;
    const owner = await Owner.findOne({ uid: uid });
    if (!owner) return res.status(401).json({ error: "Owner not found" });
    console.debug(owner.pet, pet);
    owner.pet = owner.pet.filter(p => p !== pet);
    console.debug(owner.pet, pet);
    await owner.save();
    res.status(200).json({ message: "Pet removed successfully", uid: owner.uid, pid: pet });
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Not found owner data" });
  }
});

router.post("/:uid/update/debt", async (req, res) => {
  try {
    const { uid } = req.params;
    const { amount } = req.body;
    const owner = await Owner.findOne({ uid: uid });
    if (!owner) return res.status(401).json({ error: "Owner not found" });
    
    owner.debt = 0;
    await owner.save();
    res.status(200).json({ message: "Debt updated successfully", uid: owner.uid });
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Not found owner data" });
  }
});

export default router;
