var express = require("express");

var router      = express.Router({mergeParams: true}),
    Campground  = require("../models/campground"),
    Comment     = require("../models/comment"),
    middleware  = require("../middleware");

router.get("/new", middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
       if (err)
       {
           console.log(err);
       } else {
           res.render("comments/new", {campground: campground});       
       }
    });
})

router.post("/", middleware.isLoggedIn,  function(req, res)
{
    var newComment = req.body.comment;
    
    newComment.author = {
        username: req.user.username,
        id: req.user._id
    }

    var campgroundId = req.params.id;
    
    console.log("Adding new comment: " + newComment);
    
    Campground.findById(req.params.id, function(err, campground)
    {
        if (err)
        {
          console.log(err);
          res.redirect("/campgrounds");
        } else {
            Comment.create(newComment, function(err, comment){
               if (err)
               {
                 console.log(err);
               } else {
                 campground.comments.push(comment);
                 campground.save();
                 req.flash("success", "Comment added");
                 res.redirect('/campgrounds/' + campground._id);
               }
            });
          }
    });
});

router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
   Campground.findById(req.params.id, function(err, foundCampground){
   if (err)
   {
       res.redirect("back");
   } 
   else 
   {
       Comment.findById(req.params.comment_id, function(err, foundComment){
       if (err)
       {
           res.redirect("back");
       }
       else
       {
           res.render("comments/edit", {campground: foundCampground, comment: foundComment });         
       }
     });
   }
 });
});

router.put("/:comment_id/", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, editedComment){
        if (err)
        {
            res.redirect("/campgrounds/" + req.params.id);
        }
        else
        {
            req.flash("success", "Comment edited");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

router.delete("/:comment_id/", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if (err)
       {
           res.redirect("/campgrounds/" + req.params.id);
       }
       else
       {
           req.flash("success", "Comment deleted");
           res.redirect("/campgrounds/" + req.params.id);
       }
    });
});


module.exports = router;