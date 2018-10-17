var express = require("express");
var router = express.Router();
var User = require("../models/user");
var Availability = require("../models/availability");

router.get("/", ensureAuthenticated, function(req, res) {
    viewAllDoctors(res);
});

router.get("/:id", ensureAuthenticated, function(req, res) {
    var id = req.params.id;
    var user = req.user;
    User.findOne({_id: id}, function(err, doc) {
        if (err) throw err;
        if (doc){
            console.log("found a doctor: "+doc.name);
            Availability.find({doctorId: doc._id}, function(err, avail) {
                if (err) throw err;
                if (avail) {
                    console.log("found availabilities: "+avail)
                    res.render("viewAvailability", {doctor: doc, availabilities: avail, user : user});
                } else {
                    viewAllDoctors(res);
                }
            })
        } else {
            viewAllDoctors(res);
        }
    })
})

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
