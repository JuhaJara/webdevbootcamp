var express = require("express");
var app = express();

var subredditName = "subredditName";


// "/" => "Hi there"
app.get("/", function(req, res)
{
    res.send("Hi there!");
});

// "/bye" => "Goodbye!"

app.get("/bye", function(req, res)
{
   res.send("GOODBYE"); 
});

// "/dog" => "MEOW!"
app.get("/dog", function(req, res)
{
   res.send("MEOW"); 
});

app.get("/r/:subredditName", function(req, res)
{
    console.log(req);
    res.send("WELCOME TO SUBREDDIT: " + req.params["subredditName"]);
});

app.get("/r/:subredditName/comments/:id/:title/", function(req, res){
    res.send("WELCOME TO COMMENTS PAGE!");
});

app.get("*", function(req, res)
{
    res.send("You Are a *");
});

app.listen(process.env.PORT, process.env.IP, function()
{
    console.log("SERVER HAS STARTED");
});