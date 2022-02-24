const express = require('express');

const router = express.Router();

let playersArr=[]

router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});
router.post('/functionUp',function(req,res){
    res.send("this is new route")     
})

// problem no. 1

router.post("/players",function(req, res){
    let player=req.body
    // console.log(player)
    let name=player.name
    for(let i=0; i<playersArr.length;i++){
        if(playersArr[i].name==name){
            return res.send("Player with this name already existed...... so cannot allow duplicate.")
        }
    }
    playersArr.push(player)
    res.send(playersArr)
})

// problem no. 2

router.post('/players/:playerName/bookings/:bookingId', function(req, res) {
    let name = req.params.playerName
    let isPlayerPresent = false

    for (let i = 0; i < playersArr.length; i++) {
        if (playersArr[i].name == name) {
            isPlayerPresent = true
        }
    }
    if (!isPlayerPresent) {
        return res.send('Player not present')
    }

    let booking = req.body
    let playerbookingId = req.params.bookingId
    for (let i = 0; i < playersArr.length; i++) {
        if (playersArr[i].name == name) {
            for (let j = 0; j < players[i].bookings.length; j++) {
                if (playersArr[i].bookings[j].bookingNumber == playerbookingId) {
                    return res.send('Booking with this id is already present')
                }
            }
            playersArr[i].bookings.push(booking)
        }
    }
    res.send(players)
}),


module.exports = router;
