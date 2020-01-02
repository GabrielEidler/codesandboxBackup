// ===========================================================
// SETUP
// ===========================================================
const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  // Using Node.js `require()`
  mongoose = require("mongoose");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("views"));

// ===========================================================
// DATABASE STUFF
// ===========================================================

//SCHEMA SET UP
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

/*
Campground.create(
  {
    name: "Granite Hill",
    image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"
  },
  (err, campground) => {
    if (err) {
      console.log(err);
    } else {
      console.log("NEW CAMPGROUND CREATED");
      console.log(campground);
    }
  }
);
*/

mongoose.connect(
  "mongodb+srv://gabrieleidler:theceltichero159357@cluster0-nh3lc.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

// ===========================================================
// ROUTES
// ===========================================================

app.get("/", function(req, res) {
  res.render("landing");
});

app.get("/campgrounds", function(req, res) {
  //Get All Campgrounds from DB
  Campground.find({}, (err, campgrounds) => {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds", { campgrounds: campgrounds });
    }
  });
});

app.post("/campgrounds", function(req, res) {
  // get data from form and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = { name: name, image: image };
  //Create New Campground and save to database
  Campground.create(newCampground, (err, newlyCreated) => {
    if (err) {
      console.log(err);
    } else {
      //redirect back to campgrounds page
      res.redirect("/campgrounds");
    }
  });
});

app.get("/campgrounds/new", function(req, res) {
  res.render("new.ejs");
});

app.listen(8080, function() {
  console.log("The YelpCamp Server Has Started!");
});
