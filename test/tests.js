var expect = require('chai').expect;
var app = require('../app');
var request = require('supertest');

const testUser = {
    username: 'testuser',
    password: 'Mastodon1!'
}

var authenticatedUser = request.agent(app);

before(function(done) {
    authenticatedUser
        .post('/users/login')
        .send(testUser)
        .end(function(err, response) {
            expect('Location', '/bookAppointments');
            expect(response.statusCode).to.equal(302);
            done();
        });
});

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
