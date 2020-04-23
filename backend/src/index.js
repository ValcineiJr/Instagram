const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const routes = require("./routes");
const DB = require("./config/dbConnect");
const cors = require("cors");

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

mongoose
  .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Conectado a base de dados com sucesso");
  })
  .catch((err) => {
    console.log(`Erro: ${err}`);
  });

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(cors());
app.use(
  "/files",
  express.static(path.resolve(__dirname, "..", "uploads", "resized"))
);
app.use(routes);

server.listen(3333, (err) => {
  if (err) {
    console.log(`Erro: ${err}`);
  } else {
    console.log("Ouvindo a porta 3333");
  }
});
