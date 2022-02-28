const bookModel=require("../model/model.js");

const createBook= async function( req,res){
    let data =req.body
    let savedData= await bookModel.create(data);
    res.send({msg:savedData})
}

const getbooks= async function(req,res){
    let allBooks= await bookModel.find();
    res.send({msg:allBooks})
}

module.exports.createBook=createBook;
module.exports.getbooks=getbooks