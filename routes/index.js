var express = require('express');
var router = express.Router();
var User = require("../models/user");
var Availability = require("../models/availability");

// Get Homepage if user is logged on, otherwise direct them to /users/login
router.get('/', ensureAuthenticated, function(req, res){
	var user = req.user;

	switch (user.userType) {

		case "student":
		res.redirect('bookAppointments');
		console.log("User is a student, showing student indextest");
		break;

		case "admin":
		res.render('indexAdmin');
		console.log("User is admin, showing admin index");
		break;

		case "doctor":
        Availability.find({doctor: user.username}, function (err, availability) {
            res.render("indexDoctor", {
                availability: availability,
            });
        });
		console.log("User is doctor, showing doctor page");
		break;

		default:
		res.render('index');
		console.log("User was not any type - normal index page");
	}
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

module.exports = router;
