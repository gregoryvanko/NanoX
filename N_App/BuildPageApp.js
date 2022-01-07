const fs = require('fs')
const osEOL = require('os').EOL

function GetCss(AdminApp = false){
    let Output = require("./PageApp/NanoXPageAppStart").GetCss()

    if (Output == ""){Output = null}
    return Output
}

function GetJs(AdminApp = false){
    let Output = ""
    Output += fs.readFileSync(__dirname + "/PageApp/NanoXCore.js", 'utf8')+ osEOL + osEOL

    if(AdminApp){
        Output += `console.log("admin page"); `
    }

    Output += require("./PageApp/NanoXPageAppStart").GetJs()

    if (Output == ""){Output = null}
    return Output
}

module.exports.GetCss = GetCss
module.exports.GetJs = GetJs