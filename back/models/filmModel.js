const mongoose = require("mongoose");

const filmSchema = new mongoose.Schema(
  {
    _id: {
      type: Number,
      require: true
    },
    title: {
      type: String,
      required: true
    },
    episode_id: {
      type: Number,
      required: true
    },
    opening_crawl: {
      type: String,
      required: true
    },
    director: {
      type: String,
      required: true
    },
    producer: {
      type: String,
      required: true
    },
    release_date: {
      type: Date,
      required: true
    },
    characters: {
      type: [Number],
      required: true
    },
    planets: {
      type: [Number],
      required: true
    },
    starships: {
      type: [Number],
      required: true
    },
    vehicles: {
      type: [Number],
      required: true
    },
    species: {
      type: [Number],
      required: true
    }
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Film", filmSchema);
