const express = require("express");
const Peoples = require("../models/peoples");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const people = await Peoples.find();
    res.json(people);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const people = await Peoples.findById(req.params.id);
    res.json(people);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", () => {
  //TODO
});

module.exports = router;
