function printDate(){
    let date= new Date()
    console.log("Date: ", date.getDate())
}

function printMonth(){
    let month= new Date()
    console.log("Month: ", month.getMonth()+1)
}

function batchInfo() {
    console.log("Thorium W4D2, the topic being taught today is module sysytems in node.js")
    
}
module.exports.tDate=printDate
module.exports.printMonth=printMonth
module.exports.batchInfo=batchInfo