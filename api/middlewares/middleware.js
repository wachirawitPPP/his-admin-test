const jwt = require('jsonwebtoken')

const config = require('../config')

const verifyToken = (req,res,next) => {
    // console.log('Headers:', req.headers);
    const token = req.headers['authorization'];
    if(!token) {
        return res.status(401).json({message: 'No token provided'})
    }

    jwt.verify(token,process.env.JWT,(err, decoded)=>{
        if(err) {
            return res.status(500).json({message: 'Failed to verify token'})
        }
        req.user = decoded;
        // console.log(req.user)
        next()
    })
}
const checkRole = (role) => {
    return (req, res, next) => {
        if (req.user && req.user.role === role || req.user && req.user.role === 'sadmin') {
            next(); // User has the required role, proceed
        } else {
            res.status(403).json({ message: 'Unauthorized' }); // User does not have the required role
        }
    };
};
module.exports = {
    verifyToken,
    checkRole
};