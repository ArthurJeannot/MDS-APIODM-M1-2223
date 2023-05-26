require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const port = '8080'
const app = express();

const peopleRouter = require('./routes/peoples');

async function main() {
  // Crée et récupère la connexion mongoose par defaut
  mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection a la BDD réussi");

    app.use('/peoples', peopleRouter);
    
    app.listen(port, () => {
      console.log("Requêtes écouté sur le port", port);
    });
  });
  var db = mongoose.connection;
  // Notif pour les erreur de connexions
  db.on("error", console.error.bind(console, "Erreur connexion MongoDB:"));
}

main();
