const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { calculateGannValues } = require("./src/formula/gann9");
const port = 4500;
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send({ message: "its working!" });
});

app.get("/gann", (req, res) => {
  const value = req.query.value;
  const result = calculateGannValues(value);
  res.send(result);
});

app.listen(port, () => console.log(`server is started on port ${port}`));
