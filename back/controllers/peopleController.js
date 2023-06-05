const mongoose = require("mongoose");
const People = require("../models/peopleModel.js");

const getPeoples = async (req, res) => {
  try {
    const peoples = await People.find();
    res.json(peoples);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getPeopleById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ error: 'Invalid ID type' });

    const people = await People.findById(req.params.id);

    if (!people) return res.status(404).json({ error: 'People not found' });

    res.json(people);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createPeople = async (req, res) => {
  try {
    const people = await People.create({ ...req.body });

    res.status(201).json(people);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deletePeople = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ error: 'Invalid ID type' });

    const people = await People.findOneAndDelete({ _id: req.params.id });

    if (!people) return res.status(404).json({ error: 'People not found' });

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updatePeople = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ error: 'Invalid ID type' });

    const people = await People.findByIdAndUpdate({ _id: req.params.id }, { ...req.body }, { new: true });

    if (!people) return res.status(404).json({ error: 'People not found' });

    const updatedAttributes = {};
    for (const [key] of Object.entries(req.body)) {
      if (people[key] !== undefined) {
        updatedAttributes[key] = people[key];
      }
    }

    res.status(200).json(updatedAttributes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getPeoples,
  getPeopleById,
  createPeople,
  deletePeople,
  updatePeople,
};
