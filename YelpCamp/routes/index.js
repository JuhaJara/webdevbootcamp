var express     = require("express");
var router      = express.Router(),
    passport    = require("passport"),
    nodemailer  = require("nodemailer"),
    async       = require("async");
    

var User    = require("../models/user");

router.get("/", function(req, res){
   res.render("landing"); 
});

router.get("/register", function(req, res){
    res.render("users/register");
});


router.post("/register", function(req, res){
    var username = req.body.username;
    var password = req.body.password;
    
    var newUser = new User({username: username});
    User.register(newUser, password, function(err, user){
    if (err)
    {
        console.log(err);
        req.flash("error", err.message);
        res.redirect("/register");
    }
    else
    {
       passport.authenticate("local")(req, res, function(){
            res.redirect("/campgrounds")
        }); 
    }
  });
});


// LOGIN FORM
router.get("/login", function(req, res){
   res.render("users/login");
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req, res){ });

router.get("/logout", function(req, res){
   req.logout();
   req.flash("success", "You logged out!");
   res.redirect("/campgrounds");
});


router.get("/forgot", function(req, res){
    res.render("users/forgot");
})

router.post("/forgot", function(req, res){
    
});

module.exports = router;