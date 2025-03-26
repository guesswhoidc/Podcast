const express = require('express');

const app = express();

app.get("/", (req, res) => {
  res.send("Hullo \n");
});

module.exports = app
