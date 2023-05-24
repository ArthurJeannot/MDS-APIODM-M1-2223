const mongoose = require("mongoose");

const peoplesSchema = new mongoose.Schema(
{
    _id: {
        type: Number,
        required: true
    },
    edited: {
        type: Date,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    skin_color: {
        type: String,
        required: true
    },
    hair_color: {
        type: String,
        required: true
    },
    height: {
        type: String,
        required: true
    },
    eye_color: {
        type: String,
        required: true
    },
    mass: {
        type: String,
        required: true
    },
    homeworld: {
        type: Number,
        required: true
    },
    birth_year: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("peoples", peoplesSchema);