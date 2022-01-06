const fs = require('fs')
const osEOL = require('os').EOL

const AllowSingUp = require("../index").NanoXGetAllowSignUp()
const SplashScreen = null
const SplashScreenBackgroundColor = null


function GetCss(){
    let AppColor = require("../index").NanoXGetAppColor()

    let Output = 
`
:root {
    --NanoX-appcolor: ${AppColor};
}
${fs.readFileSync(__dirname + "/NanoX.css", 'utf8')}
`
    return Output
}

function GetJs(){
    let output = fs.readFileSync(__dirname + "/NanoXViewLogin.js", 'utf8')+ osEOL + osEOL
    output += fs.readFileSync(__dirname + "/NanoXViewSignUp.js", 'utf8')+ osEOL + osEOL
    output += fs.readFileSync(__dirname + "/NanoXLoader.js", 'utf8')+ osEOL + osEOL
    output += fs.readFileSync(__dirname + "/Helper/axios.min.js", 'utf8')+ osEOL + osEOL

    output += 
`
let MyNanoXLoader = new NanoXLoader({AllowSignUp:${AllowSingUp}, SplashScreen: ${SplashScreen}, SplashScreenBackgroundColor: ${SplashScreenBackgroundColor}})
function NxLogout(){MyNanoXLoader.LogOut()}
function NxGetToken(){return MyNanoXLoader.GetToken()}

onload = function() {
    MyNanoXLoader.Start()
}
`
    return output
}

module.exports.GetCss = GetCss
module.exports.GetJs = GetJs