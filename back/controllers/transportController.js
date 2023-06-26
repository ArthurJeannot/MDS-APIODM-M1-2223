const Transport = require("../models/transportModel.js");

const getTransports = async (req, res) => {
  try {
    const transports = await Transport.find();

    res.json(transports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getTransportById = async (req, res) => {
  try {
    const transport = await Transport.findById(req.params.id);

    if (!transport) return res.status(404).json({ error: 'Transport not found' });

    res.json(transport);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createTransport = async (req, res) => {
  try {
    let newId = req.body._id || 1;

    if(!req.body._id) {
      const highestIdDocument = await Transport.findOne().sort({ _id: -1 }).limit(1);
      if (highestIdDocument) newId = highestIdDocument._id + 1;
    }

    const transport = await Transport.create({ _id : newId, ...req.body });

    res.status(201).json(transport);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteTransport = async (req, res) => {
  try {
    const transport = await Transport.findOneAndDelete({ _id: req.params.id });

    if (!transport) return res.status(404).json({ error: 'Transport not found' });

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateTransport = async (req, res) => {
  try {
    const transport = await Transport.findByIdAndUpdate({ _id: req.params.id }, { ...req.body }, { new: true });

    if (!transport) return res.status(404).json({ error: 'Transport not found' });

    const updatedAttributes = {};
    for (const [key] of Object.entries(req.body)) {
      if (transport[key] !== undefined) {
        updatedAttributes[key] = transport[key];
      }
    }

    res.status(200).json(updatedAttributes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getTransports,
  getTransportById,
  createTransport,
  deleteTransport,
  updateTransport,
};
