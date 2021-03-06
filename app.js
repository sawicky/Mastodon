var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var expressValidator = require("express-validator");
var flash = require("connect-flash");
var session = require("express-session");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var mongo = require("mongodb");
var mongoose = require("mongoose");
const MongoClient = require('mongodb').MongoClient;


//connecting to mastodon db, make sure you have created this db locally
mongoose.connect("mongodb://localhost/mastodon");
var db = mongoose.connection;


// Store the routes for each page
var routes = require("./mastodon/routes/index");
var users = require("./mastodon/routes/users");
var editDetails = require("./mastodon/routes/editDetails");
var changePassword = require("./mastodon/routes/changePassword");
var bookAppointments = require("./mastodon/routes/bookAppointments");
var viewDoctors = require("./mastodon/routes/viewDoctors");
var contactus = require("./mastodon/routes/contactus");
var profile = require("./mastodon/routes/profile");
var uploadPrescriptions = require("./mastodon/routes/uploadPrescriptions");
var viewPrescriptions = require("./mastodon/routes/viewPrescriptions");
var addAvailability = require("./mastodon/routes/addAvailability");
var adminManager = require("./mastodon/routes/adminManager");
var addUser = require("./mastodon/routes/addUser");
var createMedicalForm = require("./mastodon/routes/createMedicalForm");
var viewAvailability = require("./mastodon/routes/viewAvailability");

// store routes here

// Init App
var app = express();

//No need to worry about all this, but must add path to a route below

// View Engine
app.engine("handlebars", exphbs({ defaultLayout: "layout",
helpers: require("./mastodon/helpers/helpers.js").helpers }
));

app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));



// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Set Static Folder
app.use('/mastodon', express.static(path.join(__dirname, "public")));

// Express Session
app.use(
  session({
    secret: "secret",
    saveUninitialized: true,
    resave: true
  })
);

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(
  expressValidator({
    errorFormatter: function(param, msg, value) {
      var namespace = param.split("."),
        root = namespace.shift(),
        formParam = root;

      while (namespace.length) {
        formParam += "[" + namespace.shift() + "]";
      }
      return {
        param: formParam,
        msg: msg,
        value: value
      };
    }
  })
);

// Connect Flash
app.use(flash());

// Global Vars
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");

  user = req.user || null;
  res.locals.user = user;

  // This will check the type of the user and set a bool so that we can display the nav bar accordingly -sami
  if(user) {
      if (user.userType == "doctor") {
          res.locals.isDoctor = true;

      } else if (user.userType == "student") {
          res.locals.isStudent = true;

      } else if (user.userType == "admin") {
          res.locals.isAdmin = true;
      }
  }
      next();
});

//when a url path is requested, call the router for that page
app.use("/mastodon/", routes);
app.use("/dashboard", routes);
app.use("/mastodon/users", users);
app.use("/editDetails", editDetails);
app.use("/changePassword", changePassword);
app.use("/viewDoctors", viewDoctors);
app.use("/contactus", contactus);
app.use("/profile", profile);
app.use("/uploadPrescriptions", uploadPrescriptions);
app.use("/viewPrescriptions", viewPrescriptions);
app.use("/addAvailability", addAvailability);
app.use("/bookAppointments", bookAppointments);
app.use("/adminManager", adminManager);
app.use('/addUser', addUser);
app.use("/createMedicalForm", createMedicalForm);
app.use("/viewAvailability", viewAvailability);
process.title = "Mastodon";
//add path to a route here

// Set Port
app.set("port", process.env.PORT || 3000);

app.listen(3000, "localhost", function() {
  console.log("Server started on port " + app.get("port"));
});

module.exports = app;