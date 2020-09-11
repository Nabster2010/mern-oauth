const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user.model');

passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	User.findById(id)
		.then((user) => done(null, user))
		.catch((err) => done(err, null));
});

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: 'http://localhost:4000/auth/google/callback',
		},
		async function (accessToken, refreshToken, profile, cb) {
			try {
				let user = await User.findOne({ googleId: profile.id });
				if (!user) {
					user = await User.create({
						displayName: profile.displayName,
						googleId: profile.id,
						avatar: profile._json.picture,
					});
				}
				cb(null, user);
			} catch (err) {
				cb(err, null);
			}
		}
	)
);
