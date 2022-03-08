const mongoose=require("mongoose");

const productModel= new mongoose.Schema({
    name:String,
	category:String,
	price:Number
})

module.exports=mongoose.model("productModel",productModel) // create Model from defined schema