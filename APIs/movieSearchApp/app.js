var express = require('express');
var app = express()
app.set("view engine", "ejs");

var request = require('request');

app.get("/", function(req, res){
    res.render("search");
});

app.get("/results", function(req, res){
    var text = req.query.searchText;
    var baseUrl = "http://www.omdbapi.com/?s=";
    var apiKey = "&apikey=thewdb"
    
    var url = baseUrl + text + apiKey;
    // 'http://www.omdbapi.com/?s=iowa&apikey=thewdb'
    
    console.log(url);
    
    request(url, function(error, response, body){
       if (!error && response.statusCode === 200)
       {
           var parsedData = JSON.parse(body);
           
           res.render("results", {data: parsedData});
       }
    });
});


app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Movie App has started!"); 
});
