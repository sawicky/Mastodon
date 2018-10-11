var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

// User Schema
var AvailabilitySchema = mongoose.Schema({

    /* stores doctor availability
        - contains doctors username
        - date and time
        - booked which would be false when it is added
        - contains the student username that has booked this appointment
     */

    doctor: {
        type: String
    },

    appointment: {
        date: {
            type: String
        },

        time: {
            type: String
        },

        booked: {
            type: Boolean,
            default: false
        },

        student: {
            type: String,
            required: false
        },

        status: {
            type: String
        }
    }
});


var Availability = (module.exports = mongoose.model("Availability", AvailabilitySchema));

module.exports.AddAvailability = function(newAvailability, callback) {
    newAvailability.save(callback);
};

module.exports.GetDoctorAvailability = function(username, callback) {
    var query = { doctor: username };
    Availability.findOne(query, callback);
};

