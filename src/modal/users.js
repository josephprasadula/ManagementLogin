const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullname:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    birthdate: {
        type: Date,
        required: true
    },
    gender:{
        type:String,
        required:true,
        // enum:"male"||"female"||"other"
    },
    password: {
        type: String,
        required: false
    },
    securityquestions: {
        type: [String],
        required: true
    },
    created:{
        type: Date,
        default: Date.now
    }
})

const Register = new mongoose.model("ManagementLogin",userSchema);

module.exports = Register;