var mongoose = require("mongoose");

var MedicalFormSchema = mongoose.Schema({

    // store students medical form inputs
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
    injury: {
        type: Boolean,
        required: false,
        default: false
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
module.exports.getMedicalFormByStudentID = function(id, callback) {
    var query = {studentID : id};
    MedicalForm.findOne(query, callback);
};
