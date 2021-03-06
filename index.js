let MyAppName = "MyNanoXApp"
let MyAppColor = "rgb(20, 163, 255)"
let MyNAppPort = 3000
let MyAppSecret = "EncryptSecret"
let MyMongoUrl= "mongodb://localhost:27017"
let MyMongoDbName = MyAppName
let MyDebug = false
let MyIconPath = null
let MyApiServer = false
let MyAllowSignUp = false
let MyAppPath = null
let MySplashScreen = null
let MySplashScreenBackgroundColor = 'white'
let MyNanoXAppOption = {ShowMenuBar: true, MenuBarOnTop: true, MenuBarIsTranslucide: false, ShowNameInMenuBar: true, CssClassForName: null, ColorMenuBar: "white", ColorIconMenuBar: "black", HeightMenuBar: "3rem", AppFolderClient: null, AppFolderAdmin: null, UseAppModule: true}

let Mongoose = require("./N_Mongoose/Mongoose")

let Express = require("./N_Express/Express")

let LogR = require('./N_Log/Log')
let SetDebugMode = LogR.SetDebugMode
let LogInfo = LogR.LogInfo
let LogError = LogR.LogError
let LogStat = LogR.LogStat

let ListOfRoute = []
let ListOfPageToBuild = []

function NanoXInitiation({AppName = "MyNanoXApp", AppColor="rgb(20, 163, 255)", AppPort=3000, AppSecret="EncryptSecret", MongoUrl="mongodb://localhost:27017", Debug = false, IconPath = null, ApiServer = false, AllowSignUp = false, AppPath="", NanoXAppOption = null}) {
    MyAppName = AppName
    MyAppColor = AppColor
    MyNAppPort = AppPort
    MyAppSecret = AppSecret
    MyMongoUrl = MongoUrl
    MyDebug = Debug
    MyIconPath = IconPath
    MyApiServer = ApiServer
    MyAllowSignUp = AllowSignUp
    MyAppPath = AppPath
    if (NanoXAppOption){
        if(NanoXAppOption.SplashScreen != undefined){MySplashScreen = NanoXAppOption.SplashScreen}
        if(NanoXAppOption.SplashScreenBackgroundColor != undefined){MySplashScreenBackgroundColor = NanoXAppOption.SplashScreenBackgroundColor}
        if(NanoXAppOption.ShowMenuBar != undefined){MyNanoXAppOption.ShowMenuBar = NanoXAppOption.ShowMenuBar}
        if(NanoXAppOption.MenuBarOnTop != undefined){MyNanoXAppOption.MenuBarOnTop = NanoXAppOption.MenuBarOnTop}
        if(NanoXAppOption.MenuBarIsTranslucide != undefined){MyNanoXAppOption.MenuBarIsTranslucide = NanoXAppOption.MenuBarIsTranslucide}
        if(NanoXAppOption.ShowNameInMenuBar != undefined){MyNanoXAppOption.ShowNameInMenuBar = NanoXAppOption.ShowNameInMenuBar}
        if(NanoXAppOption.CssClassForName != undefined){MyNanoXAppOption.CssClassForName = NanoXAppOption.CssClassForName}
        if(NanoXAppOption.ColorMenuBar != undefined){MyNanoXAppOption.ColorMenuBar = NanoXAppOption.ColorMenuBar}
        if(NanoXAppOption.ColorIconMenuBar != undefined){MyNanoXAppOption.ColorIconMenuBar = NanoXAppOption.ColorIconMenuBar}
        if(NanoXAppOption.HeightMenuBar != undefined){MyNanoXAppOption.HeightMenuBar = NanoXAppOption.HeightMenuBar}
        if(NanoXAppOption.AppFolderClient != undefined){MyNanoXAppOption.AppFolderClient = NanoXAppOption.AppFolderClient}
        if(NanoXAppOption.AppFolderAdmin != undefined){MyNanoXAppOption.AppFolderAdmin = NanoXAppOption.AppFolderAdmin}
        if(NanoXAppOption.UseAppModule != undefined){MyNanoXAppOption.UseAppModule = NanoXAppOption.UseAppModule}
    }

    // Set MongoDb name
    MyMongoDbName = AppName
    // Set Debug mode
    if (Debug){SetDebugMode()}
    // Set App
    if (MyAppPath != null){
        MyApiServer = true
        const BuildPageInit = require('./N_App/BuildPageInit')
        NanoXAddPageToBuild("initpage.html", MyAppPath, MyAppName, BuildPageInit.GetCss(), BuildPageInit.GetJs())
    }
    // Set ApiServer
    if (MyApiServer){
        NanoXAddRoute("/nanoxauth", require('./N_Express/Route_Auth'))
        NanoXAddRoute("/nanoxuser", require('./N_Express/Route_User'))
        NanoXAddRoute("/nanoxlog", require('./N_Express/Route_Log'))
        if (MyAllowSignUp){
            NanoXAddRoute("/nanoxsignup", require('./N_Express/Route_SignUp'))
        }
    }
}

function NanoXStart(){
    return new Promise(async(resolve) => {
        // Log start appliation
        console.log(`Start of NanoX application: ${MyAppName}`)

        // Connect Mongoose
        await Mongoose.Connect(MyMongoDbName, MyMongoUrl)

        // Initiation of User Collection and Admin user
        await Mongoose.InitiationUserCollection()

        // Create Output folder
        require("./N_PageBuilder/PageBuilder").CreateOutputFolder()

        // Creation des fichiers de l'App
        if (MyAppPath != null){
            BuildApp()
        }

        // Initiation of express
        await Express.StartExpressServer(MyNAppPort, ListOfPageToBuild, ListOfRoute, MyIconPath)

        // Log appliation Started
        console.log(`Nonox application Started`)
        resolve()
    })
}

function BuildApp(){
    const fs = require('fs')
    const BuildPageApp = require('./N_App/BuildPageApp')

    // Get Output path
    const OutputPath = require("./N_PageBuilder/PageBuilder").GetOutputPath()
    // Get Js and CSS of App
    const AppOutput = {Version: GetAppVersion(), CodeAppJS: BuildPageApp.GetJs(), CodeAppCSS: BuildPageApp.GetCss()}
    // Create file
    fs.writeFileSync(`${OutputPath}/app.json`,JSON.stringify(AppOutput))
    console.log(`User App builded`)

    // Get Js and CSS of AppAdmin
    const AppAdminOutput = {Version: GetAppVersion(), CodeAppJS: BuildPageApp.GetJs(true), CodeAppCSS: BuildPageApp.GetCss(true)}
    // Create file
    fs.writeFileSync(`${OutputPath}/appadmin.json`,JSON.stringify(AppAdminOutput))
    console.log(`User AppAdmin builded`)

    // Create Route
    NanoXAddRoute("/loadapp", require('./N_Express/Route_LoadApp'))
}

function GetAppVersion(){
    let version = ""
    // Si on est en debug on fait un random de la version
    if(MyDebug){
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        version = "Debug" + characters.charAt(Math.floor(Math.random() * characters.length))
    } else {
        let packagepath = process.cwd() + "/package.json"
        let packagejson = require(packagepath)
        version = packagejson.version
    }
    return version
}

function NanoXAddRoute(Path = null, Route = null ){
    if ((Path != null) && (Route != null)){
        ListOfRoute.push({Path: Path, Route : Route})
    }
}

function NanoXAddPageToBuild(PageName = null, PageRoute = null, Titre = null, Css = null, Js= null, Body = null){
    if ((PageName != null) && (PageRoute != null)){
        let PageToBuild = {PageName:PageName, PageRoute:PageRoute, Titre:Titre, Css:Css, Js:Js, Body:Body}
        ListOfPageToBuild.push(PageToBuild)
    }
}

function GetAppSecret(){
    return MyAppSecret
}

function GetAppColor(){
    return MyAppColor
}

function GetAllowSignUp(){
    return MyAllowSignUp
}

function GetSplashScreenData(){
    return {SplashScreen: MySplashScreen, SplashScreenBackgroundColor: MySplashScreenBackgroundColor}
}

function GetNanoXAppOption(){
    MyNanoXAppOption.AppName = MyAppName
    return MyNanoXAppOption
}

module.exports.NanoXStart = NanoXStart
module.exports.NanoXInitiation = NanoXInitiation
module.exports.NanoXLogInfo = LogInfo
module.exports.NanoXLogError = LogError
module.exports.NanoXLogStat = LogStat
module.exports.Mongoose = require("mongoose")
module.exports.NanoXAddRoute = NanoXAddRoute
module.exports.Express = require("express")
module.exports.NanoXGetAppSecret = GetAppSecret
module.exports.NanoXGetAppColor = GetAppColor
module.exports.NanoXGetAllowSignUp = GetAllowSignUp
module.exports.NanoXAuthBasic = require("./N_Express/Mid_AuthBasic")
module.exports.NanoXAuthAdmin = require("./N_Express/Mid_AuthAdmin")
module.exports.NanoXAddPageToBuild = NanoXAddPageToBuild
module.exports.NanoXGetAppVersion = GetAppVersion
module.exports.NanoXGetSplashScreenData = GetSplashScreenData
module.exports.NanoXGetNanoXAppOption = GetNanoXAppOption