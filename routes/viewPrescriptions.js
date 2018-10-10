var express = require("express");
var router = express.Router();
var User = require("../models/user");
var Prescription = require("../models/prescription");

router.get("/", ensureAuthenticated, function(req, res) {
    var isPatient;
    var username = user.username;

    if(user.userType != "doctor") {
        // stores the studentID so we can then check in the prescription DB to see if that student has any prescriptions.
        patientViewPrescription(res, isPatient, username);

    } else {
        // Display the prescriptions added by a doctor
        doctorsViewPrescription(res, isPatient, username);
    }
});


function doctorsViewPrescription(res, isPatient, username){
    isPatient = false;

    Prescription.find({doctor: username}, function (err, prescriptions) {
        res.render("viewPrescriptions", {
            prescriptions: prescriptions,
            isPatient: isPatient
        });
    });
}

// we pass in the studentID as a string and query the DB to find the prescriptions.
function patientViewPrescription(res, isPatient, username){
    isPatient = true;

    Prescription.find({student: username}, function (err, prescriptions) {
        res.render("viewPrescriptions", {
            prescriptions: prescriptions,
            isPatient: isPatient
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
