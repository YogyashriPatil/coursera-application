const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config();
// const { Schema } = require("mongoose")
mongoose.connect(process.env.MONGO_DB)
const objectId = mongoose.Types.ObjectId;

const userSchema = mongoose.Schema({
    email : {type: String, unique: true},
    password : String,
    firstName : String,
    lastName : String
});

const courseSchema = mongoose.Schema({
    title : String,
    description : String,
    price : Number,
    imageUrl: String,
    creatorId : objectId
});

const adminSchema = mongoose.Schema({
    email : {type: String, unique: true},
    password : String,
    firstName : String,
    lastName : String
});

const purchaseSchema = mongoose.Schema({
    userId : objectId,
    courseId : objectId
});

const userModel = mongoose.model("user", userSchema);
const adminModel = mongoose.model("admin", adminSchema);
const courseModel = mongoose.model("course", courseSchema);
const purchaseModel = mongoose.model("purchase", purchaseSchema)

module.exports = {
    userModel,
    adminModel,
    courseModel,
    purchaseModel
}
