// catchError.js

exports.catchError = (fu) => {
    return (req, res, next) => {
        fu(req, res, next).catch((err) => next(err));
    };
};