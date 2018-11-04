var express = require("express");
var app = express();

var animals =
{
    pig: 
    {
        says: "Oink"
    },
    cow: {
        says: "Moo"
    },
    doq: {
        says: "Woof woof"
    },
    cat: {
        says: "Meow"
    }
}


app.get("/", function(req, res){
   res.send("Hi there, welcome to my assignment"); 
});

app.get("/speak/:animal", function(req, res){
    var animal = animals[req.params.animal];
    var says = "";
    
    if (animal === undefined)
    {
        says = "Animal " + req.params.animal + " not defined!";
    }
    else
    {
        says = animal.says;
    }
    
    res.send(says);
});

app.get("/repeat/:hello/:number", function(req, res){
   if (isNaN(req.params.number))
   {
       res.send("ERROR! Number variable not a number!");
       return;
   }
    
   var times = Number(req.params.number);
   var message = "";
   
   
   for (var i = 0; i < times; ++i)
   {
       message += req.params.hello + " ";
   }
   
   res.send(message);
});

app.get("*", function(req, res)
{
  res.send("Sorry, page not found...What are you doing with your life?"); 
});

app.listen(process.env.PORT, process.env.IP, function()
{
    console.log("SERVER HAS STARTED");
});