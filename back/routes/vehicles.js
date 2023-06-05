const express = require("express");
const vehiclesController = require("../controllers/vehicleController.js");
const router = express.Router();

router.get("/", vehiclesController.getVehicles);
router.get("/:id", vehiclesController.getVehicleById);
router.post("/", vehiclesController.createVehicle);
router.delete("/:id", vehiclesController.deleteVehicle);
router.patch("/:id", vehiclesController.updateVehicle);

module.exports = router;
