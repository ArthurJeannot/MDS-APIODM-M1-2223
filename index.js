require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const peoples = require("./back/routes/peoples.js");
const films = require("./back/routes/films.js");
const planets = require("./back/routes/planets.js");
const species = require("./back/routes/species.js");
const starships = require("./back/routes/starships.js");
const transports = require("./back/routes/transports.js");
const vehicles = require("./back/routes/vehicles.js");

const app = express();
const port = '8080';
mongoose.set('strictQuery', false);


async function main() {
  // Crée et récupère la connexion mongoose par defaut
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection a la BDD réussi");

    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use('/peoples', peoples);
    app.use('/films', films);
    app.use('/planets', planets);
    app.use('/species', species);
    app.use('/starships', starships);
    app.use('/transports', transports);
    app.use('/vehicles', vehicles);
    
    app.listen(port, () => {
      console.log("Port écouté:", port);
    });
  });
  var db = mongoose.connection;
  // Notif pour les erreur de connexions
  db.on("error", console.error.bind(console, "Erreur connexion MongoDB:"));
}

main();
