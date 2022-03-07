const globalMiddleWare= async function(req,res,next){
    let currentDate= new Date()
    let date= currentDate.getDate()
    let month= currentDate.getMonth()+1
    let year= currentDate.getFullYear()
    let hour= currentDate.getHours()
    let minute= currentDate.getMinutes()
    let seconds= currentDate.getSeconds()

    //ip
    let ip = req.ip  //ip
    let url= req.originalUrl ///api path

    let completedate=year + "-" + month + "-" + date
    let time= hour +":"+minute+":" +seconds

    console.log(completedate,time,ip,url)
    next()
}
module.exports.globalMiddleWare=globalMiddleWare