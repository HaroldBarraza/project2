const passport = require('passport');

const router = require('express').Router();
router.use('/', require('./swagger'));
router.use('/users', require('./users'));
router.use('/classes', require('./classes'));

router.get('/login', passport.authenticate('github'));

router.get('/github/callback', 
    passport.authenticate('github', { failureRedirect: '/api-docs', session: true }),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/');
    }
);

router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/');
    });
});


module.exports = router;