const fs = require('fs')
const osEOL = require('os').EOL


function GetCss(){
    let Output = require("./PageInitial/NanoXPageInitialStart").GetCss()
    Output += fs.readFileSync(__dirname + "/PageInitial/NanoX.css", 'utf8')
    return Output
}

function GetJs(){
    let Output = fs.readFileSync(__dirname + "/PageInitial/NanoXViewLogin.js", 'utf8')+ osEOL + osEOL
    Output += fs.readFileSync(__dirname + "/PageInitial/NanoXViewSignUp.js", 'utf8')+ osEOL + osEOL
    Output += fs.readFileSync(__dirname + "/PageInitial/NanoXLoader.js", 'utf8')+ osEOL + osEOL
    Output += fs.readFileSync(__dirname + "/Helper/axios.min.js", 'utf8')+ osEOL + osEOL
    Output += require("./PageInitial/NanoXPageInitialStart").GetJs()
    return Output
}

module.exports.GetCss = GetCss
module.exports.GetJs = GetJs