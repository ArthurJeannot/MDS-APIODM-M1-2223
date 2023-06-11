const mongoose = require("mongoose");
const Film = require("../models/filmModel.js");

const getFilms = async (req, res) => {
  try {
    const films = await Film.find();

    res.json(films.map(film => addHATEOASlinks(film)));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getFilmById = async (req, res) => {
  try {
    const film = await Film.findById(req.params.id);

    if (!film) return res.status(404).json({ error: 'Film not found' });

    res.json(addHATEOASlinks(film));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createFilm = async (req, res) => {
  try {
    let newId = req.body._id || 1;

    if(!req.body._id) {
      const highestIdDocument = await Film.findOne().sort({ _id: -1 }).limit(1);
      if (highestIdDocument) newId = highestIdDocument._id + 1;
    }

    const film = await Film.create({ _id : newId, ...req.body });
    
    res.status(201).json(addHATEOASlinks(film));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteFilm = async (req, res) => {
  try {
    const film = await Film.findOneAndDelete({ _id: req.params.id });

    if (!film) return res.status(404).json({ error: 'Film not found' });

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateFilm = async (req, res) => {
  try {
    let film = await Film.findByIdAndUpdate(
      { _id: req.params.id },
      { ...req.body },
      { new: true }
    );

    if (!film) return res.status(404).json({ error: 'Film not found' });

    film = addHATEOASlinks(film);

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

function addHATEOASlinks(film) {
  const transformedStarships = film.starships.map(starshipId => {
    return {
      id: starshipId,
      href: `/starships/${starshipId}`
    };
  });

  const transformedVehicles = film.vehicles.map(vehicleId => {
    return {
      id: vehicleId,
      href: `/vehicles/${vehicleId}`
    };
  });

  const transformedPlanets = film.planets.map(planetId => {
    return {
      id: planetId,
      href: `/planets/${planetId}`
    };
  });

  const transformedCharacters = film.characters.map(characterId => {
    return {
      id: characterId,
      href: `/peoples/${characterId}`
    };
  });

  const transformedSpecies = film.species.map(speciesId => {
    return {
      id: speciesId,
      href: `/species/${speciesId}`
    };
  });

  return {
    ...film._doc,
    starships: transformedStarships,
    vehicles: transformedVehicles,
    planets: transformedPlanets,
    characters: transformedCharacters,
    species: transformedSpecies
  };
}

module.exports = {
  getFilms,
  getFilmById,
  createFilm,
  deleteFilm,
  updateFilm,
};
