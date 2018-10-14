var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var Availability = require("../models/availability");
const nodemailer = require("nodemailer");
let transporter = null;
var bookingConfirmation = require("./templates/bookingConfirmation");

nodemailer.createTestAccount((err, account) => {
    transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other port
      auth: {
        user: "mastodonuts0@gmail.com", // generated ethereal user
        pass: "hrhk1234" // generated ethereal password
      }
    });
  });

  function postConfirmationEmail(user, availability) {
    let mailOptions = {
        from: '"UTS University" <mastodonuts0@gmail.com>', // sender address
        to: "deityhippo@gmail.com", // list of receivers
        subject: "UTS Medical Appointment Confirmation", // Subject le
        text: "Confirmation", // plain text body
        // MAIL TEMPLATE
    
        html: bookingConfirmation(
          user.name,
          availability
        ) // html body
      };
      // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log("Failed to send confirmation email", error);
        }
        console.log("Message sent: %s", info.messageId);
        console.log(
          "Preview URL: %s",
          nodemailer.getTestMessageUrl(info)
        );
      });
  }

 
  
router.get("/", ensureAuthenticated, function(req, res) {
    var user = req.user
    viewAllDoctors(res, req, user);
});

// ID Parameter URL
router.get("/:id", ensureAuthenticated, function(req, res) {
    var id = req.params.id;
    updateBooking(res, req.params.id, req);

});

// This function will find all the doctors in the DB.
function viewAllDoctors(res, req, user){
    var currentUser = user;
    console.log(currentUser);

    Availability.find({}, function (error, availabilities) {

        res.render("bookAppointments", {avail: availabilities, user: currentUser});
    });

    // User.find({userType: "doctor"}, function (err, docs) {
    //     res.render("bookAppointments", {doctors: docs});
    // });
}

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash("error_msg", "You are not logged in");
        res.redirect("/users/login");
    }
}
function updateBooking(res, id, req) {
    var user = req.user;
    query = { $set:
        {
             "appointment.student" : req.user.name, "appointment.booked" :true, "appointment.studentId" : req.user._id
        }
        };

    Availability.findById(id, function(err, availability) {
        //If the clicked availability is not already booked
        if (availability) {
            if (availability.appointment.booked == false) {
                console.log("Clicked appointment is not booked");
                //Update it
            Availability.updateOne({_id: id}, query, function(err, availability) {
                if (err) throw err;
                viewAllDoctors(res, req, user);
                Availability.findOne({_id: id}, function (error, availabilities) {
                    console.log(availabilities.doctor);
                    console.log(availabilities.appointment.date, availabilities.appointment.time);
                    postConfirmationEmail(user, availabilities);
                });
                
            });
             } else {
                Availability.find({}, function (error, availabilities) {
                    console.log("My userID :"+user._id);
                    res.render("bookAppointments", {error: "This appointment is already booked", avail: availabilities, user: user});
                });
                return; 

             }
        } else {
            Availability.find({}, function (error, availabilities) {
                res.render("bookAppointments", {error: "No appointments found with this ID", avail: availabilities, user: user});
            });
            // Availability.updateAvailability(user.name, id, true, function(err, availability) {
            //     if (err) {
            //         console.log("Error updating availability: "+err);
            //         throw err;
            //     }
            //     viewAllDoctors(res)
            // });


        }
    });
}


module.exports = router;
