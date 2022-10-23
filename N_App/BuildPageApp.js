const fs = require('fs')
const path = require("path")
const osEOL = require('os').EOL

function GetCss(AdminApp = false){
    let Output = fs.readFileSync(__dirname + "/PageApp/NanoX.css", 'utf8')+ osEOL + osEOL
    Output += fs.readFileSync(__dirname + "/Helper/Autocomplete.css", 'utf8')+ osEOL + osEOL
    Output += fs.readFileSync(__dirname + "/ModuleAdmin/Admin.css", 'utf8')+ osEOL + osEOL

    Output += GetCssOfApp(AdminApp)

    if (Output == ""){Output = null}
    return Output
}

function GetJs(AdminApp = false){
    let NanoXAppOption = require("../index").NanoXGetNanoXAppOption()

    let Output = ""
    // Nonox App
    Output += fs.readFileSync(__dirname + "/PageApp/NanoXBuild.js", 'utf8')+ osEOL + osEOL
    Output += fs.readFileSync(__dirname + "/PageApp/NanoXCoreUserData.js", 'utf8')+ osEOL + osEOL
    Output += fs.readFileSync(__dirname + "/PageApp/NanoXCoreMenuBar.js", 'utf8')+ osEOL + osEOL
    Output += fs.readFileSync(__dirname + "/PageApp/NanoXCoreModuleApp.js", 'utf8')+ osEOL + osEOL
    Output += fs.readFileSync(__dirname + "/PageApp/NanoXCore.js", 'utf8')+ osEOL + osEOL
    // Helper
    Output += fs.readFileSync(__dirname + "/Helper/Autocomplete.js", 'utf8')+ osEOL + osEOL
    Output += fs.readFileSync(__dirname + "/Helper/Chart.js", 'utf8')+ osEOL + osEOL

    Output += require("./PageApp/NanoXPageAppStart").GetJsStart()

    Output += GetJsOfApp(AdminApp)
    
    // Si on utilise le mode module, on execute les start app après avoir loadé les fichiers client
    if (NanoXAppOption.UseAppModule){
        // Nanox Admin Module
        if (AdminApp){
            Output += fs.readFileSync(__dirname + "/ModuleAdmin/IconAdmin.js", 'utf8')+ osEOL + osEOL
            Output += fs.readFileSync(__dirname + "/ModuleAdmin/Statistics.js", 'utf8')+ osEOL + osEOL
        }

        // Add commande : start module app
        Output += require("./PageApp/NanoXPageAppStart").GetJsStartModuleApp()
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
        let listeOfFiles = GetFirstFiel(Folder)
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

function GetFirstFiel(dirPath){
    files = fs.readdirSync(dirPath)
    let list = []
    let arrayOfFiles = []
    let arrayOfFirstFiles = []

    files.forEach(function(file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = GetListeOfFiles(dirPath + "/" + file, arrayOfFiles)
        } else {
            arrayOfFirstFiles.push(path.join(dirPath, "/", file))
        }
    })

    arrayOfFiles.forEach(element => {
        list.push(element)
    });

    arrayOfFirstFiles.forEach(element => {
        list.push(element)
    });
    return list
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