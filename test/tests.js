var expect = require('chai').expect;
var app = require('../app');
var request = require('supertest');
var User = require('../models/user');
var mocha = require('mocha');
var assert = require('assert');
var Availability = require('../models/availability');
var bcrypt = require("bcryptjs");
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

var username = 'testuser';
var password = 'Mastodon1!';
var testUser = new User({
    username: 'testuser',
    password: 'Mastodon1!',
    verificationStatus: true,
    email: "testemail@tester.com",
    name: "Test User",
    userType: "student"
});


var authenticatedUser = request.agent(app);
mongoose.connect('mongodb://localhost/testmastodon');
var connection = mongoose.connection;
before(function(done) {
    
        connection.once('open', function() {
        console.log('Connected to test Mastodon database');
        User.createUser(testUser);
        authenticatedUser
        .post('/users/login')
        .send(testUser)
        .end(function(err, response) {
            expect('Location', '/bookAppointments');
            expect(response.statusCode).to.equal(302);
            done();
        });
    }).on('error', function() {
        console.log('Connection error: ', error);
        done();
    });
});

after(function(done){
    User.remove({}, (err) => {
        console.log(err)
        done();
    })
})

describe('GET /profile', function(done) {
    it('should return HTTP 200 status code if we try and access the profile page', function(done){
        authenticatedUser.get('/profile')
        .expect(200, done);
    });
    it('should return HTTP 302 error if we arent logged in', function(done) {
        request(app).get('/profile')
        .expect('Location', '/users/login')
        .expect(302, done);
    });
});
describe('GET /viewDoctors', function(done) {
    it('should return HTTP 200 status code if we try and access the view doctors page', function(done){
        authenticatedUser.get('/viewDoctors')
        .expect(200, done);
    });
    it('should return HTTP 302 error if we arent logged in', function(done) {
        request(app).get('/viewDoctors')
        .expect('Location', '/users/login')
        .expect(302, done);
    });
});
describe('GET /viewPrescriptions', function(done) {
    it('should return HTTP 200 status code if we try and access the view prescriptions page', function(done){
        authenticatedUser.get('/viewPrescriptions')
        .expect(200, done);
    });
    it('should return HTTP 302 error if we arent logged in', function(done) {
        request(app).get('/viewDoctors')
        .expect('Location', '/users/login')
        .expect(302, done);
    });
});

describe('GET /editDetails', function(done) {
    it('should return HTTP200 if we try to access edit details page',function(done) {
        authenticatedUser.get('/editDetails')
        .expect(200, done);
    });
    it('should return HTTP 302 if we arent logged in', function(done) {
        request(app).get('/viewDoctors')
        .expect('Location', '/users/login')
        .expect(302, done);
    });
});

describe('Edit personal details - Empty field validation', function(done) {
    var editDetails = {
        name: "testname",
        username: "testuser2",
        email: "testuser@test.com"
    }
    it('should return HTTP302 if we dont enter anything into input fields', function(done) {
        authenticatedUser
        .post('/editDetails')
        .expect(302, done);

    });
    it('should return HTTP200 if we enter items correctly', function(done) {
        authenticatedUser
        .post('/editDetails')
        .send(editDetails)
        .expect(200, done);
    })
})
