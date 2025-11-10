const jwt = require("jsonwebtoken");

// const { JWT_PASSWORD_USER } = require("../config")
const JWT_PASSWORD_USER = process.env.JWT_SECRET;

function userMiddleware(req,res,next) {
    const token = req.headers.token;
    const decoded = jwt.verify(token, JWT_PASSWORD_USER);
    if(decoded) {
        req.userId= decoded.id;
        next();
    }
    else
    {
        res.status(403).json({
            message: "You are not signed in"
        })
    }
}

module.exports = userMiddleware
