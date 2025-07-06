const mongoose = require("mongoose")

const connectDb = async (req,res) => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Database connected successfully")
    } catch (error) {
            console.log("Error Connecting DB : ",error.message)
    }
}
module.exports = connectDb