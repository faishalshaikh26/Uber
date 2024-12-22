const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Ensure bcryptjs is required
const jwt = require('jsonwebtoken');

const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3,'Firstname must be at least 3 characters']
        },
        lastname: {
            type: String,
            minlength: [3,'Lastname must be at least 3 characters']
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [ /^\S+@\S+\.\S+$/,'Invalid email']
    },
    password: {
        type: String,
        required: true
    },

    soketId: {
        type: String
    },

    status: {
        type: String,
        enum: ['active','inactive'],
        default: 'active'
    },

    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [3,'Color must be at least 3 characters']
        },

        plate: {
            type: String,
            required: true,
            unique: true,
            match: [/^[\d\w]{3,}$/,'Invalid plate number']
        },

        capacity: {
            type: Number,
            required: true,
            min: [1,'Capacity must be at least 1']
        },

        vehicleType: {
            type: String,
            enum: ['motorcycle','car','auto'],
            required: true
        }      
    },

    location: {
       lat: {
            type: Number
        },
        lng: {
            type: Number
        }  
    }
}
);

// Hash the password before saving the captain
captainSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

captainSchema.methods.generateAuthToken = function(){
    const token= jwt.sign({id: this._id},process.env.JWT_SECRET,{expiresIn: '24h'});
    return token;
}

captainSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

captainSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,10);
}
const captainModel = mongoose.model('captain',captainSchema);

module.exports = captainModel;
