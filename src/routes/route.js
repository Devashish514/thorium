const express = require('express');
const { globalMiddleWare } = require('../middleWare/middleWare');

const router = express.Router();

router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});
router.post('/tes1',function(req,res){
    res.send("this is new route")     
})

module.exports = router;
