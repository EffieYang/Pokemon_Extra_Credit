const express = require('express');
const helper = require('./helper')
const pokemon = require('./backend/pokemon');


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/pokemon', pokemon);

app.get('/', function(req, res) {
    res.send("This is the FIRST GET request")
});

app.get('/', function(request, response) {
    response.send("This is SECOND GET request");
})

app.put('/', function(request, response) {
    response.send("This is a PUT request")
})

app.listen(8000, function() {
    console.log("Starting app now...")
})