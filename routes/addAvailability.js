var express = require("express");
var router = express.Router();
var User = require("../models/user");
var mongoose = require("mongoose");
var Availability = require("../models/availability");


// Display the add page for availability
router.get("/", ensureAuthenticated, function(req, res) {
    var doctor = user.username;

    Availability.find({doctor: doctor}, function (err, availability) {
        res.render("addAvailability", {
            availability: availability,
        });
    });
});


// This will fire when doctors fills in his availability details
router.post("/", ensureAuthenticated, function(req, res, next){

    var doctor = user.name;
    var doctorId = user._id;
    var date = req.body.date;
    var time = req.body.time;

    createAvailabilityForDoctor(req, res, doctor, date, time, doctorId);
});




// create a new availability object
function createAvailabilityForDoctor(req, res , doctor, date, time, doctorId){
    var student = "";

    var newAvailability = new Availability({
        doctor: doctor,
        doctorId: doctorId,
        appointment: {
            date: date,
            time: time,
            student: student
        
        }
    });

    addAvailabilityToDB(req, res, newAvailability);
}


// add the availability to the database
function addAvailabilityToDB(req, res, newAvailability){

    Availability.AddAvailability(newAvailability, function(err, availability){
        if(err) {
            req.flash("error_msg", "Unable to add availability, please try again.");

        } else {
            req.flash("success_msg", "Availability added successfully!");
            console.log(availability);
        }
        res.redirect("/mastodon/addAvailability");
    });
}




function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash("error_msg", "You are not logged in");
        res.redirect("/mastodon/users/login");
    }
}

module.exports = router;
