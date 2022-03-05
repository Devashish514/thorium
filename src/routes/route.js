const express = require('express');

const router = express.Router();
const mainController= require("../controller/controller");

router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});
router.post('/functionUp',function(req,res){
    res.send("this is new route")     
})

router.post("/createAuthor",mainController.createAuthor);
router.post("/createPublish",mainController.createPublish);

router.post("/createBook",mainController.createBook);

router.get("/getBookData",mainController.getBookdata);



router.put("/books",mainController.updatCover)
router.put("/updateRating",mainController.ratings)

module.exports = router;


