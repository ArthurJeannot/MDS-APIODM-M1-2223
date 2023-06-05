const express = require("express");
const transportController = require("../controllers/transportController.js");
const router = express.Router();

router.get("/", transportController.getTransports);
router.get("/:id", transportController.getTransportById);
router.post("/", transportController.createTransport);
router.delete("/:id", transportController.deleteTransport);
router.patch("/:id", transportController.updateTransport);

module.exports = router;
