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
        .end()
})
