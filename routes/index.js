const passport = require('passport');

const router = require('express').Router();
router.use('/', require('./swagger'));
router.use('/users', require('./users'));
router.use('/classes', require('./classes'));

router.get('/login', passport.authenticate('github'));

router.get('/github/callback', 
    passport.authenticate('github', { failureRedirect: '/api-docs', session: true }),
    (req, res) => {
        // Almacena el usuario en la sesión
        req.session.user = req.user;
        res.redirect('/'); // Redirige a la página principal o a donde desees
    }
);

router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/'); // Redirige a la página principal después de cerrar sesión
    });
});


module.exports = router;