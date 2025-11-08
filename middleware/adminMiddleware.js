const jwt = require("jsonwebtoken");

// const { JWT_PASSWORD_ADMIN } = require("../config")

const JWT_PASSWORD_ADMIN = process.env.JWT_SECRET_ADMIN;
function adminMiddleware(req,res,next) {
    const token = req.headers.token;
    const decoded = jwt.verify(token, JWT_PASSWORD_ADMIN);

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

module.exports = adminMiddleware;