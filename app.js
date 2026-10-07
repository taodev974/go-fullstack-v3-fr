const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const stuffRoute = require("./routes/stuff");
const userRoutes = require("./routes/user");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((error) => console.log("Connexion à MongoDB échouée !", error));

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization",
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  );
  next();
});
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use("/api/stuff", stuffRoute);
app.use("/api/auth", userRoutes);

module.exports = app;
