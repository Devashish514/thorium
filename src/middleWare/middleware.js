const jwt = require("jsonwebtoken");

const authorize = async function (req, res,next) {
    try {
        let token = req.headers["x-auth-token"];
        if (!token) {
            return res.status(400).send({ status: false, message: "token required to be set..!" });
        } else {
            let validateUser = jwt.verify(token, "SecretKey");
            if (!validateUser) {
                return res.status(400).send({ status: false, message: "Invalid Token" });
            } else {
                req.validate = validateUser.userId; // this validate stores userId of the authorize user in request object
               // console.log(req)  // gives everything in request object 
                next();
            }
        }
    } catch (err) {
        console.log(err)
        res.status(500).send({ status: false, err });
    }
}

module.exports = { authorize };