var express = require('express');
var router = express.Router();
var User = require("../models/user");

// Get Homepage if user is logged on, otherwise direct them to /users/login
router.get('/', ensureAuthenticated, function(req, res){
	var user = req.user;
	switch (user.userType) {
		case "student":
		res.render('index',{user: user});
		Console.console.log("User is a student, showing student index");
		break;
		case "admin":
		res.render('indexAdmin', {user: user});
		console.log("User is admin, showing admin index");
		break;
		case "doctor":
		res.render("indexDoctor", {user:user});
		console.log("User is doctor, showing doctor page");
		break;
		default:
		res.render('index');
		console.log("User was not any type - normal index page");
	}
});


  //  res.render('profile', { title: 'profile', user: user });

function getUserType(req, res, next) {
	
}

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

module.exports = router;
