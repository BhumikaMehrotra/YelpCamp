var express = require ("express"),
    app = express(),
    request = require("request"),
    bodyParser = require ("body-parser"),
    mongoose = require("mongoose"),
    Campground=require("./models/campground"),
    seedDB=require("./seeds"),
    Comment = require("./models/comment"),
    passport=require("passport"),
    LocalStrategy = require("passport-local"),
    User = require("./models/user");
seedDB();   

var commentRoutes = require("./routes/comments");
var campgroundRoutes = require("./routes/campgronds");
var indexRoutes = require("./routes/index");

mongoose.connect("mongodb://localhost/yelp_camp");
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(require("express-session")({
    secret:"Secret",
    resave: false,
    saveUninitialized: false
    
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    next();
});

app.use("/", indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/camgrounds" , campgroundRoutes);
app.listen(process.env.PORT , process.env.IP , function(){
    console.log("YelpCamp Is Available");
});