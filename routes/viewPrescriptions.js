var express = require("express");
var router = express.Router();
var User = require("../models/user");

router.get("/", ensureAuthenticated, function(req, res) {
    var doctor = user.prescription.doctor;
    var description = user.prescription.description;

    res.render("viewPrescriptions", {
        doctor: doctor,
        description: description
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
