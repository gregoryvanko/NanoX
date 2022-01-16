const fs = require('fs')
const osEOL = require('os').EOL

function GetCss(AdminApp = false){
    let Output = fs.readFileSync(__dirname + "/PageApp/NanoX.css", 'utf8')+ osEOL + osEOL

    Output += GetCssOfApp(AdminApp)

    if (Output == ""){Output = null}
    return Output
}

function GetJs(AdminApp = false){
    let Output = ""
    Output += fs.readFileSync(__dirname + "/PageApp/NanoXBuild.js", 'utf8')+ osEOL + osEOL
    Output += fs.readFileSync(__dirname + "/PageApp/NanoXCore.js", 'utf8')+ osEOL + osEOL

    Output += require("./PageApp/NanoXPageAppStart").GetJsStart()

    Output += GetJsOfApp(AdminApp)
    
    Output += require("./PageApp/NanoXPageAppStart").GetJsEnd()

    if (Output == ""){Output = null}
    return Output
}

function GetJsOfApp(AdminApp = false){
    let NanoXAppOption = require("../../index").NanoXGetNanoXAppOption()

    let Output = ""
    // Load du folder common
    if (NanoXAppOption.AppFolderCommon != null){
        Output += LoadAppFilesFromFolder(NanoXAppOption.AppFolderCommon, "Js")
    }
    // Load du folder client
    Output += LoadAppFilesFromFolder(NanoXAppOption.AppFolderClient, "Js")

    // Load du folderAdmin
    if (AdminApp){
        Output += LoadAppFilesFromFolder(NanoXAppOption.AppFolderAdmin, "Js")
    }
    return Output
}

function GetCssOfApp(AdminApp = false){
    let Output = ""
    // Load du folder common
    if (NanoXAppOption.AppFolderCommon != null){
        Output += LoadAppFilesFromFolder(NanoXAppOption.AppFolderCommon, "Css")
    }
    // Load du folder client
    Output += LoadAppFilesFromFolder(NanoXAppOption.AppFolderClient, "Css")

    // Load du folderAdmin
    if (AdminApp){
        Output += LoadAppFilesFromFolder(NanoXAppOption.AppFolderAdmin, "Css")
    }
    return Output
}

function LoadAppFilesFromFolder(Folder, Type){
    let Output = ""
    return Output
}

module.exports.GetCss = GetCss
module.exports.GetJs = GetJs