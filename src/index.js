const express = require('express');
var bodyParser = require('body-parser');

const route = require('./routes/route.js');

const mongoose= require("mongoose");
const { globalMiddleWare } = require('./middleWare/middleWare.js');

const app = express();

mongoose.connect("mongodb+srv://functionup-cohort:G0Loxqc9wFEGyEeJ@cluster0.rzotr.mongodb.net/DevashishTH-DB?retryWrites=true&w=majority",{
    useNewUrlParser:true 
})
.then( ()=> console.log("MongoDB Connected"))
.catch(err => console.log(err))


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(globalMiddleWare)  // making it global middleware

app.use('/', route);

app.listen(process.env.PORT || 3000, function() {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
