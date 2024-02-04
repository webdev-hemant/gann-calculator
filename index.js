const express = require("express");
require("dotenv").config();
const path = require("path");
const { calculateGannValues } = require("./src/formula/gann9");
const port = 4500;
const app = express();

app.use(express.static("build"));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

app.get("/gann", (req, res) => {
  const value = req.query.value;
  const result = calculateGannValues(value);
  res.send(result);
});

app.listen(port, () => console.log(`server is started on port ${port}`));
