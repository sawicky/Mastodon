var mongoose = require("mongoose");

var MedicalFormSchema = mongoose.Schema({

    // stores prescription for that student and the doctor that created the prescription
    name: {
        type: String
    },
    studentID:{
        type: String,
        index: true
    },
    dob: {
        type: String
    },
    postCode: {
        type: Number
    },
    foneNo: {
        type: Number
    },
    mdcNo: {
        type: Number
    },
    description:{
        type: String,
        required: false
    }
});

var MedicalForm = (module.exports = mongoose.model("MedicalForm", MedicalFormSchema));

module.exports.AddMedicalForm = function(newMedicalForm, callback) {
    newMedicalForm.save(callback);
};
