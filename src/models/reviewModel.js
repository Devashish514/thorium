const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId

const reviewSchema = new mongoose.Schema({
    bookId: {
        type: ObjectId,
        required: true,
        ref: "bookModel"
    },
    reviewedBy: {
        type: String,
        required: true,
        default: "Guest",
        value: String
    },
    reviewedAt: {
        // Date: Date.now(),
        // required: true
    },
    rating: {
        type: Number,
        required: true
    },
    review: { String },
  isDeleted: { Boolean, default: false }
},{timestamps:true}) 

module.exports= mongoose.model("reviewModel",reviewSchema);