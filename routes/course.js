// const express = require("express")
// const courseRouter = express.Router;

const {Router} = require("express");
const courseRouter = Router();
// const userMiddleware = require("../middleware/user");
const { purchaseModel, courseModel } = require("../db");
const userMiddleware = require("../middleware/user"); // now it's a function

courseRouter.post("/purchase" , userMiddleware , async (req,res) => {
    const userId = req.userId;
    const courseId = req.body.courseId;

    await purchaseModel.create({
        userId,
        courseId
    })
    res.json({
        message : "You have successfuly buy the course"
    })
})

courseRouter.get("/courses" , async (req,res) => {
    const courses = await courseModel.find({});
     res.json({
        message : "Course purchases",
        courses
    })
})


module.exports = {
    courseRouter : courseRouter
}