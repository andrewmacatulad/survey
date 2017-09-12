const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require('body-parser');
const keys = require("./config/keys");


require("./models/User");
require("./models/Survey");
require("./services/passport"); 

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json())

app.use(
	cookieSession({
		// maxage is for how long the cookie can survive
		// this computation is for 30days
		maxAge: 30 * 24 * 60 * 60 * 1000,
		// this key array will allow you to have multiple keys
		keys: [keys.cookieKey]
	})
);

app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);
require("./routes/surveyRoutes")(app);

if(process.env.NODE_ENV === 'production') {
	// Express will serve up production assets
	// like our main.js file, or main.css file
	app.use(express.static('client/build'));
	// Express will serve up the index.html file
	// if it doesn't recognize the route
	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	})
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log("Server Started at port 5000");
});

