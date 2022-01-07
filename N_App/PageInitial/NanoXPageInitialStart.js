const AllowSingUp = require("../../index").NanoXGetAllowSignUp()
const SplashScreen = null
const SplashScreenBackgroundColor = null
const AppColor = require("../../index").NanoXGetAppColor()

function GetJs(){
    let output = 
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

function GetCss(){
    let Output = 
`
:root {
    --NanoX-appcolor: ${AppColor};
}
`
    return Output
}

module.exports.GetJs = GetJs
module.exports.GetCss = GetCss