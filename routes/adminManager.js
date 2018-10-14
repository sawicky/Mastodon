var express = require("express");
var router = express.Router();
var User = require("../models/user");
var Availability = require("../models/availability");
var Prescription = require("../models/prescription");

// Doctor view
router.get("/doctor", ensureAuthenticated, function(req, res) {
    User.find({userType: "doctor"}, function (err, doctors) {
        Availability.find({}, function(err, availabilities) {
            res.render("viewDoctors", {doctors: doctors, availabilities: availabilities});
        });
    });
});


// Patient View
router.get("/patient", ensureAuthenticated, function(req, res) {
    User.find({userType: "student"}, function (err, patients) {
        res.render("viewPatients", {patients: patients});
    });
});

// Appointment view
router.get("/appointments", ensureAuthenticated, function(req, res) {
    Availability.find({}, function (error, availabilities) {
        res.render("bookAppointments", {avail: availabilities});
    });
});


// Doctor POST Method
router.post("/doctor", ensureAuthenticated, function(req, res) {
    var _edit = req.body._editRow;
    var _delete = req.body._deleteRow;

    var id = req.body._doctorID;
    var name = req.body._name;
    var username = req.body._username;
    var specialty = req.body._specialty;

    var userPage = "doctor";

    // delete user
    if(_delete){
        deleteUser(userPage, id, username, req, res);

        // Edit changes
    } else if(_edit){
        UpdateUser(userPage, id, username, name, specialty, req, res);
    }

});



// Patient POST method
router.post("/patient", ensureAuthenticated, function(req, res){

    var _edit = req.body._editRow;
    var _delete = req.body._deleteRow;

    var id = req.body._studentID;
    var name = req.body._name;
    var username = req.body._username;
    var specialty;

    var userPage = "patient";

    // delete user
    if(_delete){
        deleteUser(userPage, id, username, req, res);

        // Edit changes
    } else if(_edit){
        UpdateUser(userPage, id, username, name, specialty, req, res);
    }

});


// Patient POST method
router.post("/appointments", ensureAuthenticated, function(req, res){

    var _delete = req.body._deleteRow;

    var id = req.body._appointmentID;
    var date = req.body._date;
    var time = req.body._time;

    // delete user
    if(_delete) {
        deleteAppointment(id, req, res);
    }
});

function deleteAppointment(id, req, res){
    Availability.deleteAvailability(id, function (err, cb) {
        if(err){
            req.flash("error-msg", "Couldn't delete appointment");
            res.redirect("appointments");
            throw err;
        }

        req.flash("success_msg", "Appointment has been deleted successfully");
        res.redirect("appointments");
    })
}






///////////////////////

function UpdateUser(userPage, id, username, name, specialty, req, res){

    if(name.length < 1 || username.length < 1){
        req.flash("error_msg", "Fields cannot be empty");
        res.redirect(userPage);
        return;
    }

    User.getUserById(id, function (err, user) {

        if(err){
            req.flash("error_msg", "Could not find user");
            res.redirect(userPage);
            throw err;
        }

        if(user.username == username && user.name == name && user.specialty == specialty && userPage == "doctor"){
            req.flash("error_msg", "Fields have not been changed");
            res.redirect(userPage);
            return;

        } else if(user.username == username && user.name == name && userPage == "patient") {
            req.flash("error_msg", "Fields have not been changed");
            res.redirect(userPage);
            return;
        }

        var updateUser = new User({
            name: name,
            username: username,
            specialty: specialty
        });

        UpdateDB(userPage, updateUser, id , username, req, res);

    });
}


// Update data to db
function UpdateDB(userPage, updateUser, id, username, req, res){
    User.AdminUpdateUser(updateUser, id, function (err, _userUpdated) {
        if(err){
            req.flash("error_msg", "Could not update user");
            res.redirect(userPage);
            throw err;
        }

        req.flash("success_msg", username + " has been updated successfully");
        res.redirect(userPage);
    });
}














// delete doctor from the db and related data
function deleteUser(userPage, id, username, req, res){

    if(userPage == "doctor") {
        deleteAvailabilities(username);
        deletePrescriptions(username);

    } else if (userPage == "patient"){
        cancelBooking(id);
    }

    User.deleteUser(id, function (err, userDeleted) {
        if(err){
            req.flash("error_msg", "Could not delete user");
            res.redirect(userPage);
            throw err;
        }

        req.flash("success_msg", username + " has been deleted successfully");
        res.redirect(userPage);
    });
}

function deleteAvailabilities(username){
    Availability.deleteAllDoctorAvailability(username, function (err, deletedAvaiability) {
        if(err)
            throw err;
    });
}

function deletePrescriptions(username){
    Prescription.deleteAllDoctorPrescriptions(username, function (err, deletedPrescription) {
        if(err)
            throw err;
    });
}

function cancelBooking(id){

    var myquery = { "appointment.studentId": id };
    var newvalues = {$set: {"appointment.booked": false, "appointment.studentId": null, "appointment.student": null} };

    Availability.updateMany(myquery, newvalues, function (err, cb) {
        if(err){
            console.log("errrr");
            throw err;
        }

    });


}


///////////////////////







function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated() && user.userType == "admin") {
        return next();
    } else {
        req.flash("error_msg", "Please login as an admin");
        res.redirect("/");
    }
}

module.exports = router;
