var express = require("express");
var router = express.Router();
var User = require("../models/user");
var path = require("path");


router.get("/", ensureAuthenticated, function(req, res) {
    User.find({userType: "student"}, function (err, patients) {
        res.render("uploadPrescriptions", {patient: patients});
    });
});

router.post("/", ensureAuthenticated, function(req, res){

    var id = req.body.studentID;

    // DB query to find the object based on the student ID
    User.getUserById(id, function(err, student) {

        var doctor = user.username;
        var prescription = req.body.prescription;

        console.log("Doctor: " + doctor + "\nDescription: " + prescription);

        User.addPrescription(id, doctor, prescription, function(err, user) {
            if (err)
                req.flash("error_msgg", "Upload failed, please try again.");
            else {
                req.flash("success_msg", "Upload Success!");
                console.log(user.prescription.description);
            }

            res.redirect("/uploadPrescriptions");
        });
    });
});



function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash("error_msg", "You are not logged in");
        res.redirect("/users/login");
    }
}

module.exports = router;
