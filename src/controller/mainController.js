const userModel = require("../models/userModel");
const reviewModel = require("../models/reviewModel");
const bookModel = require("../models/bookModel");
const emailValidator = require("email-validator");
const jwt = require("jsonwebtoken");


const createUser = async function (req, res) {
    try {
        let data = req.body;
        // console.log(typeof Object.keys(data).length)
        if (Object.keys(data).length == 0) {
            return res.status(404).send({ status: false, err: "Body Not Found!!" })
        }
        const mobile = Number(data.phone);
        const email = emailValidator.validate(data.email);
        const check = "12345".split("");
        let firstN = data.phone[0];

        if (data) {
            if (!data.name) {
                return res.status(404).send({ staus: false, message: "Name is Required" })
            }
            if (!data.phone) {
                return res.status(400).send({ staus: false, message: "phone is Required" })
            }
            if (isNaN(mobile)) {
                return res.status(400).send({ staus: false, message: "Invalid Phone " })
            }
            if (data.phone) {
                const check3 = (arr) => {
                    for (var element of arr) {
                        if (firstN[0] == element) {
                            return true
                        }
                    }
                }
                if (check3(check)) {
                    return res.status(400).send({ status: false, message: "Invalid Mobile Number" })
                }
            }
            if (!email) {
                return res.send({ status: false, message: "invalid Email" })
            }
            if (!data.password) {
                return res.status(400).send({ status: false, message: "Password Required" })
            }
            if (data.password) {
                if (data.password.length < 8 || data.password.length > 15) {
                    return res.status(400).send({ status: false, message: "Password Format Invalid" })
                }
            }

        }
        let savedData = await userModel.create(data);
        res.status(201).send({ status: true, message: savedData });
    } catch (err) {
        res.status(500).send({ status: false, message: err })
    }
}

const login = async function (req, res) {
    try {
        let data = req.body;
        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, message: "Require login Credentials !" })
        }
        let email = data.email;
        let password = data.password;
        if (!email || !password) {
            return res.status(400).send({ status: false, message: "Email or Password required to log In" });
        }

        let result = await userModel.findOne({ email: email, password: password });
        if (!result) {
            return res.status(400).send({ status: false, message: "Invalid Userid or Password" })

        }
        let payload = { userId: result._id };
        let token = jwt.sign(payload, "SecretKey",{expiresIn:"10h"});
        if (token) {
            res.setHeader("x-auth-token", token);
        }
        res.status(200).send({ status: true, message: "User Logged In successfully..", data: token });
    } catch (err) {
        res.status(500).send({ status: false, message: err })
    }
}

module.exports = { createUser, login };