const express = require("express");
const bodyParser = require("body-parser");
const nodeMailer = require("nodemailer");
const path = require("path");
const port = process.env.PORT || 8000;
const forceSsl = require('force-ssl-heroku');

const app = express();
app.use(forceSsl);

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/ping', pingHandler);

// noinspection JSUnresolvedFunction
app.get("/", (req, res)=>{
    res.status(200).render("index")
});

app.post("/messageSent", (req, res)=>{

    let transporter = nodeMailer.createTransport({
        host: "smtp.hostinger.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'website@edgarmorales.com', // generated ethereal user
            pass: 'nacional319mx' // generated ethereal password
        }
    });

    transporter.sendMail({
        from: `${req.body.contactName} <website@edgarmorales.com>`, // sender address
        to: "admin@edgarmorales.com", // list of receivers
        subject: `${req.body.subject}`, // Subject line
        text: `${req.body.contactMessage}\n\n${req.body.contactEmail}`
    });
    setTimeout(()=>{
        res.redirect("/");
    }, 4000);
});

app.listen(port, ()=>{
    console.log(`listening on http://localhost:${port}`)
});

