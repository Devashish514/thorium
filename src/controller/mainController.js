const collegeModel = require("../model/collegeModel");
const internModel = require("../model/internModel")
const emailValidator = require("email-validator");

const createCollege = async function (req, res) {
    try {
        let data = req.body;
        // console.log(data.name)
        // const name=data.name.split(" ").join("")
        // console.log(name)
        if (data) {
            if (data.name) {
                const name=data.name.split(" ").join("");
                data.name=name;
                // data.save()
            }else{
                return res.status(400).send({status:false,error:"Name is required"})
            }
            if (!data.fullName) {
                return res.send({status:false,error:"Fullname required"})
            }
            if (!data.logoLink) {
                return res.status(400).send({ status: false, error: "LogoLink is required" });
            }
        }
        else {
            return res.status(400).send({ status: false, msg: "No data found" })
        }
        let result = await collegeModel.create(data);
        res.status(201).send({ data: result });
    }
    catch (err) {
        res.status(404).send({ aag: err });
    }
}
const createIntern = async function (req, res) {
    try {
        let data = req.body;
        if(data){
            if(!data.name){
                return res.send({msg:"Name is Required!!"})
            }
            if(!data.email){
                return res.status(400).send({msg:"email is required"})
            }
            if(!emailValidator.validate(data.email)){
                return res.status(404).send({status:false,msg:"Inavlid email"})
            }
            if(!data.mobile){
                return res.status(400).send({msg:"mobile is required"})
            }
            if(!(data.mobile.length ==10)){
                return res.status(400).send({status:false,msg:"Invalid Mobile No."})
            }
            if(!data.collegeId){
                return res.status(400).send({msg:"CollegeId required !!"})
            }
            let findCollege= await collegeModel.findById(data.collegeId);
            if(!findCollege){
                return res.status(400).send({msg:"Invalid CollegeId"})
            }
        }
        let result = await internModel.create(data);
        res.send({ data: result });
    } catch (err) {
        res.status(500).send({ msg: err });
    }
}

const getCollegeDetails = async function (req, res) {
    try {
        let data = req.query.collegeName;
        if(!data){
            return res.status(400).send({status:false,msg:"CollegeName is Required!!"})
        }
        if(data){
            const collegename= data.split(" ").join("");
            data=collegename
        }
        let findData= await collegeModel.findOne({name:data});
        if(!findData){
            return res.status(400).send({status:false,msg:"CollegeName is Invalid"})
        }
        if(data && findData){

        
        let result = await collegeModel.findOne({ name: data })//.select({_id:1});
        let result2 = await internModel.find({ collegeId: { $eq: result._id } });
        res.status(201).send({ status: true, data:result,interest:result2 });
        }
    } catch (err) {
        res.status(400).send({ msg: err })
    }

}

module.exports.createCollege = createCollege;
module.exports.createIntern = createIntern;
module.exports.getCollegeDetails = getCollegeDetails;