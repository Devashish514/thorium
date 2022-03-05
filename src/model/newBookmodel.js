    const mongoose=require("mongoose");

    const objectId=  mongoose.Schema.Types.ObjectId

const bookSchema= new mongoose.Schema({
    bookName:{
        type:String
    },
    author:{
        type:objectId,
        ref:"newAuthor",
        required:true
    },
    price:Number,
    rating:Number,
    isHardCover:{
        type:Boolean,
        default:false
    },
    publisher:{
        type:objectId,
        ref:"newPublisher",
        required:true
    }
},{timestamps:true})

module.exports= mongoose.model("newBook",bookSchema)





