const express = require('express');
const router = express.Router();
const mainController= require("../controller/mainController");

router.post("/createCollege",mainController.createCollege);
router.post("/createIntern",mainController.createIntern);

router.get("/getCollegeDetails",mainController.getCollegeDetails)




module.exports=router;