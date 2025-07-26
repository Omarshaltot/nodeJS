const asyncHandler = require('express-async-handler');
const user = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (payload) => {
    jwt.sign({userId: payload}, process.env.JWT_SECRET, { expiresIn: "7d" })
};

exports.signUp = asyncHandler(async (req, res) => {
    const newUser = await user.create(req.body);
    res.status(201).json({data: newUser});
});

exports.logIn = asyncHandler(async (req, res) => {
    const user = await user.findOne({eamil: req.body.email});
    if (!user || !(await bycrypt.compare(req.body.password, user.password))) {
        res.status(401).json({message: "Invalid email or password"});
        return;
    }
    const token = createToken(user._id);
    delete user.password;
    res.status(200).json({data: user, token});
});

exports.protected = asyncHandler(async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        res.status(401).json({message: "Unauthorized"});
        return;
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await user.findById(decoded.userId);
        next();
    } catch (error) {
        res.status(401).json({message: "Invalid token"});
    }
});

exports.permission = (...roles) => {
    asyncHandler(async (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            res.status(403).json({message: "Permission denied, Not allowed to access this specific route"});
            return;
        }
        next();
    });
}