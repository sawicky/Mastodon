var assert = require('assert');


describe('Login page suite', function() {
    this.timeout(10000);
    browser.url('http://localhost:3000');
    it('Have the correct login screen title', function() {
        console.log("Running test: Correct Title");
        var title = browser.getTitle();
        assert.equal(title, 'MASTODON');
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
        browser.setValue("//form/div/input[@name='username']", "TestUser");
        console.log("Entering TestUser into username form");
        var expectedName = browser.getValue("//form/div/input[@name='username']");
        console.log('Name found in field : '+expectedName);
        assert.equal(expectedName, "TestUser");
    })
});