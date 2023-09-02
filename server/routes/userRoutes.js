const express=require("express");
// const app=express();
const route =express.Router();
const userValidation=require("../validators/userValidator")
const userController=require("../controllers/userControllers")

// User Routes

route.post("/signUp",userValidation.signUp,userController.signUp);
route.post("/signIn",userValidation.signIn,userController.signIn)

module.exports=route;