const joi =require("joi");

const signUpSchema=joi.object({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(5).max(10).required(),
    userName:joi.string().alphanum().required()

})

const signInSchema=joi.object({
    userName:joi.string().alphanum().required(),

    password:joi.string().required()
})

exports.signUp=(req,res,next)=>{
    const userData={
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        userName: req.body.firstName,
    }
    const {error}=signUpSchema.validate(userData)
    if(error){
        res.status(400).send({message:`Enter all the data: ${error.message}`})
    }else{
        next()
    }
}

exports.signIn=(req,res,next)=>{
    const userData={
        userName:req.body.userName,
        password:req.body.password   
    }
    const {error}=signInSchema.validate(userData)
    if(error){
        res.status(400).send({message:`Enter correct detials: ${error.message}`})
    }else{
        next()
    }
}