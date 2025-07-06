const express = require("express")
const userRoute = express.Router()
const {register,login,verifyOtp,logout} = require("../controllers/Auth.controllers")

userRoute.post('/register',register)
userRoute.post('/login',login)
userRoute.post('/otp',verifyOtp)

module.exports = userRoute
