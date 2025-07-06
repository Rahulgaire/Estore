const { uploadToCloudinary } = require("../config/Cloudinary")
const Product = require("../models/Product.models")

const addProduct = async (req,res) => {
    try {

        const role = req.auth.role
        if(role==="user"){
            return res.status(404).json({
                status:0,
                message:"User can not add products"
            })
        }
        const {title,desc,category,stock} =req.body
        const file = req.file
        if(!title || !desc || !category || !stock){
            return res.status(400).json({
                status:0,
                message:"Each Field is required"
            })
        }
        if(!file){
            return res.status(400).json({
                status:0,
                message:"Please upload a file"
            })
        }
        const ImageUrl = await uploadToCloudinary(file)
        const product = new Product({title,desc,category,stock,image:ImageUrl})
        await product.save()
        res.status(200).json({
            status:1,
            message:"Product Added Successfully",
            product
        })
    } catch (error) {
        res.status(500).json({
            status:0,
            message:error.message
        })
    }
}

const getAllProduct = async (req,res) => {
    try {
        const product = await Product.find()
        if(!product){
            return res.status(200).json({
                status:1,
                message:"Empty set of data"
            })
        }
        res.status(200).json({
            status:1,
            message:"Products Available",
            product
        })
    } catch (error) {
        res.status(500).json({
            status:0,
            error:error.message
        })
    }
}

const getOneProduct = async (req,res) => {
    try {
        const {id} =req.params
        const product = await Product.findById(id)
        if(!product){
            return res.status(404).json({
                status:0,
                message:"No product available"
            })
        }
        console.log(product)
        res.status(200).json({
            status:1,
            message:`Product available id ${id}`,
            product
        })
    } catch (error) {
        res.status(500).json({
            status:0,
            error:error.message
        })
    }
}

const deleteAllProduct = async (req,res)=>{
    try {
        const delProduct = await Product.deleteMany()
        if(delProduct.deletedCount===0){
            return res.status(200).json({
                status:1,
                message:"No product available to delete"
            })
        }

        res.status(200).json({
            status:1,
            message:`${delProduct.deletedCount} product(s) deleted successfully`,
            delProduct
        })
    } catch (error) {
        res.status(500).json({
            status:0,
            error:error.message
        })
    }
}

const deleteSingleProduct = async (req,res) => {
    try {
        const {id}= req.params
        const product = await Product.findByIdAndDelete(id)
        if(!product){
            return res.status(400).json({
                status:0,
                message:"No product available"
            })
        }
        res.status(200).json({
            status:1,
            message:"Product deleted successfully",
            product
        })
    } catch (error) {
        res.status(500).json({
            status:0,
            error:error.message
        })
    }
}

const updateProduct =async (req,res) => {
    try {
        const {id}=req.params;
        const {title,desc,category,stock} =req.body
        const file = req.file
        const match = await Product.findById(id)
        if(!match){
            return res.status(400).json({
                status:0,
                message:"User does not exist"
            })
        }
        console.log(file)
       let ImageUrl  = match.image
        if(file){
             ImageUrl = await uploadToCloudinary(file)
        }
        const product = await Product.findByIdAndUpdate(id,{title,desc,category,stock,image:ImageUrl},{new:true})

        res.status(200).json({
            status:1,
            message:"Product Updated Successfully",
            product
        })
    } catch (error) {
        
    }
}

module.exports = {addProduct,getAllProduct,getOneProduct,deleteSingleProduct,updateProduct,deleteAllProduct}