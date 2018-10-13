var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var Availability = require("../models/availability");
var user;


router.get("/", ensureAuthenticated, function(req, res) {
    viewAllDoctors(res);

});

// ID Parameter URL
router.get("/:id", ensureAuthenticated, function(req, res) {
    var id = req.params.id;
    updateBooking(res, req.params.id, req);
    
});

// This function will find all the doctors in the DB.
function viewAllDoctors(res){
    console.log("test");
    Availability.find({}, function (error, availabilities) {
        console.log("My appoints are :" + availabilities);
        console.log("Error is " + error);
        
        res.render("bookAppointments", {avail: availabilities});
    });

    // User.find({userType: "doctor"}, function (err, docs) {
    //     res.render("bookAppointments", {doctors: docs});
    // });
}

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash("error_msg", "You are not logged in");
        res.redirect("/users/login");
    }
}
function updateBooking(res, id, req) {
    console.log("Entered update booking method");
    var user = req.user;
    console.log("My user is :" +user);
    console.log("My id is :" +id);
    Availability.findOneAndUpdate
    Availability.updateAvailability(user.name, id, true, function(err, availability) {
        console.log("Entered update avail callback");
        if (err) {
            console.log("Error");
            throw err;
        } else {
            console.log(availability);
        }
        req.flash("success_msg", "You are updated");
        viewAllDoctors(res)
    });

    

}

module.exports = router;
