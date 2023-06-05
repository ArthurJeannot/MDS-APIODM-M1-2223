const mongoose = require("mongoose");
const Specie = require("../models/specieModel.js");

const getSpecies = async (req, res) => {
  try {
    const species = await Specie.find();
    res.json(species);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSpecieById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ error: 'Invalid ID type' });

    const specie = await Specie.findById(req.params.id);

    if (!specie) return res.status(404).json({ error: 'Specie not found' });

    res.json(specie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createSpecie = async (req, res) => {
  try {
    const specie = await Specie.create({ ...req.body });

    res.status(201).json(specie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteSpecie = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ error: 'Invalid ID type' });

    const specie = await Specie.findOneAndDelete({ _id: req.params.id });

    if (!specie) return res.status(404).json({ error: 'Specie not found' });

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateSpecie = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ error: 'Invalid ID type' });

    const specie = await Specie.findByIdAndUpdate({ _id: req.params.id }, { ...req.body }, { new: true });

    if (!specie) return res.status(404).json({ error: 'Specie not found' });

    const updatedAttributes = {};
    for (const [key] of Object.entries(req.body)) {
      if (specie[key] !== undefined) {
        updatedAttributes[key] = specie[key];
      }
    }

    res.status(200).json(updatedAttributes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getSpecies,
  getSpecieById,
  createSpecie,
  deleteSpecie,
  updateSpecie,
};
