const express = require("express");
const path = require("path");
const port = "8000";
const app = express();

app.use(express.static(path.join(__dirname, "public")));

// noinspection JSUnresolvedFunction
app.get("/", (req, res)=>{
    res.status(200).render("index")
});

app.post("/messageSent", (req, res)=>{
   res.send("You sent message");
});

app.listen(port, ()=>{
    console.log(`listening on http://localhost:${port}`)
});

