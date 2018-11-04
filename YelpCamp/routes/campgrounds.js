var express = require("express");
var router = express.Router();

var mongoose = require("mongoose");
var Campground  = require("../models/campground");

var middleware = require("../middleware");

router.post("/", middleware.isLoggedIn, function(req, res){
   var campground = req.body.campground;
   campground.author = {
        id: req.user._id,
        username: req.user.username
   };
   
   Campground.create(campground, function(err, campground){
        if (err)
        {
            console.log("Error occurred!");
            console.log(err);
        } 
        else 
        {
            console.log("Campground added: ")
            console.log(campground);
        }
    });
   
   res.redirect("/campgrounds")
});

router.get("/", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if (err)
        {
            console.log("Error when listing campgrounds");
            console.log(err);
        }
        else
        {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
});

router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("campgrounds/new"); 
});


router.get("/:id", function(req, res){
    // Find campground with id
    // => render show template
    
    var id = req.params.id;
    
    Campground.findById(id).populate("comments").exec(function(err, foundCampground){
        if (err)
        {
            console.log("Cannot find campground with id: " + id);
            console.log(err);
        }
        else
        {
            console.log(foundCampground);
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
       if (err){
           res.redirect("campgrounds");
       } else {
           res.render("campgrounds/edit", {campground: foundCampground});
       }
    });
});


// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    // find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
       if(err){
           res.redirect("/campgrounds");
           console.log(err);
       } else {
           //redirect somewhere(show page)
           res.redirect("/campgrounds/" + req.params.id);
       }
    });
});


// Destroy campground route
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
   Campground.findByIdAndRemove(req.params.id, function(err, deletedCampground){
      if (err)
      {
          console.log(err);
          res.redirect("/campgrounds");
      } else {
          res.redirect("/campgrounds");
      }
   });
});

module.exports = router;