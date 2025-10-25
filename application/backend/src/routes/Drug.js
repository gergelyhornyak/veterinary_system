import express from "express";
import { Drug } from "../models/Drug.js";

const router = express.Router();

router.get("/", (req, res) => res.json({ status: "online", service: "backend" }));
router.get("/all", async (req, res) => {
  const drugs = await Drug.find({});
  res.json(drugs);
});

router.post("/add", async (req, res) => {
  try {
    const { value, type } = req.body;
    if (!value) {
      return res.status(400).json({ error: "Specify the name of the drug" });
    }

    // 2️⃣ Check if username or email already exists
    const existing = await Drug.findOne({ $or: [{ value } ] });
    if (existing) {
      return res.status(400).json({ error: "Drug already exists" });
    }

    // 4️⃣ Create new user
    const newDrug = new Drug({
      value: value,
      label: value
    });

    await newDrug.save();

    res.status(201).json({ message: "Drug registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
