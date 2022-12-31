const express = require("express");
const mongo = require("mongoose");
const fs = require("fs");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = 80;

mongo.connect('mongodb://localhost/moin-mn');

//define mongoose schema
var danceSchema = new mongo.Schema({
    name: String,
    phone: String,
    email: String,
    message: String,
});
var Dance = mongo.model("Dance", danceSchema);


//EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')); // for serving static files
app.use(express.urlencoded());

//PUG SPECIFIC STUFF
app.set('view engine', 'pug');  // set the template engine as pug
app.set('views', path.join(__dirname, 'views')); //set the views directory

//ENDPOINTS
app.get('/', (req, res)=>{
    const params = { };
    res.status(200).render('home.pug', params);
});
app.get('/contact', (req, res)=>{
    const params = { };
    res.status(200).render('contact.pug', params);
});

//POST request
app.post("/contact", (req, res)=>{
    var newDance = new Dance(req.body);
    newDance.save();
    res.redirect('/contact');
}); 

// START THE SERVER
app.listen(port, ()=>{
    console.log(`This application started successfully on port ${port}`);
});