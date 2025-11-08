// const express = require("express")
// const courseRouter = express.Router;

const {Router} = require("express");
const courseRouter = Router();

courseRouter.post("/course/purchase" , (req,res) => {
    res.json({
        message : "Course"
    })
})

courseRouter.get("/courses" , (req,res) => {
     res.json({
        message : "Course"
    })
})


module.exports = {
    courseRouter : courseRouter
}