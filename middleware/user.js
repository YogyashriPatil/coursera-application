const jwt = require("jsonwebtoken");

const { JWT_PASSWORD_USER } = require("../config")

function userMiddleware(req,res,next) {
    const token = req.headers.token;
    const decoded = jwt.verifytoken(token, JWT_PASSWORD_USER);

    if(decoded) {
        req.userId= jwt.decode.id;
        next();
    }
    else
    {
        res.status(403).json({
            message: "You are not signed in"
        })
    }
}

module.exports = {
    userMiddleware: userMiddleware
}