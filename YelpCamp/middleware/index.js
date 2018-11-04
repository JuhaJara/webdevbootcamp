var Campground = require("../models/campground.js"),
    Comment    = require("../models/comment.js");

var middlewareObj = { };

var ERROR_LOGGED_IN = "Please login first";

middlewareObj.isLoggedIn = function(req, res, next)
{
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", ERROR_LOGGED_IN);
    res.redirect("/login");
}


middlewareObj.checkCampgroundOwnership = function(req, res, next)
{
    if (req.isAuthenticated())
    {
        Campground.findById(req.params.id, function(err, foundCampground){
            if (err)
            {
                res.redirect("back");
            } 
            else 
            {
                if (foundCampground.author.id.equals(req.user._id))
                {
                    next();            
                }
                else
                {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", ERROR_LOGGED_IN);
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next)
{
    if (req.isAuthenticated())
    {
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if (err)
            {
                res.redirect("back");
            } 
            else 
            {
                if (foundComment.author.id.equals(req.user._id))
                {
                    next();            
                }
                else
                {
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", ERROR_LOGGED_IN);
        res.redirect("back");
    }
}

module.exports = middlewareObj;