import express from 'express';
import dotenv from 'dotenv';
import DB from './db.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3052;

app.get("/", (req, res) => {
  res.send("Hullo \n");
  console.log("got request");
});

DB().then(() => {
  app.listen(PORT, () => {
    console.log(`server running at ${PORT}`);
  });
});
