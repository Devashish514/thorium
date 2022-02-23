let logger=require('../logger/logger')
let helper=require('../util/helper')
let formatter=require('../validator/formatter')
let _ = require('../lodash/lodash')


const express = require('express');


const router = express.Router();


router.get('/test-me', function (req, res) {
    logger.Myapplication()
    console.log(logger.url)
    helper.tDate()
    helper.printMonth()
    helper.batchInfo()
    formatter.trim()
    formatter.toUpperCase()
    formatter.toLowerCase()

    res.send("Welcome to my application. I am Devashish Goswami and I'am a part of FunctionUp Thorium cohort."   )
});
router.get('/hello', function(req, res){
    _.chunkarr()
    _.fromArr()
    _.tailArr()
    _.unionArr()
    res.send("This is Hello Route")
})


module.exports = router;
