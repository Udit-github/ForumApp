// const express=require("express");
// const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel=require("../model/userSchema");

const signUp= async (req,res)=>{
    const {firstName,lastName,email,password,userName}=req.body;
    const encryptedPassword=bcrypt.hashSync(password,8)
    try{
        //Checking if user exists or not
        let user= await UserModel.findOne({email:email});
        if(user){
            res.status(400).send({message:`User Already Exists! Please Login`})
        }

        //registering the new user
        user= new UserModel({firstName,lastName,email,password:encryptedPassword,userName})
        await user.save()
        
        
        
        if(user){
            res.status(200).send({message:`User registered succesfully`})
        }

    }catch(error){
        console.log(`Error while registering user: ${error.message}`);
    }
}

const signIn=async(req,res,next)=>{
    const {userName,password}=req.body;
    const user= await UserModel.findOne({userName:userName})
    const comparePassword=bcrypt.hashSync(password,8)
    if(user && comparePassword){
        
        //Creating the token 
        var token = jwt.sign({ id: user.id }, process.env.API_SECRET_KEY, {
            expiresIn: "1h",
          });
        //   console.log(token);
          user.token=token;
          res.status(200).send({message:`SignIn successfull: ${user}` })
    }else{
        res.status(400).send("Enter correct credentials")
    }
}
module.exports={signUp,signIn}