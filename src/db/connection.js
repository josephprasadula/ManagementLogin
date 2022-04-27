const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/managementLogin").then(()=>{
    console.log("connection success")
}).catch((e)=>{console.log("connection error")})