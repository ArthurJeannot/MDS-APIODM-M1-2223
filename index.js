require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const peoples = require("./back/routes/peoples.js");

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

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use('/peoples', peoples);
    
    app.listen(port, () => {
      console.log("Port écouté:", port);
    });
  });
  var db = mongoose.connection;
  // Notif pour les erreur de connexions
  db.on("error", console.error.bind(console, "Erreur connexion MongoDB:"));
}

main();
