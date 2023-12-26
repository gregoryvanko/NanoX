let MyAppName = "MyNanoXApp"
let MyAppColor = "rgb(20, 163, 255)"
let MyNAppPort = 3000
let MyAppSecret = "EncryptSecret"
let MyMongoUrl= "mongodb://localhost:27017"
let MyMongoDbName = MyAppName
let MyDebug = false
let MyIconPath = null
let MyApiServer = false
let MyAllowVideo = false
let MyAllowSignUp = false
let MyAppPath = null
let MySplashScreen = null
let MySplashScreenBackgroundColor = 'white'
let MyNanoXAppOption = {ShowMenuBar: true, MenuBarOnTop: true, MenuBarIsTranslucide: false, ShowNameInMenuBar: true, CssClassForName: null, ColorMenuBar: "white", ColorIconMenuBar: "black", HeightMenuBar: "3rem", AppFolderClient: null, AppFolderAdmin: null, UseAppModule: true}

let Mongoose = require("./N_Mongoose/Mongoose")

let Express = require("./N_Express/Express")

const LogR = require('./N_Log/Log')
const SetDebugMode = LogR.SetDebugMode
const LogInfo = LogR.LogInfo
const LogError = LogR.LogError
const LogStatApi = LogR.LogStatApi

let ListOfRoute = []
let ListOfPageToBuild = []
let ListOfPageRoute = []

function NanoXInitiation({AppName = "MyNanoXApp", AppColor="rgb(20, 163, 255)", AppPort=3000, AppSecret="EncryptSecret", MongoUrl="mongodb://localhost:27017", Debug = false, IconPath = null, ApiServer = false, AllowVideo = false, AllowSignUp = false, AppPath="", NanoXAppOption = null}) {
    MyAppName = AppName
    MyAppColor = AppColor
    MyNAppPort = process.env.PORT || AppPort
    MyAppSecret = AppSecret
    MyMongoUrl = process.env.MONGOURL || MongoUrl
    MyDebug = Debug
    MyIconPath = IconPath
    MyApiServer = ApiServer
    MyAllowVideo = AllowVideo
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
    MyMongoDbName = AppName.replace(/ /g,"_")
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
        NanoXAddRoute("/nanoxadminstat", require('./N_Express/Route_Stat'))
        if (MyAllowVideo){
            NanoXAddRoute("/video", require('./N_Express/Route_Video'))
        }
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
    const AppOutput = {CodeAppJS: BuildPageApp.GetJs(), CodeAppCSS: BuildPageApp.GetCss()}
    // Create file
    fs.writeFileSync(`${OutputPath}/app.json`,JSON.stringify(AppOutput))
    console.log(`User App builded`)

    // Get Js and CSS of AppAdmin
    const AppAdminOutput = {CodeAppJS: BuildPageApp.GetJs(true), CodeAppCSS: BuildPageApp.GetCss(true)}
    // Create file
    fs.writeFileSync(`${OutputPath}/appadmin.json`,JSON.stringify(AppAdminOutput))
    console.log(`User AppAdmin builded`)

    // Create Route
    NanoXAddRoute("/nanoxloadapp", require('./N_Express/Route_LoadApp'))
}

function GetAppVersion(){
    const OutputPath = require("./N_PageBuilder/PageBuilder").GetOutputPath()
    const version = require('fs').statSync(OutputPath + '/app.json').mtime.toISOString()
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
        ListOfPageRoute.push(PageRoute)
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

function GetListOfPageRoute(){
    return ListOfPageRoute
}


module.exports.NanoXStart = NanoXStart
module.exports.NanoXInitiation = NanoXInitiation
module.exports.NanoXLogInfo = LogInfo
module.exports.NanoXLogError = LogError
module.exports.NanoXLogStatApi = LogStatApi
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
module.exports.NanoXGetListOfPageRoute = GetListOfPageRoute
