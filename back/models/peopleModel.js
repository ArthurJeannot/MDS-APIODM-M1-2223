const mongoose = require("mongoose");

const peopleSchema = new mongoose.Schema(
{
    _id: {
        type: Number,
        require: true
    },
    name: {
        type: String,
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
}, {timestamps : true, versionKey: false});

module.exports = mongoose.model("People", peopleSchema);