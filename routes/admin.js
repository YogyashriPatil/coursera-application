const {Router} = require("express")
const bcrypt = require("bcrypt")
const zode = require("zod")
const jwt = require("jsonwebtoken")
const { adminModel } = require("../db");
const adminRouter = Router();
const dotenv = require("dotenv")

dotenv.config();
const jwtPassword = process.env.JWT_SECRET_ADMIN;
// adminRouter.use(adminMiddleware);

adminRouter.post("/signup" , async (req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    const firstname = req.body.firstName;
    const lastname = req.body.lastName;

    try {
        // const hashedPassword = await bcrypt.hash(password, 5)
        // console.log(hashedPassword)
        
        await adminModel.create({
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

    }
})

adminRouter.post("/signin" , async (req,res) => {
    const { email, password} = req.body;
    console.log(email,password)
    const user = await adminModel.findOne({
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
        },jwtPassword)

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

adminRouter.put("/course" , (req,res) => {
    const {title,description,price} = req.body;  
    res.json({
        message : "signip"
    })
})

adminRouter.get("/course/bulk" , (req,res) => {
    res.json({
        message : "signip"
    })

})

module.exports = {
    adminRouter : adminRouter
}