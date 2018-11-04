var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app"); // create of using the existing one

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

// var george = new Cat({
//   name: "Mrs. Norris", 
//   age: 55,
//   temperament: "Evil"
// })

// george.save(function(err, cat){
//     if (err)
//     {
//         console.log("Somethings went wrong");
//     }
//     else
//     {
//         console.log("We just save a cat to the database");
//         console.log(cat);
//     }
// });

// Cat.create({
//     name: "Jusu",
//     age: 15,
//     temperament: "Bland"
// }, function(err, cat){
//     if (err)
//     {
//         console.log("ERROR");
//     }
//     else
//     {
//         console.log(cat);
//     }
// });

Cat.find({}, function(err, cats){
    if (err)
    {
        console.log("OH NO, ERROR");
        console.log(err);
    }
    else{
        console.log("ALL THE CATS");
        console.log(cats);
    }
});

// adding new cat to the database


// retrieve all casts from the database and console.log each cat

