const express = require('express');

const router = express.Router();

const bookController= require("../controller/Bookcontroller")


router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});
router.post('/functionUp',function(req,res){
    res.send("this is new route")     
})

router.post("/book", bookController.createBook)


router.get("/getbook", bookController.getbooks)


module.exports = router;
// adding this comment for no reason