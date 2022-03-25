const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        enum: ["Mr", "Mrs", "Miss"]
    },
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        street: { type: String },
        city: { type:String },
        pincode: { type:String }
    },
    // createdAt: { timestamp: true },
    // updatedAt: { timestamp: true }
},{timestamps:true})

module.exports = mongoose.model("userModel", userSchema);