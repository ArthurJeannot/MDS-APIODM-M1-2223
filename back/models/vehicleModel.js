const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
  {
    _id: {
        type: Number,
        require: true
    },
    vehicle_class: {
      type: String,
      required: true
    },
    pilots: {
      type: [Number],
      required: true
    }
  },
  { versionKey: false }
);

module.exports = mongoose.model("Vehicle", vehicleSchema);