import express from "express";
import DB from './db.js';
const app = express();
const PORT = 3052;

app.get("/", (req, res) => {
    res.send("Hullo \n");
    console.log("got request");
});

DB().then(() => {
    app.listen(PORT, () => {
        console.log(`server running at ${PORT}`);
    });
});
