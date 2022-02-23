const _=require("lodash")

function chunkarr(){
const arr=[
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]
console.log(_.chunk(arr,3))
}
function tailArr(){
    const arr1=[1,3,5,7,9,11,13,15,17,19]
    console.log(_.tail(arr1))
}
function unionArr(){
    let arr3= _.union(
        [23,54,34]
        [45,23,56]
        [56,45,67]
        [67,65,89]
        [98,65,89]
    );
    console.log(arr3)
}

function fromArr(){
    let arr4=[["car","Mercedes"],["fruits","Mango"],["country","India"]]
    console.log(_.fromPairs(arr4))
}

module.exports.chunkarr=chunkarr
module.exports.tailArr=tailArr
module.exports.unionArr=unionArr
module.exports.fromArr=fromArr