const bookModel= require("../model/newBookmodel")
const authorModel= require("../model/newAuthormodel")
// const authorModel= require("../model/newAuthormodel")
const publisherModel= require("../model/newPublishermodel")

const createBook= async function(req,res){
    let bookData =req.body;
    let authorId= bookData.author;
    let publisherId= bookData.publisher;

    if(!authorId) return res.send("Author details not present:Required");
    let author= await authorModel.findById(authorId);

    if(!author)return res.send("Invalid Author iD")

    if(!publisherId) return res.send("Publisher details not present");

    let publisher= await publisherModel.findById(publisherId);

    if(!publisher) return res.send("publisher with this id is not present");

    let allBooks= await bookModel.create(bookData);  // db call
    res.send(allBooks)
}

const createAuthor= async function(req,res){
    let authorData=req.body
    let allAuthor= await authorModel.create(authorData);
    res.send(allAuthor)
}
const createPublish= async function(req,res){
    let publishData= req.body;
    let allPublisher= await publisherModel.create(publishData)
    res.send(allPublisher)
}

const getBookdata=async function(req,res){
    let allBookData= await bookModel.find().populate("publisher author");
    res.send({data:allBookData})
}

// 5(a)
const updatCover= async function(req,res){
    let hardcovered= await publisherModel.find({name:{$in:["Penguin","Harper Collins"]}}).select({_id:1})
    // res.send({data:hardcovered})
    for(let i=0;i<hardcovered.length;i++){
    let ishardco= await bookModel.updateMany(
    {publisher:{$eq:hardcovered[i]._id}},
    {$set:{isHardCover:true}},
    {new:true}

    )
    res.send(ishardco)
}
}

//5(b)
const ratings= async function(req,res){
    let rating1= await authorModel.find( {rating:{$gt:3.5}}).select({_id:1})
    for(let j=0;j<rating1.length;j++){
    let updatePrice= await bookModel.updateMany(
        {author:{$eq:rating1[j]._id}},
        {$inc:{price:10}})
    res.send(updatePrice)
}
}

module.exports.ratings=ratings;
module.exports.createBook=createBook;
module.exports.createAuthor=createAuthor;
module.exports.createPublish=createPublish;
module.exports.getBookdata=getBookdata;
module.exports.updatCover=updatCover

// module.exports.newCreateAuthor=newCreateAuthor
