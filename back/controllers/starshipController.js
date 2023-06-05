const mongoose = require("mongoose");
const Starship = require("../models/starshipModel.js");

const getStarships = async (req, res) => {
  try {
    const starships = await Starship.find();
    res.json(starships);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getStarshipById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ error: 'Invalid ID type' });

    const starship = await Starship.findById(req.params.id);

    if (!starship) return res.status(404).json({ error: 'Starship not found' });

    res.json(starship);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createStarship = async (req, res) => {
  try {
    const starship = await Starship.create({ ...req.body });

    res.status(201).json(starship);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteStarship = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ error: 'Invalid ID type' });

    const starship = await Starship.findOneAndDelete({ _id: req.params.id });

    if (!starship) return res.status(404).json({ error: 'Starship not found' });

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateStarship = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ error: 'Invalid ID type' });

    const starship = await Starship.findByIdAndUpdate({ _id: req.params.id }, { ...req.body }, { new: true });

    if (!starship) return res.status(404).json({ error: 'Starship not found' });

    const updatedAttributes = {};
    for (const [key] of Object.entries(req.body)) {
      if (starship[key] !== undefined) {
        updatedAttributes[key] = starship[key];
      }
    }

    res.status(200).json(updatedAttributes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getStarships,
  getStarshipById,
  createStarship,
  deleteStarship,
  updateStarship,
};
