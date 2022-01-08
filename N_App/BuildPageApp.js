const fs = require('fs')
const osEOL = require('os').EOL

function GetCss(AdminApp = false){
    let Output = require("./PageApp/NanoXPageAppStart").GetCss()
    Output += fs.readFileSync(__dirname + "/PageApp/NanoX.css", 'utf8')+ osEOL + osEOL

    if (Output == ""){Output = null}
    return Output
}

function GetJs(AdminApp = false){
    let Output = ""
    Output += fs.readFileSync(__dirname + "/PageApp/NanoXBuild.js", 'utf8')+ osEOL + osEOL
    Output += fs.readFileSync(__dirname + "/PageApp/NanoXCore.js", 'utf8')+ osEOL + osEOL

    Output += require("./PageApp/NanoXPageAppStart").GetJsStart()
    
    Output += require("./PageApp/NanoXPageAppStart").GetJsEnd()

    if (Output == ""){Output = null}
    return Output
}

module.exports.GetCss = GetCss
module.exports.GetJs = GetJs