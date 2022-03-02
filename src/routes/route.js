const express = require('express');

const router = express.Router();

const mainController= require("../controller/mainController.js");



router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});
router.post('/functionUp',function(req,res){
    res.send("this is new route")     
})
router.post("/bookscreate",mainController.createBook);

router.post("/authorCreate", mainController.authorCreate);

router.get("/bookByauthorid",mainController.getBookAuthorById);

router.get("/id",mainController.findAndUpdate)

router.get("/findBook",mainController.findBook)


module.exports = router;
