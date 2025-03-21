const express = require("express")
const app = express()
const PORT = 3052

app.get("/", (req, res) => {
    res.send("Hullo \n")
    console.log("got request")
})


app.listen(PORT, () => {
    console.log(`server running at ${PORT}`)
})
