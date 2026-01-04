import express from "express";
import { Breed } from "../models/Breed.js";
import { Colour} from "../models/Colour.js";
import { Species } from "../models/Species.js";
import crypto from "crypto";

const router = express.Router();

router.get("/", (req, res) => res.json({ status: "online", service: "backend" }));

router.get("/species", async (req, res) => {
  const species = await Species.find({});
  res.json(species);
});

router.get("/breeds", async (req, res) => {
  const breeds = await Breed.find({});
  res.json(breeds);
});

router.get("/colours", async (req, res) => {
  const colours = await Colour.find({});
  res.json(colours);
});

router.post("/add", async (req, res) => {
  try {
    const { value, species, type } = req.body;
    if (!value || !type) {
      return res.status(400).json({ error: "Specify the name and type of the form item" });
    }

    if(type === "breed") {
      const newBreed = new Breed({
        value: value,
        label: value,
        species: species
      });
      await newBreed.save();
    }
    else if(type === "colour") {
      const newColour = new Colour({
        value: value,
        label: value
      });
      await newColour.save();
    } 
    else if(type === "species") {
      const newSpecies = new Species({
        value: value,
        label: value
      });
      await newSpecies.save();
    } 
    else {
      return res.status(400).json({ error: "Invalid form item type" });
    }

    res.status(201).json({ message: `${type} added successfully` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
