const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Email validation regex pattern
const emailRegex = /^\S+@\S+\.\S+$/;

const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, 'First name should be at least 3 characters'],
        },
        lastname: {
            type: String,
            minlength: [3, 'Last name should be at least 3 characters'],
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
                return emailRegex.test(v); // Ensuring email format
            },
            message: props => `${props.value} is not a valid email!`
        },
        minlength: [5, 'Email should be at least 5 characters'],
    },
    password: {
        type: String,
        required: true,
        select: false // Ensuring the password is not included in query results
    },
    socketId: {
        type: String
    }
});

// Method to generate auth token
userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    return token;
}

// Method to compare password
userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

// Static method to hash password
userSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password, 10);
}

const usermodel = mongoose.model('user', userSchema);

module.exports = usermodel;
