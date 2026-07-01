const Product = require("../models/product.model")


//Get All products
const getAllProducts = async(req,res)=>{

    try{
    const products = await Product.find();
      return res.status(200).json(products)
    }catch(error){
      return res.status(404).json(error)

    }
}


// add Product 
const addProduct = async(req,res)=>{
    const { name,
    description,
    price,
   image,
   category,
   stock} = req.body;

   const newProduct = new Product({
    name,description,price,image,category,stock
   })

   await newProduct.save();
   return res.status(201).json(newProduct)
}



//update product
const updateProduct = async(req,res)=>{
const product = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true});
return res.status(200).json(product)
}
//delete product
const deleteProduct = async(req,res)=>{
const deletedProduct = await Product.findByIdAndDelete(req.params.id);
return res.json(deletedProduct);
}

module.exports = {
addProduct,getAllProducts,updateProduct,deleteProduct
}