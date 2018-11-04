var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var friends = ["Kaisa", "Matti", "Touni", "Päve", "Tumppi"];

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.get("/", function(req, res)
{
   res.render("home") ;
});

app.post("/addFriend", function(req, res){
   console.log(req.body.name);
   friends.push(req.body.name);
   
   res.redirect("/friends");
});

app.get("/friends", function(req, res){
   res.render("friends", {friends: friends}); 
});

app.listen(process.env.PORT, process.env.IP, function(){
  console.log("Server started...");  
});