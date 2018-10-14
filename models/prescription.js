var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

// User Schema
var PrescriptionSchema = mongoose.Schema({

    // stores prescription for that student and the doctor that created the prescription
    student: {
        type: String
    },
    doctor: {
        type: String
    },
    description: {
        type: String
    }
});

var Prescription = (module.exports = mongoose.model("Prescription", PrescriptionSchema));

module.exports.AddPrescription = function(newPrescription, callback) {
    newPrescription.save(callback);
};

module.exports.deleteAllDoctorPrescriptions = function(username, callback) {
    var query = { doctor: username };
    Prescription.deleteMany(query, callback);
};
