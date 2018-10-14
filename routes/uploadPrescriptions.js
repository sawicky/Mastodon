var express = require("express");
var router = express.Router();
var User = require("../models/user");
var Prescription = require("../models/prescription");

var path = require("path");


router.get("/", ensureAuthenticated, function(req, res) {
    User.find({userType: "student"}, function (err, patients) {
        res.render("uploadPrescriptions", {patient: patients});
    });
});

router.post("/", ensureAuthenticated, function(req, res){

    // store the student username
    var student = req.body.username;
    console.log(student);
    // store the doctor username
    var doctor = user.username;

    // store the prescription
    var description = req.body.prescription;

    createPrescriptionForStudent(req, res, student, doctor, description);

});

// DB query to find the object based on the student ID
function createPrescriptionForStudent(req, res, student , doctor, description){
    
    User.getUserByUsername(student, function(err, studentFound) {
        if(err)
            req.flash("error_msg", "Couldn't find patient");

        else {
            console.log("Doctor: " + doctor + "\nDescription: " + description + " for " + student);

            // create a new prescription object
            var newPrescription = new Prescription({
                student: student,
                doctor: doctor,
                description: description
            });

            addPrescriptionToDB(req, res, newPrescription);
        }
    });
}

// add the prescription to the database
function addPrescriptionToDB(req, res, newPrescription){
    Prescription.AddPrescription(newPrescription, function(err, prescription){
        if(err)
            req.flash("error_msg", "Upload failed, please try again.");
        else {
            req.flash("success_msg", "Upload Success!");
            console.log(prescription);
        }
        res.redirect("/viewPrescriptions");
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
