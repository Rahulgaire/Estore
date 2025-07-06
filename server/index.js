const express = require('express')
const cookieParser = require('cookie-parser')
const connectDb = require("./config/Database")
const userRoute = require("./routes/Auth.routes")
const productRouter = require("./routes/Product.routes")
const cartRoute = require('./routes/Cart.routes')
require("dotenv").config()
const cors = require("cors")
//port
const PORT =  process.env.PORT || 5000
//middlewares 
const app = express()
app.use(cors())
app.use(express.json({limit:"10mb"}))
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use('/auth',userRoute)
app.use('/api',productRouter)
app.use('/api',cartRoute)
app.get('/',(req,res)=>{
    res.send("Hello world")
})
connectDb()
.then(()=>{
    app.listen(PORT,(req,res)=>{
        console.log(`Server is running at ${PORT}`)
    })
})
.catch((err)=>{
    console.log(`Server Error ${err.message}`)
})