var express = require("express");
var router = express.Router();
var User = require("../models/user");

// Get Edit details page if user is logged on, otherwise direct them to /users/login
// router.get("/", ensureAuthenticated, function(req, res) {
//     res.render("viewDoctors", { loggedinUser: req.user });
// });

router.get("/", function(req, res, next) {
    User.find({userType: "doctor"}, function (err, docs) {
        res.render("viewDoctors", {doctors: docs});
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
