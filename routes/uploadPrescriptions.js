var express = require("express");
var router = express.Router();
var User = require("../models/user");

router.get("/", function(req, res, next) {
    User.find({userType: "student"}, function (err, patients) {
        res.render("uploadPrescriptions", {patient: patients});
    });
});

module.exports = router;
