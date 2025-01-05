const userModel = require('../model/user.model');
const jwt = require('jsonwebtoken');
const blacklistTokenModel = require('../model/blacklistToken.model');
const captainModel = require('../model/captain.model');

// Authenticate User Middleware
module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
    
    if (!token) {
        return res.status(401).json({ message: "Unauthorized - No token provided" });
    }

    const isBlacklisted = await blacklistTokenModel.findOne({ token: token });
    
    if (isBlacklisted) {
        return res.status(401).json({ message: "Unauthorized - Token blacklisted" });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        
        if (!user) {
            return res.status(401).json({ message: "Unauthorized - User not found" });
        }

        req.user = user;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Unauthorized - Token expired" });
        }
        return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }
}

// Authenticate Captain Middleware
module.exports.authCaptain = async (req, res, next) => {
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
    
    if (!token) {
        return res.status(401).json({ message: "Unauthorized - No token provided" });
    }

    const isBlacklisted = await blacklistTokenModel.findOne({ token: token });
    
    if (isBlacklisted) {
        return res.status(401).json({ message: "Unauthorized - Token blacklisted" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id);

        if (!captain) {
            return res.status(401).json({ message: "Unauthorized - Captain not found" });
        }

        req.captain = captain;
        next();
    } catch (err) { 
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Unauthorized - Token expired" });
        }
        res.status(401).json({ message: "Unauthorized - Invalid token" });
    } 
}
