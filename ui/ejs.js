const express = require("express");
const {json,urlencoded}  = require("express");
const app = express();
const ejs = require("ejs")

const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/managementLogin").then(()=>{
    console.log("connection success")
}).catch((e)=>{console.log("connection error")})

// const Register = require("./modal/users");
const ejs_path = path.join(__dirname,"../ui/views")

app.set("view engine","ejs")


app.get('/',(req,res)=>{
    res.render('working')
})
