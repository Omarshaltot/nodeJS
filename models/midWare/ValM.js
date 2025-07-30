// UserVal.js

const { validationResult } = require("express-validator");
const validationM = (req, res, next) => {
    const err = validationResult(req);

    if (!err.isEmpty()) {
        return res.status(400).json({ message: "Validation failed", errors: err.array() });
    }
    next();
}

module.exports = validationM;