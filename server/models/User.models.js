const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username :{
        type:String,
        require:true,
        trim:true
    },
    email:{
        type:String,
        require:true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
        lowercase:true
    },
    password:{
        type:String,
        require:true
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    otp:{
        type:String
    },
    otpExp:{
        type:String
    },
    profile:{
        type:String,
        default:"https://via.placeholder.com/150"
    }
},
{
    timestamps:true
})

module.exports = mongoose.model("User",userSchema)