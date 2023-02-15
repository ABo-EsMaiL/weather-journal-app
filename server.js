// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();
/* Dependencies */
const bodyParser = require("body-parser");
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port =8080;
const server = app.listen(port,listening);

function listening(){
    console.log('Server running');
    console.log(`Running on localhost: ${port}`);
}

// GET route that returns the projectData object in your server code

app.get('/all',getData)
function getData(req,res){
    res.send(projectData)
    // projectData={};
}

// POST ROUTE

app.post('/add',addData)

function addData(req,res){
    console.log(req.body)
    projectData={
        state:req.body.state,
        date:req.body.date,
        temp:req.body.temp,
        content:req.body.content
    }
    res.send(projectData)
    console.log(projectData)
}
