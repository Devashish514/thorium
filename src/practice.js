let str = "12345"
// console.log(arr)
// const check1=function check(arr) {
//     for (var element of arr) {
//         if (st2[0] == element) {
//             console.log("yes")
//         } else {
//             console.log("n")
//         }
//     }
// }
// console.log(check1(arr))

// const check2= (element)=>element==str[0];
// console.log(typeof check2("1"))


// console.log(Boolean(undefined))
let st2 = "5"
let arr = str.split("")
const check3 = (arr) => {
    for (var element of arr) {
        if (st2[0] == element) {
            return true
        }
    }
    // return true
}

console.log(check3(arr))