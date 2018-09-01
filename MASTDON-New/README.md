# MASTODON 

### Express file structure:
app.js: runs the server, main core file for the application
Models: holds model(db) files
Public: css, javascript and images
Routes: renders the HTML pages requested by the user
View: html files, handlebars template engine (just html but can embed variables)


### How it works:
“app.js” runs the server on port 3000, then it looks at the url requested and finds the route to display the HTML file.


### Run the server
1. install node then run "npm install" to install all the node modules requried

2. You need to install mongodb
	Once installed, all you need to do is create a database on your machine: (for Mac)
	1. Enter “mongo” in terminal
	2. Enter “use mastodon” (to create db)
	3. Enter “show dbs” (make sure it is listed)

3. "npm start" to start the server in "localhost:3000"


### What to do:
When you create a new handlebars (html) file you need to do the following:
For example lets create an about page.

1. In view, create about.handlebars

2. In app.js:
var about = require(‘./routes/about’);
app.use(‘\about’, about) //when the home page is requested, call "about"

3. In routes create about.js and:
Pretty much the same as other pages except change render to ‘about’
