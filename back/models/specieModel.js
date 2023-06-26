const mongoose = require("mongoose");

const speciesSchema = new mongoose.Schema(
  {
    _id: {
        type: Number,
        require: true
    },
    name: {
      type: String,
      required: true
    },
    classification: {
      type: String,
      required: true
    },
    designation: {
      type: String,
      required: true
    },
    average_height: {
      type: String,
      required: true
    },
    skin_colors: {
      type: String,
      required: true
    },
    hair_colors: {
      type: String,
      required: true
    },
    eye_colors: {
      type: String,
      required: true
    },
    average_lifespan: {
      type: String,
      required: true
    },
    language: {
      type: String,
      required: true
    },
    homeworld: {
      type: Number,
      required: true
    },
    people: {
      type: [Number],
      required: true
    }
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Species", speciesSchema);