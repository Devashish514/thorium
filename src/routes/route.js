const express = require('express');

const router = express.Router();

const bookController= require("../controller/Bookcontroller.js")


router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});
router.post('/functionUp',function(req,res){
    res.send("this is new route")     
})

router.post("/books1", bookController.createBook );

router.get("/bookdata",bookController.bookList);

router.get("/bookbyear",bookController.getBooksInYear);

router.post("/bookbyinputbody", bookController.particularBooks)

router.get("/getBookinr",bookController.getXINRBook);

router.get("/random",bookController.getRandom);


module.exports = router;
