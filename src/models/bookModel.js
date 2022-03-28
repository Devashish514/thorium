const mongoose = require("mongoose");

const ObjectId = mongoose.Schema.Types.ObjectId;

const moment = require("moment");
const reviewModel = require("./reviewModel");

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
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
        unique: true
    },
    category: {
        type: String,
    },
    subcategory: {
        type: String,

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
    isUpdated:{
        type:Boolean,
        default:false
    },
    releasedAt: { type: String, default: moment().format('MMMM Do YYYY, h:mm:ss a') },
    createdAt: { type: String, default: moment().format('MMMM Do YYYY, h:mm:ss a') },
    updatedAt: { type: String, default: moment().format('MMMM Do YYYY, h:mm:ss a') },
    reviewsData: [{ type: Object, default: [] }]
})

module.exports = mongoose.model("bookModel", bookSchema);