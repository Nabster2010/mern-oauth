require('dotenv').config();
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const flash = require('connect-flash');
const path = require('path');
// you can use one (cookie-session && express-session)
const expressSession = require('express-session');
const cookieSession = require('cookie-session');
//------------------------
const mongoose = require('mongoose');
const authCheck = require('./middlewares/authCheck');

const app = express();

//passport configuration
require('./config/passport');
app.use(
	cors({
		origin: 'http://localhost:3000',
		credentials: true, // allow the cookie to be sent
	})
);

// app.use(
// 	expressSession({
// 		secret: 'mysecret',
// 		resave: false,
// 		saveUninitialized: false,
// 		cookie: {
// 			maxAge: 24 * 60 * 60 * 1000,
// 		},
// 	})
// );
app.use(
	cookieSession({
		maxAge: 24 * 60 * 60 * 1000,
		name: 'session',
		keys: ['mysecret'],
	})
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('client/build'));

//routes
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, './client/build/index.html'));
});
app.use('/auth', require('./routes/auth.routes'));
app.use('/users', require('./routes/user.routes'));
// app.use('/profile', require('./routes/profile.routes'));

// app.get('/', authCheck, (req, res) => {
// 	console.log(req.user);
// 	res.status(200).json({
// 		authenticated: true,
// 		message: 'user successfully authenticated',
// 		user: req.user,
// 		cookies: req.cookies,
// 	});
// });

const port = process.env.port || 4000;
app.listen(port, console.log(`server running on port ${port}`));

mongoose
	.connect(process.env.DB_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(console.log(`database connected`))
	.catch((err) => console.log(err));
