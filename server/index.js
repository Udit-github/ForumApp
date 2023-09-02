const express=require("express");
const app=express();
const mongoose=require("mongoose");
const cors=require("cors")
const db_url="mongodb+srv://udit96405:Mongodb%401@cluster0.tmbybse.mongodb.net/"
require("dotenv").config();
const userRoutes=require("./routes/userRoutes")

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))

//Database Connection with Mongoose
try{
    mongoose.connect(db_url,{useNewUrlParser: true, useUnifiedTopology: true})
    console.log("Db Connected")
}catch(error){
    console.log("Error While connecting to DB: ",error);
}
process.on('uncaughtException', error => {
    console.log('uncaughtException', error.message);
});
// App routes
app.use("/forumApp",userRoutes)

//Starting the port
app.listen(8000,()=>{
    console.log("Server Started at",process.env.PORT)
})