var express = require ("express"),
    app = express(),
    request = require("request"),
    bodyParser = require ("body-parser"),
    mongoose = require("mongoose"),
    Campground=require("./models/campground"),
    seedDB=require("./seeds"),
    Comment = require("./models/comment");
    // User = require("./models/user");
seedDB();   
mongoose.connect("mongodb://localhost/yelp_camp");
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));


// Campground.create(
//     {
//         name: "SalmonCreek",
//         image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg",
//         description: "Beautiful Campground with no toilets and creek "
//     }, function(err,campground)
//     {
//         if(err)
//         {
//             console.log(err);
//         }
//         else {
//             console.log(campground);
//         }
//     });
    


app.get("/", function(req,res){
    res.render("home");
});


// index route to show all campgrounds

app.get("/campgrounds", function(req,res){
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

app.get("/campgrounds/new",function(req, res) {
    res.render("campgrounds/new");
});

// CREATE route-- add new campground 
app.post("/campgrounds",function(req,res){
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

app.get("/campgrounds/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if (err){
            console.log(err);
        }
        else {
            res.render("campgrounds/show",{campground : foundCampground});
        }
    });
});

//=========================================================================================================
//Comments ROUTES
//==========================================================================================================

app.get("/campgrounds/:id/comments/new",function(req, res) {
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
app.post("/campgrounds/:id/comments",function(req,res){
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


app.listen(process.env.PORT , process.env.IP , function(){
    console.log("YelpCamp Is Available");
});