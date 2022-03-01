const bookmodel = require("../models/bookmodel.js");
// const bookModel= require("../models/bookmodel.js")

const createBook= async function(req,res){
    let data = req.body;
    let savedData= await bookModel.create(data);
    // console.log({msg:savedData})
    res.send({msg:savedData})
}
 const bookList= async function(req,res){
     let bookdata= await bookModel.find().select({authorName:1,bookName:1,_id:0}); // This will give us list of all books with author name and bookname.
     let bookdata1= await bookModel.find().select({authorName:1,bookName:1,_id:0}).count(); // This will give us count of the elements or Data. which is 11 here....!!!
     res.send({msg:bookdata,bookdata1})
 }
// localhost:3000/bookinyear?yearof=2022
 const getBooksInYear= async function(req,res){
     let yearby= req.query.yearof;
     let bookYear= await bookmodel.find({year:yearby})
     res.send({msg:bookYear})
 }

 const particularBooks= async function(req,res){
     let bookByprop= req.body;
     let partBook= await bookmodel.find({totalPages:{$gt:bookByprop.page}})
     let partBook1= await bookmodel.find({totalPages:{$gt:bookByprop.year}})
     res.send({msg:partBook,partBook1})
 }

 const getXINRBook= async function(req,res){
    let bookprice= await bookmodel.find({"price.indianPrice":{$in:["Rs.80","Rs.2654","Rs.500"]}});
    res.send({msg:bookprice})
 }

 const getRandom= async function(req,res){
     let random= await bookmodel.find({$or:[{stockAvailable:true},{totalPages:{$gt:500}}]});
     res.send({msg:random})

 }

module.exports.createBook=createBook;
module.exports.bookList=bookList;
module.exports.getBooksInYear=getBooksInYear;
module.exports.particularBooks=particularBooks;
module.exports.getXINRBook=getXINRBook;
module.exports.getRandom=getRandom;
