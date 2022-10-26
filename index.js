const express = require('express');
const mongoose = require('mongoose');

const peoples = require('./resources/data/peoples.json');

const app = express();

//Routes
app.get('/peoples', (req,res) => {
    res.status(200).json(peoples);
});
app.get('/peoples/:id', (req,res) => {    
    const id = parseInt(req.params.id);
    const people = peoples.find(peoples => peoples.pk === id);
    res.status(200).json(people);
})



app.listen(8080, () => {
    console.log('Serveur : http://localhost:8080/peoples\nBDD : http://localhost:3000/'); 
});
