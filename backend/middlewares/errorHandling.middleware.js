
const errorHandling = (err, req, res, next) => {

    if (res.headerSent) {
        return next(err);
    }

    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({
            message: "User is not authorized"
        });
    }

    if (err.name === 'ValidationError') {
        return res.status(401).json({
            message: "Validation error",
            err
        });
    }

    else {
        return res.status(500).json({
            message: 'Internal Server Error',
            err
        })
    }
};

module.exports = errorHandling;