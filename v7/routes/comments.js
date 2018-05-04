//=========================================================================================================
//Comments ROUTES
//==========================================================================================================
var Campground = require("../models/campground");
var Comment = require("../models/comments");
var express=require("express");
var router=express.router({mergeParams: true});

function isLoggedIn (req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
   res.redirect("/login");
}

router.get("/new",isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err,campground){
        if (err)
        {
            console.log(err);
        }
        else {
            res.render("comments/new",{campground:campground});
        }
    });
    
});

// CREATE route-- add new comment 
router.post("/", isLoggedIn , function(req,res){
   Campground.findById(req.params.id , function(err, campground){
       if(err)
       {
           console.log(err);
           res.redirect("/campgrounds");
       }
       else {
           
            Comment.create(req.body.comment , function(err, newlyCreatedComment) {
       
       if (err)
       {
           console.log(err);
       }
       else
       {
           campground.comments.push(newlyCreatedComment);
           campground.save();
           res.redirect("/campgrounds/" + campground._id);
       }
   });
       }
   });
  
   // campGrounds.push(newCampground);
    
});

module.exports= router;