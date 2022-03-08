const mongoose=require("mongoose");

const userModel= new mongoose.Schema({
    name: String,
	balance:{
        type:Number,
        default:100
    }, // Default balance at user registration is 100
	address:String,
	age: Number,
 	gender:{
         type:String,
         enum:["male","female","others"]
     }, // Allowed values are - “male”, “female”, “other”
	isFreeAppUser:{
        type:Boolean,
        default:false
    } // Default false value.
})
module.exports=mongoose.model("userModel",userModel);