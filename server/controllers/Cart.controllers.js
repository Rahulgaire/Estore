const Cart = require("../models/Cart.models");

const addToCart = async (req, res) => {
  try {
    // const {products,userDetails} = req.body
    const userId = req.auth.id;
    // const newOrder = await new Cart({products,userDetails,userId})
    // await newOrder.save()
    const { productId } = req.body;
    // const user = await
    // user.products= user.products.map(item => item.productId === product._id ? item.quantity+=1 : )
    // if (!product) {
    //   return res.status(400).json({
    //     status: 0,
    //     message: "Please add valid details",
    //   });
    // } else {
    //   if (product._id == Cart.products._id) {
    //     quantity += 1;
    //   } else {
    //     quantity;
    //   }
    // }

    let cart = await Cart.findOne({ userId });
    console.log(cart);
    if (!cart) {
      cart = new Cart({
        userId,
        products: [{ productId, quantity: 1 }],
      }); ///creating a new cart
    } else {
      const existingData = cart.products.find(
        (item) => item.productId.toString() === productId
      );
      if (existingData) {
        existingData.quantity += 1;
      } else {
        cart.products.push({ productId, quantity: 1 }); ///adding new product into the cart
      }
    }
    await cart.save();
    return res.status(200).json({
      status: 1,
      message: "Product Added to cart successfully",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: error.message,
    });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.auth.id;

    const user = await Cart.findOne({ userId });
    console.log(user);
    const filteredproducts = user.products.filter(
      (item) => item.productId.toString() !== productId
    );
    const newCart = await Cart.findByIdAndUpdate(
      user._id,
      { products: filteredproducts },
      { new: true }
    );
    res.status(200).json({
      status: 1,
      message: "Product removed from cart",
      newCart,
    });
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: error.message,
    });
  }
};
  
const updateQuantity = async (req, res) => {
  try {
    const userId = req.auth.id;
    const {productId,action} = req.body;    
    const cart = await Cart.findOne({userId})
    
        if(!productId || !["increase","decrease"].includes(action.toLowerCase())){
                return res.status(400).json({
                    status:0,
                    message:"Invalid productId or Invalid Action"
                })
        }

    if(!cart){
        return res.status(400).json({
            status:0,
            message:"No such cart is found"
        })
    }
    const filteredProduct = cart.products.find(item => item.productId.toString() ===  productId)
    if(!filteredProduct){
        return res.status(400).json({
            status:0,
            message:"Product not found in cart"
        })
    }
     if(action.toLowerCase()==="increase") { 
         filteredProduct.quantity +=1   
     }
     else if(action.toLowerCase()==="decrease") { 

        if(filteredProduct.quantity>1){
         filteredProduct.quantity -=1 
     }}
     else{
            cart.products = cart.products.filter((item)=>item.productId.toString() !== productId)
     }
     await cart.save()
     res.status(200).json({
        status:1,
        message:`Cart ${action}  successfully`,
        cart
     })
  } catch (error) {
     res.status(500).json({
      status: 0,
      message: error.message,
    });
  }
};

const getCartDetails = async (req,res) => {
    try {
        const userId  = req.auth.id;
        const cart = await Cart.findOne({userId}).populate('products.productId')   //populate return full collection of the product available at that id
        if(!cart || cart.products.length ===0){
            return res.status(200).json({
                status:1,
                message:"Cart is Empty",
                cart:{
                    userId,
                    products:[]
                }
            })
        }
        res.status(200).json({
            status:1,
            message:"Products available in the cart",
            cart
        })
    } catch (error) {
        res.status(500).json({
            status:0,
            message:error.message
        })
    }
}

module.exports ={addToCart,removeFromCart,updateQuantity,getCartDetails}