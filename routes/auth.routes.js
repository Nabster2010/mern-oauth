const router = require('express').Router();
const passport = require('passport');
const CLIENT_HOME_PAGE_URL = 'http://localhost:3000/';

//when login successfull , return user info
router.get('/login/success', (req, res) => {
	if (req.user) {
		res.json({
			success: true,
			message: 'user has successfully authenticated',
			user: req.user,
			cookie: req.cookies,
		});
	}
});

// when login failed , send failure msg
router.get('/login/failed', (req, res) => {
	res.status(401).json({
		success: false,
		message: 'user has faild to  authenticate',
	});
});

// when logout redirect to client

router.get('/logout', (req, res) => {
	req.logout();
	res.redirect(CLIENT_HOME_PAGE_URL);
});

router.get(
	'/google',
	passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
	'/google/callback',
	passport.authenticate('google', {
		failureRedirect: '/auth/login/failed',
		successRedirect: CLIENT_HOME_PAGE_URL,
	})
);

module.exports = router;
