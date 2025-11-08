// const express = require("express")
// const userRouter = express.Router;

const {Router} = require("express");
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const { userModel } = require("../db")
const userRouter = Router();

dotenv.config();
const jwtpassword = process.env.JWT_SECRET;

userRouter.post("/signup" , async (req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    const firstname = req.body.firstName;
    const lastname = req.body.lastName;

    try {
        // const hashedPassword = await bcrypt.hash(password, 5)
        // console.log(hashedPassword)
        await userModel.create({
            email: email,
            password: password,
            firstName: firstname,
            lastName : lastname
        });
        res.json({
            message : "Your are signed up "
        })
    }
    catch(e) {
        console.log(e)
        res.json({
            message : "error in signed up "
        })
    }
    
})

userRouter.post("/signin" , async(req,res) => {

    const { email, password} = req.body;
    console.log(email,password)
    const user = await userModel.findOne({
        email: email,
        password: password
    })

    if(!user) {
        res.status(403).json({
            message : "User does not exist in our db"
        })
        return
    }
    // const passwordMatch = bcrypt.compare(password, express.response.password);

    if(user) {
        const token = jwt.sign({
            id: user._id.toString
        },jwtpassword)

        // do cookie logic for authentication
        res.json({
            token: token
        })
    }
    else {
        res.status(403).json({
            message : "invalid credential"
        })
    }
})

userRouter.get("/user/purchased-course" , (req,res) => {

})


module.exports = {
    userRouter : userRouter
}   