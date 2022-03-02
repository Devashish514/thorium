const bookModel= require("../model/bookModel");
const authorModel=require("../model/authorModel")



const createBook= async function(req,res){
    let data=req.body
    let dataBook= await bookModel.create(data);
    // console.log(dataBook)
    res.send({msg:dataBook})
}
const getbookData= async function(req,res){
    let bookss= await bookModel.find()
    res.send({books:bookss})
}

// const authorModel = require("../model/authorModel");
// const authoModel=require("../model/authorModel");

const authorCreate= async function(req,res){
    let authorData=req.body;
    let allAuthor= await authorModel.create(authorData);
    res.send({msg:allAuthor})

}
const getBookAuthorById= async function(req,res){     //fetching and comparing data from 2 dB in 1 API
    let authorId= await authorModel.find({author_name:"Chetan Bhagat"}).select({author_id:1,_id:0})
    let bookByid= await bookModel.find({author_id:{$eq:authorId[0].author_id}})
    res.send({id:bookByid})

}

const findAndUpdate= async function(req,res){
    let dataUpdate= await bookModel.findOneAndUpdate(
        {name:"Two States"},
        {$set:{price:100}},
        {new:true}
    ).select({price:1,_id:0})
    let findId= await bookModel.find({name:"Two States"}).select({author_id:1,_id:0})
    let nameByid= await authorModel.find({author_id:{$eq:findId[0].author_id}}).select({author_name:1,_id:0})
    // res.send({id:dataUpdate})
    res.send({author_name:nameByid[0].author_name,dataUpdate}) // Only returns the Author name of the book and updated price.
}

const findBook= async function(req,res){
    let boooks= await bookModel.find({price:{$gt:50,$lt:100}}).select({name:1,author_id:1,_id:0})
    let athrName=await authorModel.find({author_id:{$eq:boooks[0].author_id}}).select({author_name:1,_id:0})
    // res.send({id:athrName})
    res.send({BookName:boooks[0].name,athrName})// returns the name of the book which satisfies the condition and the name of the author
}

module.exports.createBook=createBook;
module.exports.getbookData=getbookData;
module.exports.authorCreate=authorCreate;
module.exports.getBookAuthorById=getBookAuthorById;
module.exports.findAndUpdate=findAndUpdate;
module.exports.findBook=findBook
