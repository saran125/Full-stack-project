const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
var app = express()

app.set('views', path.join(__dirname, 'template'))
app.engine('handlebars', exphbs({
	defaultLayout: 'main' // Specify default template views/layout/main.handlebar 
}));
app.set('view engine', 'handlebars');
app.get("/",      function(req, res) {
	console.log("Home page accessed");
	return res.render('booking', {

	});
});
app.post("/roomtype",      function(req, res) {
	console.log("Home page accessed");
	return res.render('roomtype', {

	});
});
app.get("/checkout",      function(req, res) {
	console.log("Home page accessed");
	return res.render('checkout', {

	});
});
app.post("/ticket",      function(req, res) {
	console.log("Home page accessed");
	return res.render('ticket', {

	});
});
const Port   = process.env.PORT || 3000;

app.listen(Port, function() {
	console.log(`Server listening at port ${Port}`);
});