const express = require("express");
const mongoose = require("mongoose");

const app = express();

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

const myDBNAME = process.env.DB_NAME;
const myDBPW = process.env.DB_PW;
const myDBSERVER = process.env.DB_SERVER;
const myDBUSER = process.env.DB_USER;

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

const musiquesRoutes = require("./routes/musiques-routes");

app.use("/api/musiques", musiquesRoutes);

app.use((error, req, res, next) => {
  res.status(error.code || 500);
  res.json({ message: error.message || "Une erreur non gérée est survenue" });
});

const uri = `mongodb+srv://${myDBUSER}:${myDBPW}@${myDBSERVER}/${myDBNAME}?retryWrites=true&w=majority`;
console.log(uri);

const options = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose
  .connect(uri, options)
  .then(() => {
    app.listen(process.env.PORT || 5000, console.log("server running"));
  })
  .catch((err) => {
    console.log(err);
  });
