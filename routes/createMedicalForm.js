var express = require("express");

var router = express.Router();

router.get("/", ensureAuthenticated, function(req, res) {
  console.log(999999)
  res.render("createMedicalForm", { loggedinUser: req.user });
});

router.post("/", ensureAuthenticated, function(req, res) {
  validation(req, res);
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
      return next();
  } else {
      req.flash("error_msg", "You are not logged in");
      res.redirect("/users/login");
  }
}

function validation(req,res) {
  var name = req.body.name;
  var dob = req.body.dob;
  var postCode = req.body.postcode;
  var foneNo = req.body.foneNo;
  var mdcNo = req.body.mdcNo;

  req.checkBody("name", "Name is required").notEmpty();
  req.checkBody("dob", "Name is required").notEmpty();
  req.checkBody("postCode", "Postcode is required").notEmpty();
  req.checkBody("foneNo", "Phone number is required").notEmpty();
  req.checkBody("mdcNo", "Medicare number is required").notEmpty();
}

module.exports = router;
