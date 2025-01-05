const usermodel = require('../model/user.model');
const userServices = require('../services/user.services');
const { validationResult } = require('express-validator');
const BlacklistTokenModel = require('../model/blacklistToken.model');

module.exports.register = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password } = req.body;
    const isUserAlreadyExist = await usermodel.findOne({ email });
    if (isUserAlreadyExist) {
        return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await usermodel.hashPassword(password);

    const user = await userServices.createUser({
        fullname,
        email,
        password: hashedPassword
    });

    const token = user.generateAuthToken();

    res.status(201).json({ token, user });
}

module.exports.login = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    const user = await userServices.findUserByEmail({ email }).select('+password');

    if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await usermodel.comparePassword(password, user.password);

    if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = user.generateAuthToken();

    res.cookie('token', token);

    res.status(200).json({ token, user });
}

module.exports.getUserprofile = async (req, res, next) => {
    res.status(200).json(req.user);
}

module.exports.logout = async (req, res, next) => {
    res.clearCookie('token');
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
    await BlacklistTokenModel.create({ token });
    res.status(200).json({ message: "Logout successfully" });
}
