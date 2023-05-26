const express = require("express");
const peopleController = require("../controllers/peopleController.js");
const router = express.Router();

router.get("/", peopleController.getPeoples);
router.get("/:id", peopleController.getPeopleById);
router.post("/", peopleController.createPeople);
router.delete("/:id", peopleController.deletePeople);
router.patch("/:id", peopleController.updatePeople);

module.exports = router;
