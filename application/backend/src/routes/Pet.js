import express from "express";
import { Pet } from "../models/Pet.js";
import { Record } from "../models/Record.js";
import crypto from "crypto";

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
    if (!pet) return res.status(401).json({error:"Pet not found"});
    res.status(200).json(pet);
  } catch (err) {
    console.error(err);
    res.status(401).json({error:"Not found pet data"});
  }
});

router.get("/:pid/record", async (req, res) => {
  try {
    const { pid } = req.params;
    const pet = await Pet.findOne({pid:pid});
    if (!pet) return res.status(401).json({error:"Pet not found"});
    const recordIds = pet.record;
    res.status(200).json({recordIDs: recordIds});
  } catch (err) {
    console.error(err);
    res.status(401).json({error:"Not found pet record"});
  }
});


router.post("/register", async (req, res) => {
  try {
    const { name, species, breed, colour, sex, 
      neuter, alive, birthday, chipid, passportid, photoURL
       } = req.body;
    if (!name || !species) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existing = await Pet.findOne({ $and: [{ name }, { birthday }, { species }, { breed }, { sex }] });
    if (existing) {
      return res.status(400).json({ error: "Pet already exists" });
    }

    let uuid = crypto.randomUUID();

    const newPet = new Pet({
      pid: uuid,
      chipid: chipid,
      passportid: passportid,
      name: name,
      species: species,
      breed: breed,
      colour: colour,
      sex: sex,
      neuter: neuter,
      alive: alive,
      birthday: birthday,
      registered: new Date().toISOString(),
      photo: photoURL,
      record: []
    });

    await newPet.save();
    res.status(201).json({ message: "Pet registered successfully", pid: uuid });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/:pid/update/info", async (req, res) => {
  try {
    const { pid } = req.params;
    const { chipid, passportid, name, neuter, alive
       } = req.body;
    const pet = await Pet.findOne({pid:pid});
    if (!pet) return res.status(401).json({error:"Pet not found"});
    // add no changes detected section
    if( name !== pet.name ) pet.name = name;
    if( neuter !== pet.neuter ) pet.neuter = neuter;
    if( alive !== pet.alive ) pet.alive = alive;
    
    await pet.save();
    
    res.status(200).json({message: "Pet updated successfully", pet: pet.name});
  } catch (err) {
    console.error(err);
    res.status(401).json({error:"Not found pet data"});
  }
});

router.post("/:pid/update/record", async (req, res) => {
  try {
    const { pid } = req.params;
    const { newRecordID } = req.body;
    const pet = await Pet.findOne({pid:pid});
    if (!pet) return res.status(401).json({error:"Pet not found"});
    // add no changes detected section
    pet.record.push(newRecordID);
    await pet.save();
    res.status(200).json({message: "Pet updated successfully", pid: pet.pid});
  } catch (err) {
    console.error(err);
    res.status(401).json({error:"Not found pet data"});
  }
});


export default router;
