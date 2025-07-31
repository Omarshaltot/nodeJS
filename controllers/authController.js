// authController.js

const asyncHandler = require('express-async-handler');
const user = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bycrypt = require('bcryptjs');

const createToken = (payload) => {
  return jwt.sign({ userId: payload }, process.env.JWT_SECRET, { expiresIn: "10d" });
};

exports.signUp = asyncHandler(async (req, res) => {
    const newUser = await user.create({...req.body,
         password: await bycrypt.hash(req.body.password, 5),
        });
    // res.status(201).json({data: newUser});

    const token = createToken(newUser._id);
    res.status(201).json({data: newUser, token});
});

exports.logIn = asyncHandler(async (req, res) => {
    const foundUser = await user.findOne({email: req.body.email});

    if (!foundUser || !(await bycrypt.compare(req.body.password, foundUser.password))) {
        return res.status(404).json({message: "User not found"});
    }
    const token = createToken(foundUser._id);
    res.status(200).json({data: foundUser, token});
});
//hello 
exports.protect = asyncHandler(async (req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if(!token) {
        return res.status(401).json({message: "You are not logged in, please log in to access this route"});
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const currentUser = await user.findById(decoded.userId);
    if(!currentUser) {
        return res.status(401).json({message: "User not found"});
    }

    // Check user changed password after token was issued
    req.user = currentUser;
    next();
});

exports.permission = (...role) => {
  return asyncHandler(async (req, res, next) => {
    if (!role.includes(req.user.role)) {
      return res.status(403).json({
        message: "Permission denied, not allowed to access this specific route",
      });
    }
    next();
  });
};