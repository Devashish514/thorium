const userModel=require("../models/userModel")
const productModel=require("../models/productModel")
const orderModel=require("../models/orderModel")

const createUser= async function(req,res){
    let user= req.body;
    let userData= await userModel.create(user);
    res.send({user:userData})
    
}

const createProduct= async function(req,res){
    let product=req.body;
    let productData= await productModel.create(product); //DB call
    res.send({product:productData})
}

const createOrder= async function(req,res){
    let order= req.body;
    let userId= order.userId
    let productId=order.productId

    //Validations
    if(!userId) return console.log("User not present");
    let user1= await userModel.findById(userId);
    if(!user1) return console.log("invalid use id");

    if(!productId) return console.log("product not present");
    let product1= await productModel.findById(productId);
    if(!product1) return console.log("Invalid product id")

    let isFreeApp = req.isFreeAppUser;
    let orderAmount;

    if (isFreeApp) {
        orderAmount = 0;
    } else if (!isFreeApp && user1.balance >= product1.price) {
        orderAmount = product1.price;
    } else {
        res.send({
            message: "User does not have balance. Order can not be processed",
        });
    }

    orderDetails.amount = orderAmount;
    orderDetails.isFreeAppUser = isFreeApp;
    orderDetails.date = Date();
    let orderCreated = await orderModel.create(orderDetails);
    if (!isFreeApp && user1.balance >= product1.price) {
        await userModel.findOneAndUpdate({ _id: mongoose.Types.ObjectId(orderDetails.userId) }, { balance: user1.balance - product1.price });

    }

    res.send({ data: orderCreated });
};


    

module.exports.createUser=createUser;
module.exports.createProduct=createProduct;
module.exports.createOrder=createOrder
