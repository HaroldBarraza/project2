
console.log('se esta autemticando')
const authenticate = (req, res, next) => {
    console.log('se esta autemticando')
    console.log('User  session:', req.session.user);
    if (req.session.user === undefined) {
        return res.status(401).json("You do not have access");
    }
    next();
};

module.exports = { authenticate };