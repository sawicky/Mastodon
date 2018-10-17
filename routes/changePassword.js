var express = require("express");
var router = express.Router();

var User = require("../models/user");
router.get("/", ensureAuthenticated, function(req, res) {
  res.render("changePassword");
});

router.post("/", ensureAuthenticated, function(req, res) {
    validation(req, res);
});



function validation(req, res){
    var password = req.body.password;
    var newPassword = req.body.newPassword;
    var password2 = req.body.password2;
    req.checkBody("password", " Old Password is required").notEmpty();
    req.checkBody("newPassword", " New Password is required").notEmpty();
    //VALIDATION ON PASSWORD GARY
    req
        .checkBody(
            "password2",
            "Password must include one lowercase character, one uppercase character, a number, and a special character"
        )
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/, "i");
    if (req.body.newPassword.length > 0) {
        req
            .checkBody("password2", "New Password and Confirm Passwords do not match")
            .equals(req.body.newPassword);
    }
    var errors = req.validationErrors();

    if (errors) {
        res.render("changePassword", {
            errors: errors
        });
    } else {
        comparePassword(req, res, password, newPassword);
    }
}


function comparePassword(req, res, password, newPassword){
    User.comparePassword(password, req.user.password, function(err, isMatch) {
        // Throw error if password was not matched
        if (err) throw err;

        // If it matched, return the user
        if (isMatch) {
            User.updatePassword(req.user._id, newPassword, function(err, user) {
                if (err) throw err;
                req.logout();
                req.flash("success_msg", "Password changed successfully");
                res.redirect("/mastodon/users/login");
            });
        } else {
            res.render("changePassword", {
                oldPassword: true
            });
        }
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
