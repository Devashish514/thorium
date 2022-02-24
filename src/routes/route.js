const express = require('express');

const router = express.Router();

router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});
router.post('/functionUp',function(req,res){
    res.send("this is new route")     
})  

// localhost:3000/query?votingage=18

let people=[
    {
        name: "ST",
        age: 17,
        votingStatus: false
     },
     

    {
        name: "AS",
        age: 25,
        votingStatus: false
     },
     

    {
        name: "DG",
        age: 56,
        votingStatus: false
     },
     

    {
        name: "AP",
        age: 4,
        votingStatus: false
     },
     

    {
        name: "SB",
        age: 14,
        votingStatus: false
     }
     
]
let eligiblePeople=[]
router.post("/query",function(req,res){
    // let person = req.body
    // console.log(person)
    // people.push(person)
    // res.send(people)

    let input =req.query.votingAge
    for(let i=0; i<people.length; i++){
        if(people[i].age>input){
            people[i].votingStatus=true
            eligiblePeople.push(people[i])
        }
    }
    console.log(eligiblePeople)
    res.send({result: eligiblePeople, status: true})
})

module.exports = router;
