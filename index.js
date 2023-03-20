require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const app = express();

async function main() {
  // Crée et récupère la connexion mongoose par defaut
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connection a la BDD réussi");

      app.listen(process.env.PORT, () => {
        console.log("Requêtes écouté sur le port", process.env.PORT);
      });
    });
  var db = mongoose.connection;

  // Notif pour les erreur de connexions
  db.on("error", console.error.bind(console, "Erreur connexion MongoDB:"));

  routes()
}

 function routes()
{
    const Peoples = require("./resources/models/peoples");

  // Route pour récupérer toutes les personnes
  app.get("/peoples", async (req, res) => {
    try {
      const people = await Peoples.find();
      res.json(people);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  // Route pour récupérer une personne
  app.get("/peoples/:id", async (req, res) => {
    try {
      const people = await Peoples.findById(req.params.id);
      res.json(people);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
}

main();
