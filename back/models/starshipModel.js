const mongoose = require("mongoose");

const starshipSchema = new mongoose.Schema(
  {
    pilots: {
      type: [Number],
      required: true
    },
    MGLT: {
      type: String,
      required: true
    },
    starship_class: {
      type: String,
      required: true
    },
    hyperdrive_rating: {
      type: String,
      required: true
    },
    pk: {
      type: Number,
      required: true
    }
  },
  { versionKey: false }
);

module.exports = mongoose.model("Starship", starshipSchema);
