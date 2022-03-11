const express = require('express');
const router = express.Router();
// const CowinController= require("../controllers/cowinController")
const assignmentController= require("../controllers/assignmentController")



router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


router.get("/cowin/states", assignmentController.getStates);
router.get("/cowin/districtsInState/:stateId",assignmentController.getDistricts);
router.get("/cowin/getByPin", assignmentController.getByPin);
router.get("/cowin/getByDistrictId",assignmentController.getByDistrictId);
router.post("/cowin/getOtp", assignmentController.getOtp);
router.get("/getWeather",assignmentController.getWeather);

router.post("/getMeme",assignmentController.meme);


// WRITE A GET API TO GET THE LIST OF ALL THE "vaccination sessions by district id" for any given district id and for any given date



module.exports = router;