const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    excerpt: {
        type: String,
        require: true
    },
    userId: {
        type: ObjectId,
        required: true,
        ref: "userModel"
    },
    ISBN: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true
    },
    subcategory: {
        type: String,
        require: true
    },
    reviews: {
        type: Number,
        default: 0,
    },
    // deletedAt: Date.now(),
    isDeleted: {
        type: Boolean,
        default: false
    },
    releasedAt: {
        // value: Date.now(),
        // required: true

    },
    // createdAt: { timestamp: true },
    // updatedAt: { timestamp: true },
},{timestamps:true})

module.exports= mongoose.model("bookModel",bookSchema);