let moviearr= require("../pr01_getMovies/getmovies")




const express = require('express');

const router = express.Router();

router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});
router.post('/functionUp',function(req,res){
    res.send("this is new route")     
});

router.get("/movies",function(req, res){
    moviearr.movieName()
    
})
// Get movie name by Index Value(movInd)
router.get("/movies/:index",function(req, res){
    const movieName=["3 Idiots"," The matrix"," Interstellar","Wazir"," Famiy-Man"]
    let movInd=req.params.index
    if(movInd>movieName.length-1){
        res.send("No Such Movie")
    }else{
        res.send(movieName[movInd])
    }
})


//

router.get("/films",function(req, res){
    const film=[ {
        id: 1,
        name: "The Shining"
       }, {
        id: 2,
        name: "Incendies"
       }, {
        id: 3,
        name: "Rang de Basanti"
       }, {
        id: 4,
        name: "Finding Demo"
       }]
       res.send(film)
       
})

//
router.get("/films/:filmid",function(req,res){
    const film2=[ {
        id: 1,
        name: "The Shining"
       }, {
        id: 2,
        name: "Incendies"
       }, {
        id: 3,
        name: "Rang de Basanti"
       }, {
        id: 4,
        name: "Finding Demo"
       }]
       let filmId= req.params.filmid
       let found=false;
    for(i=0;i<film2.length;i++){
        if (i<=filmId){
        found=true 
        res.send(film2[i])
        break
        }
    }if (found===false){
        res.send("movie doesn't exist")
    }

})


module.exports = router;
