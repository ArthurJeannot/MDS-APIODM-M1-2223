const mongoose = require("mongoose");
const Film = require("../models/filmModel.js");

const getFilms = async (req, res) => {
  try {
    const films = await Film.find();
    res.json(films);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getFilmById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(400).json({ error: 'Invalid ID type' });

    const film = await Film.findById(req.params.id);

    if (!film) return res.status(404).json({ error: 'Film not found' });

    res.json(film);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createFilm = async (req, res) => {
  try {
    const film = await Film.create({ ...req.body });

    res.status(201).json(film);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteFilm = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(400).json({ error: 'Invalid ID type' });

    const film = await Film.findOneAndDelete({ _id: req.params.id });

    if (!film) return res.status(404).json({ error: 'Film not found' });

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateFilm = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(400).json({ error: 'Invalid ID type' });

    const film = await Film.findByIdAndUpdate(
      { _id: req.params.id },
      { ...req.body },
      { new: true }
    );

    if (!film) return res.status(404).json({ error: 'Film not found' });

    const updatedAttributes = {};
    for (const [key] of Object.entries(req.body)) {
      if (film[key] !== undefined) {
        updatedAttributes[key] = film[key];
      }
    }

    res.status(200).json(updatedAttributes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getFilms,
  getFilmById,
  createFilm,
  deleteFilm,
  updateFilm,
};
