var express = require ("express"),
    app = express(),
    request = require("request"),
    bodyParser = require ("body-parser"),
    mongoose = require("mongoose");
    
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended: true}));


var campGrounds = [{Name: "Salmon Creek",Img: "https://images.unsplash.com/photo-1480779735619-f73b30fdc062?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c472a8a962788aaa16003743a2b436a0&auto=format&fit=crop&w=500&q=60"},
{Name: "Granite Boat",Img: "https://i.pinimg.com/originals/ab/5e/c4/ab5ec4ff722b1f65b855af71ba78c6fc.jpg"}, 
{Name: "Broken Bow",Img: "https://images.unsplash.com/photo-1505735754789-3404132203ed?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8e0ef56213507ac99a507966ab9c5499&auto=format&fit=crop&w=500&q=60"},
{Name: "Black Mumba",Img: "https://images.unsplash.com/photo-1479741044197-d28c298f8c77?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=00a8cfc7aba62bd47f10abd96551cb1d&auto=format&fit=crop&w=500&q=60"},
{Name: "Salmon Creek",Img: "https://images.unsplash.com/photo-1480779735619-f73b30fdc062?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c472a8a962788aaa16003743a2b436a0&auto=format&fit=crop&w=500&q=60"},
{Name: "Granite Boat",Img: "https://i.pinimg.com/originals/ab/5e/c4/ab5ec4ff722b1f65b855af71ba78c6fc.jpg"}, 
{Name: "Broken Bow",Img: "https://images.unsplash.com/photo-1505735754789-3404132203ed?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8e0ef56213507ac99a507966ab9c5499&auto=format&fit=crop&w=500&q=60"},
{Name: "Black Mumba",Img: "https://images.unsplash.com/photo-1479741044197-d28c298f8c77?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=00a8cfc7aba62bd47f10abd96551cb1d&auto=format&fit=crop&w=500&q=60"}];


app.get("/", function(req,res){
    res.render("home");
});



app.get("/campgrounds", function(req,res){
    res.render("campgrounds",{campGrounds: campGrounds});
});

app.get("/", function(req,res){
    res.render("home");
});

app.get("/campgrounds/new",function(req, res) {
    res.render("new.ejs");
});
app.post("/campgrounds",function(req,res){
   var name = req.body.name;
   var image = req.body.img;
   //console.log(name);
   //console.log(image);
   var newCampground = {Name : name,Img : image};
   //console.log(newCampground);
    campGrounds.push(newCampground);
    res.redirect("/campgrounds");
});
app.listen(process.env.PORT , process.env.IP , function(){
    console.log("YelpCamp Is Available");
});