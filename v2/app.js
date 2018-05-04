var express = require ("express"),
    app = express(),
    request = require("request"),
    bodyParser = require ("body-parser"),
    mongoose = require("mongoose");
    mongoose.connect("mongodb://localhost/yelp_camp");
    app.set("view engine","ejs");
    app.use(bodyParser.urlencoded({extended: true}));

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

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
            res.render("index",{campGrounds: allcampGrounds});
        }
    });
   
});

// NEW -- show form to create nee campground

app.get("/campgrounds/new",function(req, res) {
    res.render("new.ejs");
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
    Campground.findById(req.params.id , function(err,foundCampground){
        if (err){
            console.log(err);
        }
        else {
            res.render("show",{campground : foundCampground});
        }
    });
});
app.listen(process.env.PORT , process.env.IP , function(){
    console.log("YelpCamp Is Available");
});