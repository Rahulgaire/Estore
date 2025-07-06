const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
    trim: true,
  },
  desc: {
    type: String,
    require: true,
  },
  image:{
    type:String,
    require:true
  },
 category:{
    type:String,
    require:true
 },
 stock:{
    type:Number,
    require:true
 },
 reviews:[
    {
      comment:String,
      rating:Number,
      userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }}
 ]
},
{
    timestamps:true
});

module.exports = mongoose.model("Product",productSchema)