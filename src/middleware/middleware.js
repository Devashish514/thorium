const globalMiddleware= function(req,res,next){
    let headerData= req.headers
    if(!headerData.isfreeappuser){
        return console.log("Mandatory requirements not fulfilled")
    }
    next()

}
module.exports.globalMiddleware=globalMiddleware;