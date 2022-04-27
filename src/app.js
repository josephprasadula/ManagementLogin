const express = require("express");
const {json,urlencoded}  = require("express");
const app = express();
const path = require("path")
const hbs = require("hbs")
const ejs = require("ejs")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// require("./db/connection")
const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/managementLogin").then(()=>{
    console.log("connection success")
}).catch((e)=>{console.log("connection error")})

const Register = require("./modal/users");
const async = require("hbs/lib/async");
const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public")
const ui_path = path.join(__dirname,"../ui/views")
const partials_path = path.join(__dirname,"../ui/partials")
const register_path = path.join(__dirname,"../ui/views")
const dashboard_path = path.join(__dirname,"../ui/views")
const ejs_path = path.join(__dirname,"../ui/views")

// console.log(path.join(__dirname, "../public"))
app.use(express.static(static_path))
app.set("view engine","hbs")
// app.set("view engine","ejs")
app.set("views",ui_path)
app.set("views",register_path)
app.set("views",dashboard_path)
hbs.registerPartials(partials_path)
app.use(json());
app.use(urlencoded({extended: false}));

app.get("/",(req,res)=>{
    res.render("index")
})
app.post("/dashboard",async(req,res)=>{
    
    try {
        const user = await Register.find({ email: req.body.email });
        if (user.length == 0) {
            console.log(user)
            res.send({
                err: "Email not registered"   
            })
            return;
        }
        const checkPass = await Register.compare(req.body.password, user[0].password);
        if (checkPass) {
            
            res.status.redirect("dashboard")
        }
        else {
            res.send({
                err: "Wrong Password"
            })
            return;
        }
    }
    catch (err) {
        res.send(err);
        return;
    }
})
app.get("/register",(req ,res)=>{
    res.render("register")
})
app.post("/register",async(req ,res)=>{
    try{
        // const checkUser = await User.find({ email: req.body.email });
        // if (checkUser.length > 0) {
        //     res.send({
        //         err: "Email already registered"
        //     });
        //     return;
        // }
        // const password = req.body.password;
        const registerUser = new Register({
            fullname : req.body.fullname,
            email : req.body.email,
            phone : req.body.phone,
            date : req.body.date,
            birthdate : req.body.birthdate,
            gender : req.body.gender,
            password : req.body.password,
            securityquestions : req.body.securityquestions,
            created : req.body.created
        })

        const registerData=await registerUser.save();
        res.status(201).redirect("/")
    }
    catch(err){
        console.log(err)
    }
})
app.get("/dashboard",(req,res)=>{
    res.render("dashboard")
})
app.listen(port, () =>{
    console.log(`the sever is running at port ${port}`)
})