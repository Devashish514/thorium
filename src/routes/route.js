const express = require('express');
const router = express.Router();
// const UserModel= require("../models/userModel.js")
const mainController= require("../controllers/mainController");
const { globalMiddleware } = require('../middleware/middleware');
// const BookController= require("../controllers/bookController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createUser",globalMiddleware, mainController.createUser);



router.post("/createProduct",globalMiddleware, mainController.createProduct);


router.post("/createOrder",globalMiddleware,mainController.createOrder);

module.exports = router;