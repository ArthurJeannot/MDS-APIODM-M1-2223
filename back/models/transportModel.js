const mongoose = require("mongoose");

const transportSchema = new mongoose.Schema(
  {
    consumables: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    cargo_capacity: {
      type: String,
      required: true
    },
    passengers: {
      type: String,
      required: true
    },
    max_atmosphering_speed: {
      type: String,
      required: true
    },
    crew: {
      type: String,
      required: true
    },
    length: {
      type: String,
      required: true
    },
    model: {
      type: String,
      required: true
    },
    cost_in_credits: {
      type: String,
      required: true
    },
    manufacturer: {
      type: String,
      required: true
    },
    pk: {
      type: Number,
      required: true
    }
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Transport", transportSchema);