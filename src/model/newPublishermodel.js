const mongoose = require("mongoose");

const publishSchema = new mongoose.Schema({
    name: String,
    headQuarter: String
},{timestamps:true})

module.exports=mongoose.model("newPublisher",publishSchema);




