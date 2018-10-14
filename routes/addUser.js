var express = require("express");
var router = express.Router();
var User = require("../models/user");

router.get("/", ensureAuthenticated, function(req, res) {
    
});


function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated() && user.userType == "admin") {
        return next();
    } else {
        req.flash("error_msg", "Please login as an admin");
        res.redirect("/");
    }
}

module.exports = router;
