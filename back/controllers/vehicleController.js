const mongoose = require("mongoose");
const Vehicle = require("../models/vehicleModel.js");

const getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getVehicleById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ error: 'Invalid ID type' });

    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) return res.status(404).json({ error: 'Vehicle not found' });

    res.json(vehicle);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.create({ ...req.body });

    res.status(201).json(vehicle);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteVehicle = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ error: 'Invalid ID type' });

    const vehicle = await Vehicle.findOneAndDelete({ _id: req.params.id });

    if (!vehicle) return res.status(404).json({ error: 'Vehicle not found' });

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateVehicle = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.status(400).json({ error: 'Invalid ID type' });

    const vehicle = await Vehicle.findByIdAndUpdate({ _id: req.params.id }, { ...req.body }, { new: true });

    if (!vehicle) return res.status(404).json({ error: 'Vehicle not found' });

    const updatedAttributes = {};
    for (const [key] of Object.entries(req.body)) {
      if (vehicle[key] !== undefined) {
        updatedAttributes[key] = vehicle[key];
      }
    }

    res.status(200).json(updatedAttributes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getVehicles,
  getVehicleById,
  createVehicle,
  deleteVehicle,
  updateVehicle,
};
