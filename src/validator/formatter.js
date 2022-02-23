function trim() {
    const message= "   functionUp   "
    console.log(message.trim())
}

function chnageToUpperCase(){
    const message2="this sentence is written in lowecase"
    console.log(message2.toUpperCase())
}

function changeToLowerCase(params) {
    const message3= "THIS IS WRITTEN IN UPPERCASE"
    console.log(message3.toLowerCase())
}

module.exports.trim=trim
module.exports.toUpperCase=chnageToUpperCase
module.exports.toLowerCase=changeToLowerCase
