const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const api = require("./routes/api");

const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors());
app.options("*", cors());

const InitiateMongoServer = require("./config/db");
InitiateMongoServer();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ message: "Shop 24x7 services API works!" });
});

app.use("/api", api);

app.listen(PORT, (req, res) => {
  console.log(`Express server listening on PORT ${PORT}`);
});
