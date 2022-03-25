const express = require('express');
const router = express.Router();
const mainController =require("../controller/mainController");


router.post("/createUser",mainController.createUser);
router.post("/login",mainController.login)




module.exports=router;