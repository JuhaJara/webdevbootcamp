var seed        = require("./seed"),
    mongoose    = require("mongoose");
    
mongoose.connect("mongodb://localhost/yelp_camp")

seed();