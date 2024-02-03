const express = require("express");
const { calculateGannValues } = require("./src/formula/gann9");
require("dotenv").config();
const port = 4500;
const app = express();

app.get("/", (req, res) => {
  const value = req.query.value;
  const result = calculateGannValues(value);
  res.send(result);
});

app.listen(port, () => console.log(`server is started on port ${port}`));
