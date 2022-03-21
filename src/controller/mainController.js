const collegeModel = require("../model/collegeModel");
const internModel = require("../model/internModel")

const createCollege = async function (req, res) {
    try {
        let data = req.body;
        let result = await collegeModel.create(data);
        res.status(201).send({ data: result });
    } catch (err) {
        res.status(404).send({ msg: err });
    }
}
const createIntern = async function (req, res) {
    try {
        let data = req.body;
        let result = await internModel.create(data);
        res.send({ data: result });
    } catch (err) {
        res.status(404).send({ msg: err });
    }
}

const getCollegeDetails= async function(req,res){
    try{
    let data= req.query.collegeName;
    let result= await collegeModel.findOne({name:data})//.select({_id:1});
    let result2= await internModel.find({collegeId:{$eq:result._id}})
    res.status(201).send({status:true,data:result,interest:result2});
    }catch(err){
        res.status(400).send({msg:err})
    }

}

module.exports.createCollege = createCollege;
module.exports.createIntern = createIntern;
module.exports.getCollegeDetails=getCollegeDetails;