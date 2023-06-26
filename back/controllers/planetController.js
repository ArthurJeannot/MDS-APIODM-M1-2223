const Planet = require("../models/planetModel.js");

const getPlanets = async (req, res) => {
  try {
    const planets = await Planet.find();

    res.json(planets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getPlanetById = async (req, res) => {
  try {
    const planet = await Planet.findById(req.params.id);

    if (!planet) return res.status(404).json({ error: 'Planet not found' });

    res.json(planet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createPlanet = async (req, res) => {
  try {
    let newId = req.body._id || 1;

    if(!req.body._id) {
      const highestIdDocument = await Planet.findOne().sort({ _id: -1 }).limit(1);
      if (highestIdDocument) newId = highestIdDocument._id + 1;
    }

    const planet = await Planet.create({ _id : newId, ...req.body });

    res.status(201).json(planet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deletePlanet = async (req, res) => {
  try {
    const planet = await Planet.findOneAndDelete({ _id: req.params.id });

    if (!planet) return res.status(404).json({ error: 'Planet not found' });

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updatePlanet = async (req, res) => {
  try {
    const planet = await Planet.findByIdAndUpdate(
      { _id: req.params.id },
      { ...req.body },
      { new: true }
    );

    if (!planet) return res.status(404).json({ error: 'Planet not found' });

    const updatedAttributes = {};
    for (const [key] of Object.entries(req.body)) {
      if (planet[key] !== undefined) {
        updatedAttributes[key] = planet[key];
      }
    }

    res.status(200).json(updatedAttributes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getPlanets,
  getPlanetById,
  createPlanet,
  deletePlanet,
  updatePlanet,
};
