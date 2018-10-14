var express = require("express");

var router = express.Router();
var MedicalForm = require("../models/medicalform");

router.get("/", ensureAuthenticated, function(req, res) {
  console.log(999999)
  res.render("createMedicalForm", { loggedinUser: req.user });
});

router.post("/", ensureAuthenticated, function(req, res) {
  validation(req, res);

  var name = req.body.name;
  var studentID = req.body.studentID;
  var dob = req.body.dob;
  var postCode = req.body.postcode;
  var foneNo = req.body.foneNo;
  var mdcNo = req.body.mdcNo;
  var desc = req.body.description;

  createMedicalForm(req, res, name, studentID, dob, postCode, foneNo, mdcNo, desc );
});

function validation(req,res) {
  req.checkBody("name", "Name is required").notEmpty();
  req.checkBody("dob", "Day of birth is required").notEmpty();
  req.checkBody("studenID", "Student ID is required").notEmpty();
  req.checkBody("postCode", "Postcode is required").notEmpty();
  req.checkBody("foneNo", "Phone number is required").notEmpty();
  req.checkBody("mdcNo", "Medicare number is required").notEmpty();
}

function createMedicalForm(req, res, name,studentID,dob,postCode,foneNo,mdcNo,desc) {
  var newMedicalForm = MedicalForm({
    name: name,
    studentID: studentID,
    dob: dob,
    postCode: postCode,
    foneNo: foneNo,
    mdcNo: mdcNo,
    desc: desc
  });
  
  uploadMedicalForm(req, res, newMedicalForm);
}

function uploadMedicalForm(req, res, newMedicalForm) {
  MedicalForm.AddMedicalForm(newMedicalForm, function(err, prescription){
    if(err)
        req.flash("error_msg", "Upload failed, please try again.");
    else {
        req.flash("success_msg", "Upload Success!");
        console.log(prescription);
    }
    res.redirect("/");
});
}

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
      return next();
  } else {
      req.flash("error_msg", "You are not logged in");
      res.redirect("/users/login");
  }
}

module.exports = router;
