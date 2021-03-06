var express = require("express");
var router = express.Router();
var User = require("../models/user");
var Availability = require("../models/availability");

router.get("/", ensureAuthenticated, function(req, res) {
    viewAllDoctors(res);
});

// This function will find all the doctors in the DB.
function viewAllDoctors(res){
    User.find({userType: "doctor"}, function (err, docs) {
        Availability.find({}, function(err, availabilities) {
            res.render("viewDoctors", {doctors: docs, availabilities: availabilities});
        });
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

