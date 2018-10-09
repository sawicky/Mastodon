var assert = require('assert');

describe('Login page suite', function() {
    this.timeout(10000);
    browser.url('http://localhost:3000');
    it('Have the correct login screen title', function() {
        console.log("Running test: Correct Title");
        var title = browser.getTitle();
        assert.equal(title, 'Login');
        console.log('Current title: '+title);
    });

    it('Should have the correct copyright', function() {
        console.log("Running test: Copyright");
        var copyright = browser.getText("//footer/p")
        console.log("Copyright found: "+copyright);
        assert.equal(copyright, "© 2018 MASTODON, Inc.");
    });

    it('Should be able to input text', function() {
        console.log("Running test: Inputting text into form");
        browser.setValue("//form/div/input[@name='username']", "Test2User");
        console.log("Entering TestUser into username form");
        var expectedName = browser.getValue("//form/div/input[@name='username']");
        console.log('Name found in field : '+expectedName);
        assert.equal(expectedName, "TestUser");
    })
});
describe('User authentication suite', function() {
    browser.url('http://localhost:3000');
    it('Should login successfully as a Student', function() {
        console.log('Running test login with:\nUser: teststudent\nPass: test');
        browser.setValue("//form/div/input[@name='username']", "teststudent");
        browser.setValue("//form/div/input[@name='password']", "test");
        console.log('Submitting form')
        browser.click('#submit')
        var title = browser.getTitle();
        assert.notEqual(title, "Login");
        console.log("Passed login, now at: " + title + " screen");
    })
})

//Servlet session context - add user auth
//extend HTTPServlet

