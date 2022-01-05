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
let MyAppPath = ""
let MyStartApp = false

let Mongoose = require("./N_Mongoose/Mongoose")

let Express = require("./N_Express/Express")

let LogR = require('./N_Log/Log')
let SetDebugMode = LogR.SetDebugMode
let LogInfo = LogR.LogInfo
let LogError = LogR.LogError
let LogStat = LogR.LogStat

let ListOfRoute = []
let ListOfPageToBuild = []


function NanoXInitiation({AppName = "MyNanoXApp", AppColor="rgb(20, 163, 255)", AppPort=3000, AppSecret="EncryptSecret", MongoUrl="mongodb://localhost:27017", Debug = false, IconPath = null, ApiServer = false, AllowSignUp = false, AppPath="", StartApp = false}) {
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
    MyStartApp = StartApp

    // Set MongoDb name
    MyMongoDbName = AppName
    // Set App
    if (MyStartApp){
        MyApiServer = true
        const App = require('./N_App/App')
        NanoXAddPageToBuild("initpage.html", MyAppPath, MyAppName, App.GetCss(), App.GetJs())
    }
    // Set Debug mode
    if (Debug){SetDebugMode()}
    // Set ApiServer
    if (MyApiServer){
        NanoXAddRoute("/nanoxauth", require('./N_Express/Route_Auth'))
        NanoXAddRoute("/nanoxuser", require('./N_Express/Route_User'))
        if (MyAllowSignUp){
            NanoXAddRoute("/nanoxSignUp", require('./N_Express/Route_SignUp'))
        }
    }
}

function NanoXStart(){
    return new Promise(async(resolve) => {
        // Log start appliation
        console.log(`Start of Nonox application: ${MyAppName}`)

        // Connect Mongoose
        await Mongoose.Connect(MyMongoDbName, MyMongoUrl)

        // Initiation of User Collection and Admin user
        await Mongoose.InitiationUserCollection()

        // Initiation of express
        await Express.StartExpressServer(MyNAppPort, ListOfPageToBuild, ListOfRoute, MyIconPath)

        // Log appliation Started
        console.log(`Nonox application Started`)
        resolve()
    })
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

function GetAppName(){
    return MyAppName
}

function GetAppColor(){
    return MyAppColor
}

function GetAllowSignUp(){
    return MyAllowSignUp
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
module.exports.NanoXGetAppName = GetAppName
module.exports.NanoXGetAppColor = GetAppColor
module.exports.NanoXGetAllowSignUp = GetAllowSignUp
module.exports.AuthBasic = require("./N_Express/Mid_AuthBasic")
module.exports.AuthAdmin = require("./N_Express/Mid_AuthAdmin")
module.exports.NanoXAddPageToBuild = NanoXAddPageToBuild