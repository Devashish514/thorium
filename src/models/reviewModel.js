const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const moment = require("moment");

const reviewSchema = new mongoose.Schema({
    bookId: {
        type: ObjectId,
        required: true,
        ref: "bookModel"
    },
    reviewedBy: {
        type: String,
        default: "Guest"
    },
    reviewedAt: {
        type: String,
        default: moment().format('MMMM Do YYYY, h:mm:ss a')
    },
    rating: {
        type: Number,
        required: true
    },
    review: { type: String },
    isUpdated: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    createdAt: { type: String, default: moment().format('MMMM Do YYYY, h:mm:ss a') },
    updatedAt: { type: String, default: moment().format('MMMM Do YYYY, h:mm:ss a') },
});

module.exports = mongoose.model("reviewModel", reviewSchema);