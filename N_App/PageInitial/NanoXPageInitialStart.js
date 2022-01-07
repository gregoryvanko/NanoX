const AllowSingUp = require("../../index").NanoXGetAllowSignUp()
const AppColor = require("../../index").NanoXGetAppColor()
const SplashScreenData = require("../../index").NanoXGetSplashScreenData()

function GetJs(){
    let output = 
`
let MyNanoXLoader = new NanoXLoader({AllowSignUp:${AllowSingUp}, SplashScreen: '${SplashScreenData.SplashScreen}', SplashScreenBackgroundColor: '${SplashScreenData.SplashScreenBackgroundColor}'})
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