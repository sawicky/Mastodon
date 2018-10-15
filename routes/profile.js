var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var Availability = require("../models/availability");
var User = require("../models/user");
var MedicalForm = require("../models/medicalform");

// Get Edit details page if user is logged on, otherwise direct them to /users/login
router.get("/", ensureAuthenticated, function(req, res) {
    var studentId = req.query.s;
    var doctorId = req.query.d;

    if (studentId && doctorId) {
        console.log(studentId);
        console.log(doctorId);
        Availability.find({doctorId: req.user._id}, function (err, availability) {
            if (availability) {
                console.log("true")
                User.getUserById(studentId, function(err, user) {
                    console.log('found a student by id');
                    MedicalForm.getMedicalFormByStudentID(studentId, function(err, form) {
                        var doctorView = "true";
                        console.log('found a form belonging to student')
                        console.log(user)
                        console.log(form)
                        console.log(doctorView)
                        if (req.user.userType != "student") {
                            res.render("profile", {user:user, doctorView:doctorView, form: form});
                        } else {
                            res.render("profile", {user: req.user});
                        }
                    })
                })
        } else {
            res.render("profile");
        }
        });
    }
});

// ID Parameter URL
router.get("/:id", ensureAuthenticated, function(req, res) {
    var id = req.params.id;
    getDoctorProfile(res, id);
    
});


// DB query to find the object based on the URL ID
// returns the user and injects it into the html to display the profile page
function getDoctorProfile(res, id){
    User.getUserById(id, function(err, doctor) {
        console.log(doctor);
        res.render("profile", {
            user: doctor,
        });
    });
}

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash("error_msg", "You are not logged in");
        res.redirect("/users/login");
    }
}

module.exports = router;
