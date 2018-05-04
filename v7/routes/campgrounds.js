var express=require("express");
var router=express.router();
var Campground = require("../models/campground");


router.get("/", function(req,res){
    Campground.find({},function(err,allcampGrounds)
    {
        if (err) 
        {
            console.log(err);
        }
        else {
            res.render("campgrounds/index",{campGrounds: allcampGrounds});
        }
    });
   
});

// NEW -- show form to create nee campground

router.get("/new",function(req, res) {
    res.render("campgrounds/new");
});

// CREATE route-- add new campground 
router.post("/",function(req,res){
   var name = req.body.name;
   var image = req.body.img;
   var description = req.body.description;
   //console.log(name);
   //console.log(image);
   var newCampground = {name : name,image : image , description:description};
   //console.log(newCampground);
   Campground.create(newCampground , function(err, newlyCreatedCampground) {
       
       if (err)
       {
           console.log(err);
       }
       else
       {
           res.redirect("/campgrounds");
       }
   });
   // campGrounds.push(newCampground);
    
});

//SHOW route to show details of a particular id 

router.get("/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if (err){
            console.log(err);
        }
        else {
            res.render("campgrounds/show",{campground : foundCampground});
        }
    });
});

module.exports= router;


