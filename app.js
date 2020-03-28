const express = require("express");
const port =  process.env.PORT || "8000";
const app = express();


app.get("/", (req, res)=>{
    res.status(200).send("Connected")
});

app.listen(port, ()=>{
    console.log(`listening on http://localhost:${port}`)
});

