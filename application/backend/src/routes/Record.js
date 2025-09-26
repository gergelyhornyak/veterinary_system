import express from "express";
import { Record } from "../models/Record.js";
import { Pet } from "../models/Pet.js";

const router = express.Router();

router.get("/", (req, res) => res.json({ status: "online", service: "backend" }));
router.get("/all", async (req, res) => {
  const records = await Record.find({});
  res.json(records);
});

router.get("/:rid/data", async (req, res) => {
  try {
    const { rid } = req.params;
    const record = await Record.findOne({rid:rid});
    if (!record) return res.status(401).json("Record not found");
    res.status(200).json(record);
  } catch (err) {
    console.error(err);
    res.status(401).json({message:"Not found record"});
  }
})

router.post("/add", async (req, res) => {
  try {
    const { pid, vaccination, treatment, weight, note } = req.body;
    if (!pid) {
      return res.status(400).json({ error: "All fields are required" });
    }

    let uuid = crypto.randomUUID();

    // 4️⃣ Create new user
    const recordContent = {
      rid: uuid,
      date: new Date().toISOString(),
      vaccination: vaccination,
      treatment: treatment,
      weight: weight,
      note: note
    }
    const newRecord = new Record(recordContent);

    await newRecord.save();

    try {
          const pet = await Pet.findOne({ pid });
          if (!pet) {
            throw new Error("Pet not found");
          }
          pet.record.push(recordContent);
          await pet.save();
        } catch (err) {
          console.log(err);
        }

    res.status(201).json({ message: "Pet record registered successfully", rid: uuid});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


export default router;
