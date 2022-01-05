const fs = require('fs')
const osEOL = require('os').EOL

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
    let output = fs.readFileSync(__dirname + "/NanoXLoader.js", 'utf8')+ osEOL + osEOL

    output += 
`
let MyNanoXLoader = new NanoXLoader()
onload = function() {
    MyNanoXLoader.Start()
}
`
    return output
}

module.exports.GetCss = GetCss
module.exports.GetJs = GetJs