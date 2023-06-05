const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
  {
    vehicle_class: {
      type: String,
      required: true
    },
    pilots: {
      type: [Number],
      required: true
    },
    pk: {
      type: Number,
      required: true
    }
  },
  { versionKey: false }
);

module.exports = mongoose.model("Vehicle", vehicleSchema);