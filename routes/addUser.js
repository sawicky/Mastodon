var express = require("express");
var router = express.Router();
var User = require("../models/user");
const nodemailer = require("nodemailer");
let transporter = null;
var addNewUser = require("./templates/addNewUser");
var mongoose = require("mongoose");
var passport = require("passport");
var config = require("../wdio.conf");

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



router.get("/", ensureAuthenticated, function(req, res) {
    res.render("addUser");
});

router.post("/",ensureAuthenticated, function(req, res) {
    var email = req.body.email;
    var type = req.body.type;
    req.checkBody("email", "Email is required").notEmpty();
    req.checkBody("email", "Email is not valid").isEmail();
    var errors = req.validationErrors();
    if (errors) {
        res.render("addUser", {
          errors: errors
        });
      } else {
          User.getUserByEmail(email, function(err, user) {
              if (err) {
                  console.log("Error: "+err);
              }
              if (user) {
                //User already exists
                console.log("User already exists: "+user);
                res.render("addUser", {
                    error: "User already exists!"
                  });
              } else {
                //Send an email
                var newUser = new User({
                    email: email,
                    userType: type,
                    verificationCode: mongoose.Types.ObjectId(),
                  });
                  User.createUser(newUser, function(err, user) {
                    if (err) throw err;
                    var newLink = req.originalUrl + `/users/registerSpecial/${user.verificationCode}`;
                    let mailOptions = {
                      from: '"UTS University" <mastodonuts0@gmail.com>', // sender address
                      to: email, // list of receivers
                      subject: "You've been invited to the UTS Medical Application System", // Subject le
                      text: "Create an Account", // plain text body
                      // MAIL TEMPLATE

                      html: addNewUser(
                        `http://www.sawickers.com:3000/users/registerSpecial/${
                          user.verificationCode
                        }`,
                      ) // html body
                    };

                    // send mail with defined transport object
                    transporter.sendMail(mailOptions, (error, info) => {
                      if (error) {
                        return console.log("Failed to send add special user", error);
                      }
                    });
                    req.flash(
                      "success_msg",
                      "Invitation email sent to user"
                    );
                    res.redirect("/");
                  });
              }
          })

    }
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
