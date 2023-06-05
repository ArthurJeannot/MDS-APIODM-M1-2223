const express = require("express");
const starshipController = require("../controllers/starshipController.js");
const router = express.Router();

router.get("/", starshipController.getStarships);
router.get("/:id", starshipController.getStarshipById);
router.post("/", starshipController.createStarship);
router.delete("/:id", starshipController.deleteStarship);
router.patch("/:id", starshipController.updateStarship);

module.exports = router;
