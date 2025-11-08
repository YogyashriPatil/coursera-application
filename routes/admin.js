const {Router} = require("express")
const bcrypt = require("bcrypt")
const zode = require("zod")
const jwt = require("jsonwebtoken")
const { adminModel, courseModel } = require("../db");
const adminRouter = Router();
const dotenv = require("dotenv")
const { JWT_PASSWORD_ADMIN } = require("../config");
const adminMiddleware = require("../middleware/adminMiddleware");

dotenv.config();
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
        },JWT_PASSWORD_ADMIN)

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

adminRouter.post("/course" , adminMiddleware, async function(req,res){
    const adminId = req.userId;
    const {title, description, imageUrl, price} = req.body;

    const course = await courseModel.create({
        title:title, 
        description:description,
        price:price, 
        imageUrl:imageUrl, 
        creatorId:adminId
    })
    res.json({
        message : "course created",
        courseId: course._id
    })
})

adminRouter.put("/course" , adminMiddleware, async (req,res)=> {
    const adminId = req.userId;
    const {title, description, imageUrl, price, courseId} = req.body;

    // const course = await courseModel.findOne({
    //     _id:courseId,
    //     creatorId: adminId
    // })
    const course = await courseModel.updateOne({
            _id:courseId,
            creatorId: adminId
        }
        ,{
        title:title, 
        description:description,
        price:price, 
        imageUrl:imageUrl
    })
    res.json({
        message : "course updated",
        courseId: course._id
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