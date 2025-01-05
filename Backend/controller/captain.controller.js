const captainModel = require('../model/captain.model');
const { validationResult } = require('express-validator');
const BlacklistTokenModel = require('../model/blacklistToken.model');

module.exports.registerCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password } = req.body;
    const isCaptainAlreadyExist = await captainModel.findOne({ email });
    if (isCaptainAlreadyExist) {
        return res.status(400).json({ message: "Captain already exists" });
    }
    const hashedPassword = await captainModel.hashPassword(password);

    const captain = new captainModel({
        fullname,
        email,
        password: hashedPassword
    });

    await captain.save();

    const token = captain.generateAuthToken();

    res.status(201).json({ token, captain });
}

module.exports.loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    const captain = await captainModel.findOne({ email }).select('+password');

    if (!captain) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await captain.comparePassword(password);

    if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = captain.generateAuthToken();

    res.cookie('token', token);

    res.status(200).json({ token, captain });
}

module.exports.getCaptainProfile = async (req, res, next) => {
    res.status(200).json(req.captain);
}

module.exports.logoutCaptain = async (req, res, next) => {
    res.clearCookie('token');
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
    await BlacklistTokenModel.create({ token });
    res.status(200).json({ message: "Logout successfully" });
}
