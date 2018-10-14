var express = require("express");
var MedicalForm = require("../models/medicalform");
var User = require("../models/user");
var config = require("../wdio.conf");
var mongoose = require("mongoose");

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
  
  var id = req.user._id;
  console.log("my id is: "+id);
  var injuryStr = req.body.healthcondition;
  var description = req.body.description;
  var injury;
  if (injuryStr == "yes") {injury = true }
  else {injury=false}

  req.checkBody("name", "Name is required").notEmpty();
  req.checkBody("dob", "Dob is required").notEmpty();
  req.checkBody("postcode", "Postcode is required").notEmpty();
  req.checkBody("foneNo", "Phone number is required").notEmpty();
  req.checkBody("mdcNo", "Medicare number is required").notEmpty();
  var errors = req.validationErrors();
  if (errors) {
    res.render("createMedicalForm", {loggedinUser: req.user, errors:errors});
  } else {
    MedicalForm.getMedicalFormByStudentID(id, function(err, form) {
      console.log(form);
      if (!form) {
        //Create a new form
        var newForm = new MedicalForm({
          name:name,
          studentID:id,
          dob:dob,
          postCode:postCode,
          foneNo:foneNo,
          mdcNo:mdcNo,
          injury: injury,
          description: description
        });
        MedicalForm.AddMedicalForm(newForm, function(err, form) {
          if (err) {throw err;}
          else {
            req.flash("success_msg", "Medical form was added");
            res.redirect("createMedicalForm");
          }
        })

      } else {
        res.status(302);
        res.render("createMedicalForm", {loggedinUser:req.user, error:"You already have filled out a form"});
      }
    });

  }
}

module.exports = router;
