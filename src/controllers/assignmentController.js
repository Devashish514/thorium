const axios = require("axios");

// //Servers
// https://cdn-api.co-vin.in/api - Production Server
const getStates = async function (req, res) {
    try {
        let result = await axios.get("https://cdn-api.co-vin.in/api/v2/admin/location/states");
        let states = result.data;
        res.status(200).send(states)
    }
    catch (err) {
        console.log(err);
        res.send({ error: err })
    }
}

const getDistricts = async function (req, res) {
    try {
        // Better way to write Axios....
        let id = req.params.stateId;
        let options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${id}`
        }
        let result = await axios(options);
        let districts = result.data;
        // console.log(result);
        res.status(200).send(districts)
    }
    catch (err) {
        console.log(err);
        req.status(500).send(err)
    }
}

const getByPin = async function (req, res) {
    try {
        let pin = req.query.pincode;
        let date = req.query.date;
        let options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pin}&date=${date}`
        }
        let result = await axios(options);
        let data = result.data;
        res.status(200).send({ msg: data })
    }
    catch (err) {
        // console.log(err);
        res.status(500).send(err)
    }
}
// Assignment Solution No. !
const getByDistrictId = async function (req, res) {
    try {
        let districtId = req.query.district_id;
        let date = req.query.date;

        let options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${districtId}&date=${date}`
        }
        let result = await axios(options);
        let data = result.data;
        res.status(200).send({ msg: data })
    }
    catch (err) {
        res.status(400).send(err)
    }
}

//Generate OTP
const getOtp = async function (req, res) {
    try {
        let mobile = req.body;

        let options = {
            method: "post",
            url: "https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP",
            // data:mobile
        }
        let result = await axios(options);
        let otp = result.data;
        res.status(200).send({ msg: otp })
    }
    catch (err) {
        res.status(400).send({ msg: err })
    }
}
//Assignment Solution no. @
const getWeather = async function (req, res) {
    try {
        let cities = ["Bengaluru", "Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"];
        const cityObject = [];
        for (let i = 0; i < cities.length; i++) {
            let city={city:cities[i]}   // creating Object --> {city:"Banglore"}
            let options = {
                method: "get",
                url: `http://api.openweathermap.org/data/2.5/weather?q=${cities[i]}&appid=d9c961ed068e52d532b8865ab347763d`
            }
            let result = await axios(options);
            
            let temperature = result.data.main.temp;
            city.temp=temperature    // adding a key "temp" to a object city and set value "temperature"

            cityObject.push(city) 
            // pushing the object with "city" key and "temp" key in empty "cityObject" array.
        }
        let sortedCityArr= cityObject.sort((a,b)=>(a.temp-b.temp))
        res.send(sortedCityArr)
}
    catch (err) {
        res.status(400).send(err)
    }

}

//Assignment Solution No. #
const meme=async function(req,res){
    let template_id=req.query.template_id;
    let text0=req.query.text0;
    let text1=req.query.text1;
    let username=req.query.username;
    let password=req.query.password;

    let options={
        method:"post",
        url:`https://api.imgflip.com/caption_image?template_id=${template_id}&text0=${text0}&text1=${text1}&username=${username}&password=${password}`
    }
    let result= await axios(options);
    let memeData= result.data;
    res.send({data:memeData})

}

module.exports.getStates = getStates;
module.exports.getDistricts = getDistricts;
module.exports.getByPin = getByPin;
module.exports.getByDistrictId = getByDistrictId;
module.exports.getOtp = getOtp;
module.exports.getWeather = getWeather;
module.exports.meme=meme;


