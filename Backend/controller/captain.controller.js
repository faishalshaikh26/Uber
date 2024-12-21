const captainModel = require('../model/captain.model');
const captainServices = require('../services/captain.services');
const {validationResult} = require('express-validator');

module.exports.register = async (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    
    const {fullname,email,password,vehicle} = req.body;

    const isCaptainAlreadyExist = await captainModel.findOne({email});
    if(isCaptainAlreadyExist){
        return res.status(400).json({message: "Captain already exist"});
    }
    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await captainServices.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
    });

    const token = captain.generateAuthToken();

    res.status(201).json({token,captain});
};

module.exports.login = async (req, res, next) => {
    // Login logic here
};

module.exports.getProfile = async (req, res, next) => {
    // Get profile logic here
};

module.exports.logout = async (req, res, next) => {
    // Logout logic here
};