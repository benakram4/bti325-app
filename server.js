/********************************************************************************* 
 *  BTI325 – Assignment 2 *  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.   
 *  No part of this assignment has been copied manually or electronically from any other source 
 *  (including web sites) or distributed to other students.
 * 
 *  Name: Ben Akram Student ID: 158523217 Date: 5/10/2022 *
 *  Online (Cyclic) URL:  
 * *  https://glamorous-goat-slacks.cyclic.app/ *
  ********************************************************************************/  

var express = require("express"); // Include express.js module
var app = express();

var path = require("path"); // include moduel path to use __dirname, and function path.join()
var data = require("./data-service.js");

var HTTP_PORT = process.env.PORT || 8080;

app.use(express.static('public'));

// call this function after the http server starts listening for requests
function onHttpStart(){
    console.log("Express http server listening on port: " + HTTP_PORT);
}

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "/views/home.html"))
});

app.get("/about", function(req, res){
    res.sendFile(path.join(__dirname, "/views/about.html"))
    
});

app.get("/employees", function(req, res){
    data.getAllEmployees()
    .then((data) => {res.json(data)})
    .catch((err) => {console.log(`${err}`)});
    console.log("getting emp");
});

app.get("/managers", function(req, res){
    data.getManagers()
    .then((data) => {res.json(data)})
    .catch((err) => {console.log(`${err}`)});
    console.log("getting managers");
});


app.get("/departments", function(req, res){
    data.getDepartments()
    .then((data) => {res.json(data)})
    .catch((err) => {console.log(`${err}`)});
    console.log("getting dep");
});

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, "views/error404.html"));
  });
  
data.initialize().then(app.listen(HTTP_PORT, onHttpStart));
//app.listen(HTTP_PORT, onHttpStart());