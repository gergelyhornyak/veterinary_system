import express from "express";
import { Record } from "../models/Record.js";
import { Pet } from "../models/Pet.js";
import { Owner } from "../models/Owner.js";
import { Drug } from "../models/Drug.js";
import { json2csv } from 'json-2-csv';

const router = express.Router();

router.get("/", (req, res) => res.json({ status: "online", service: "backend" }));
router.get("/all", async (req, res) => {
  const records = await Record.find({});
  res.json(records);
});

router.get("/:rid/data", async (req, res) => {
  try {
    const { rid } = req.params;
    const record = await Record.findOne({ rid: rid });
    if (!record) return res.status(401).json("Record not found");
    res.status(200).json(record);
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Not found record" });
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

    res.status(201).json({ message: "Pet record registered successfully", rid: uuid });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/export", async (req, res) => {
  try {
    // Assuming Mongoose is already connected via connectDB.js
    const recordData = await Record.find().lean();
    const petData = await Pet.find().lean();
    const ownerData = await Owner.find().lean();
    const drugData = await Drug.find().lean();

    const recordFields = ["date", "type", "note"]; 
    const petFields = ["name", "species", "breed", "colour"]; 
    const ownerFields = ["fullname", "address"]; 
    const drugFields = ["label"];

    const recordCSV =  await json2csv(recordData, { keys: recordFields });
    const petCSV =  await json2csv(petData, { keys: petFields });
    const ownerCSV =  await json2csv(ownerData, { keys: ownerFields });
    const drugCSV =  await json2csv(drugData, { keys: drugFields });

    const combinedCsv =
      "### Owners Table ###\n" +
      ownerCSV +
      "\n\n### Pets Table ###\n" +
      petCSV + 
      "\n\n### Records Table ###\n" +
      recordCSV +
      "\n\n### Drugs Table ###\n" +
      drugCSV;

    res.header("Content-Type", "text/csv");
    res.attachment("export.csv");
    res.send(combinedCsv);
  } catch (err) {
    console.error("Error exporting data:", err);
    res.status(500).send("Failed to export data");
  }
});

export default router;
