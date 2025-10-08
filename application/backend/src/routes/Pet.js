import express from "express";
import { Pet } from "../models/Pet.js";
import { Owner } from "../models/Owner.js";
import { Record } from "../models/Record.js";

const router = express.Router();

router.get("/", (req, res) => res.json({ status: "online", service: "backend" }));
router.get("/all", async (req, res) => {

  const pets = await Pet.find({});
  res.json(pets);
});

router.get("/:pid/data", async (req, res) => {
  try {
    const { pid } = req.params;
    const pet = await Pet.findOne({pid:pid});
    if (!pet) return res.status(401).json("Pet not found");
    res.status(200).json(pet);
  } catch (err) {
    console.error(err);
    res.status(401).json({message:"Not found pet data"});
  }
})

router.post("/register", async (req, res) => {
  try {
    const { uid, chipid, 
      name, species, breed, sex, 
      colour, weight, birthday
       } = req.body;
    if (!uid) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // 2️⃣ Check if username or email already exists
    const existing = await Pet.findOne({ $and: [{ name }, { birthday }, { species }, { breed }, { sex }] });
    if (existing) {
      return res.status(400).json({ error: "Pet already exists with same chip number" });
    }

    let uuid = crypto.randomUUID();

    // 4️⃣ Create new user
    const newPet = new Pet({
      pid: uuid,
      chipid: chipid,
      name: name,
      species: species,
      breed: breed,
      sex: sex,
      colour: colour,
      birthday: birthday,
      weight: weight,
      registered: new Date().toISOString(),
    });

    await newPet.save();

    try {
      const owner = await Owner.findOne({ uid });
      if (!owner) {
        throw new Error("Owner not found");
      }
      owner.pet.push(uuid);
      await owner.save();
    } catch (err) {
      console.log(err);
    }

    // update owner with new pat assigned to them

    res.status(201).json({ message: "Pet registered successfully", pid: uuid, uid: uid });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/:pid/record", async (req, res) => {
  try {
    const { pid } = req.params;
    const pet = await Pet.findOne({pid:pid});
    if (!pet) return res.status(401).json("Pet not found");
    const recordIds = pet.record;
    const records = await Record.find({ rid: { $in: recordIds } });
    res.status(200).json(records);
  } catch (err) {
    console.error(err);
    res.status(401).json({message:"Not found pet record"});
  }
})

export default router;
