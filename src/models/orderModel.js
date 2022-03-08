const mongoose = require("mongoose")

const objectId = mongoose.Schema.Types.ObjectId

const orderModel = new mongoose.Schema({
    userId: {
        type: objectId,
        ref:"userModel"
    },
    productId: {
        type: objectId,
        ref:"productModel"
    },
    amount: Number,
    isFreeAppUser: Boolean,
    date: String
})

module.exports= mongoose.model("orderModel",orderModel);