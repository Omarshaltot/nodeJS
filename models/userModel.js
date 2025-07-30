// userModel.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,

    },

    passwordChangedAt: {
    type: Date,
    },

    password: {
        type: String,
        required: [true, 'Password Needed'],
        minlength: [6, 'At least 6 characters'],
    },

    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },

    address: {
        id: { type: mongoose.Schema.Types.ObjectId },
        city: String,
    }
})

const User = mongoose.model('User', userSchema);
module.exports = User;
//hellow 