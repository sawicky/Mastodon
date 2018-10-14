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



module.exports.deleteAllDoctorAvailability = function(username, callback) {
    var query = { doctor: username };
    Availability.deleteMany(query, callback);
};

module.exports.deleteAvailability = function(id, callback) {
    Availability.deleteOne({ _id: id }, callback);
};


module.exports.getAvailabilityById = function(id, callback) {
    Availability.findById(id, callback);
};
module.exports.updateAvailability = function(updateUser, id, isBooked, callback) {
    var query = null;
    var student = updateUser;
    var booked = isBooked
    console.log("My name: "+student + " is booked: "+booked);
    console.log("Clicked appointment ID is :" +id);


    query = { $set:
            {
                 "appointment.student" : student, "appointment.booked" :booked
            }
    };
    Availability.updateOne({_id: id}, query, callback);
    console.log("Entered update availability method");
  };



