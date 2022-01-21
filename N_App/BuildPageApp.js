const fs = require('fs')
const path = require("path")
const osEOL = require('os').EOL

function GetCss(AdminApp = false){
    let Output = fs.readFileSync(__dirname + "/PageApp/NanoX.css", 'utf8')+ osEOL + osEOL

    Output += GetCssOfApp(AdminApp)

    if (Output == ""){Output = null}
    return Output
}

function GetJs(AdminApp = false){
    let NanoXAppOption = require("../index").NanoXGetNanoXAppOption()

    let Output = ""
    Output += fs.readFileSync(__dirname + "/PageApp/NanoXBuild.js", 'utf8')+ osEOL + osEOL
    Output += fs.readFileSync(__dirname + "/PageApp/NanoXCoreUserData.js", 'utf8')+ osEOL + osEOL
    Output += fs.readFileSync(__dirname + "/PageApp/NanoXCoreMenuBar.js", 'utf8')+ osEOL + osEOL
    Output += fs.readFileSync(__dirname + "/PageApp/NanoXCoreModuleApp.js", 'utf8')+ osEOL + osEOL
    Output += fs.readFileSync(__dirname + "/PageApp/NanoXCore.js", 'utf8')+ osEOL + osEOL

    Output += require("./PageApp/NanoXPageAppStart").GetJsStart()

    // Si on n'utilise pas le mode module, on execute les start app avant d'avoir loadé les fichiers client
    if (!NanoXAppOption.UseAppModule){
        Output += require("./PageApp/NanoXPageAppStart").GetJsEnd()
    }

    Output += GetJsOfApp(AdminApp)
    
    // Si on utilise le mode module, on execute les start app après avoir loadé les fichiers client
    if (NanoXAppOption.UseAppModule){
        Output += require("./PageApp/NanoXPageAppStart").GetJsEnd()
    }

    if (Output == ""){Output = null}
    return Output
}

function GetJsOfApp(AdminApp = false){
    let NanoXAppOption = require("../index").NanoXGetNanoXAppOption()

    let Output = ""
    // Load du folder client
    if (NanoXAppOption.AppFolderClient != null){
        Output += LoadAppFilesFromFolder(NanoXAppOption.AppFolderClient, ".js")
    }
    // Load du folderAdmin
    if (AdminApp){
        if (NanoXAppOption.AppFolderAdmin != null){
            Output += LoadAppFilesFromFolder(NanoXAppOption.AppFolderAdmin, ".js")
        }
    }
    return Output
}

function GetCssOfApp(AdminApp = false){
    let NanoXAppOption = require("../index").NanoXGetNanoXAppOption()

    let Output = ""
    // Load du folder client
    if (NanoXAppOption.AppFolderClient != null){
        Output += LoadAppFilesFromFolder(NanoXAppOption.AppFolderClient, ".css")
    }
    // Load du folderAdmin
    if (AdminApp){
        if (NanoXAppOption.AppFolderAdmin != null){
            Output += LoadAppFilesFromFolder(NanoXAppOption.AppFolderAdmin, ".css")
        }
    }
    return Output
}

function LoadAppFilesFromFolder(Folder, Type){
    let LogError = require('../index').NanoXLogError

    let Output = ""
    if(fs.existsSync(Folder)){
        // Lister tous les fichier
        let listeOfFiles = GetListeOfFiles(Folder)
        listeOfFiles.forEach(element => {
            if (path.extname(element) == Type){
                Output += fs.readFileSync(element, 'utf8')+ osEOL + osEOL
            }
        });
    } else {
        LogError(`Folder ${Folder} not found`)
    }
    return Output
}

function GetListeOfFiles(dirPath, arrayOfFiles){
    files = fs.readdirSync(dirPath)

    arrayOfFiles = arrayOfFiles || []
  
    files.forEach(function(file) {
      if (fs.statSync(dirPath + "/" + file).isDirectory()) {
        arrayOfFiles = GetListeOfFiles(dirPath + "/" + file, arrayOfFiles)
      } else {
        arrayOfFiles.push(path.join(dirPath, "/", file))
      }
    })
    return arrayOfFiles
}

module.exports.GetCss = GetCss
module.exports.GetJs = GetJs