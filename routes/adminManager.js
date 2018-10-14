var express = require("express");
var router = express.Router();
var User = require("../models/user");
var Availability = require("../models/availability");
var Prescription = require("../models/prescription");


router.get("/doctor", ensureAuthenticated, function(req, res) {
    User.find({userType: "doctor"}, function (err, doctors) {
        res.render("viewDoctors", {doctors: doctors});
    });
});

router.post("/doctor", ensureAuthenticated, function(req, res) {
    var _edit = req.body._editRow;
    var _delete = req.body._deleteRow;

    var id = req.body._doctorID;
    var name = req.body._name;
    var username = req.body._username;
    var specialty = req.body._specialty;

    console.log("Edit: " + _edit +"\tDetete: " + _delete + "\t" + name + " " + username);

    // delete user
    if(_delete){
        deleteDoctor(id, username, req, res);

        // Edit changes
    } else if(_edit){

        Validation();

        User.getUserById(id, function (err, user) {
            if(err){
                req.flash("error_msg", "Could not find user");
                res.redirect("doctor");
                throw err;
            }

            if(user.username == username && user.name == name && user.specialty == specialty){
                req.flash("error_msg", "Fields have not been changed");
                res.redirect("doctor");
                return;
            }

            var updateUser = new User({
                name: name,
                username: username,
                specialty: specialty
            });

            Update(updateUser, id , username, req, res);

        });
    }

});

function Update(updateUser, id, username, req, res){

    User.AdminUpdateUser(updateUser, id, function (err, _userUpdated) {
        if(err){
            req.flash("error_msg", "Could not update user");
            res.redirect("doctor");
            throw err;
        }

        req.flash("success_msg", username + " has been updated successfully");
        res.redirect("doctor");
    });
}

function Validation(name, username, res, req){
    if(name.length < 1 || username.length < 1){
        req.flash("error_msg", "Fields cant be empty");
        res.redirect("doctor");
        return;
    }
}



function deleteDoctor(id, username, req, res){
    deleteAvailabilities();
    deletePrescriptions();

    User.deleteUser(id, function (err, userDeleted) {
        if(err){
            req.flash("error_msg", "Could not delete user");
            res.redirect("doctor");
            throw err;
        }

        req.flash("success_msg", username + " has been deleted successfully");
        res.redirect("doctor");
    });
}



function deleteAvailabilities(){
    Availability.deleteAllDoctorAvailability(username, function (err, deletedAvaiability) {

        if(err){
            throw err;
        }

        console.log("Deleted all doctor availibity");
    });
}

function deletePrescriptions(){
    Prescription.deleteAllDoctorPrescriptions(username, function (err, deletedPrescription) {

        if(err){
            throw err;
        }

        console.log("Deleted all doctor prescriptions");
    })
}


///////////////////////


// Patient View
router.get("/patient", ensureAuthenticated, function(req, res) {
    User.find({userType: "student"}, function (err, patients) {
        res.render("viewPatients", {patients: patients});
    });
});




///////////////////////


// Appointment view
router.get("/appointments", ensureAuthenticated, function(req, res) {
    Availability.find({}, function (error, availabilities) {
        res.render("bookAppointments", {avail: availabilities});
    });
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
