const express = require("express");
const filmController = require("../controllers/filmController.js");
const router = express.Router();

router.get("/", filmController.getFilms);
router.get("/:id", filmController.getFilmById);
router.post("/", filmController.createFilm);
router.delete("/:id", filmController.deleteFilm);
router.patch("/:id", filmController.updateFilm);

module.exports = router;
