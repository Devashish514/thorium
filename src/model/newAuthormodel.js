const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
    authorName: String,
    age:Number,
    address:String,
    rating:Number
},{timestamps:true})

module.exports= mongoose.model("newAuthor",authorSchema)



// //Author details using put API.
// const newAuthorSchema= new mongoose.Schema({
//     authorName: String,
//     age:Number,
//     address:String,
//     rating:Number  //adding ratings
// },{timestamps:true})

// module.exports=mongoose.model("newPublisher",newAuthorSchema);