const Vehicle = require("../models/vehicleModel.js");

const getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();

    res.json(vehicles.map(vehicle => addHATEOASlinks(vehicle)));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) return res.status(404).json({ error: 'Vehicle not found' });

    res.json(addHATEOASlinks(vehicle));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createVehicle = async (req, res) => {
  try {
    let newId = req.body._id || 1;

    if(!req.body._id) {
      const highestIdDocument = await Vehicle.findOne().sort({ _id: -1 }).limit(1);
      if (highestIdDocument) newId = highestIdDocument._id + 1;
    }

    const vehicle = await Vehicle.create({ _id : newId, ...req.body });

    res.status(201).json(addHATEOASlinks(vehicle));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findOneAndDelete({ _id: req.params.id });

    if (!vehicle) return res.status(404).json({ error: 'Vehicle not found' });

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateVehicle = async (req, res) => {
  try {
    let vehicle = await Vehicle.findByIdAndUpdate({ _id: req.params.id }, { ...req.body }, { new: true });

    if (!vehicle) return res.status(404).json({ error: 'Vehicle not found' });

    vehicle = addHATEOASlinks(vehicle);

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

function addHATEOASlinks(vehicle) {
  const transformedPilots = vehicle.pilots.map(characterId => {
    return {
      id: characterId,
      href: `/peoples/${characterId}`
    };
  });

  return {
    ...vehicle._doc,
    pilots: transformedPilots
  };
}


module.exports = {
  getVehicles,
  getVehicleById,
  createVehicle,
  deleteVehicle,
  updateVehicle,
};
