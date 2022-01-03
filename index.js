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

    console.log("Start of Init NanoX")
    // Set MongoDb name
    MyMongoDbName = AppName
    // Set App
    if (MyStartApp){
        MyApiServer = true
        NanoXAddPageToBuild("initpage.html", MyAppPath, BuildFunction = require('./N_App/App').BuildInitialHtml)
    }
    // Set Debug mode
    if (Debug){SetDebugMode()}
    // Set ApiServer
    if (MyApiServer){
        console.log("Route added: nanoxauth")
        NanoXAddRoute("/nanoxauth", require('./N_Express/Route_Auth'))
        console.log("Route added: nanoxuser")
        NanoXAddRoute("/nanoxuser", require('./N_Express/Route_User'))
        if (MyAllowSignUp){
            console.log("Route added: nanoxSignUp ")
            NanoXAddRoute("/nanoxSignUp", require('./N_Express/Route_SignUp'))
        }
    }
    console.log("End of Init NanoX")
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

function NanoXAddPageToBuild(PageName = null, PageRoute = null, BuildFunction = null){
    if ((PageName != null) && (PageRoute != null) && (BuildFunction != null)){
        let PageToBuild = {PageName: PageName, PageRoute:PageRoute, BuildFunction: BuildFunction}
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
module.exports.AuthBasic = require("./N_Express/Mid_AuthBasic")
module.exports.AuthAdmin = require("./N_Express/Mid_AuthAdmin")
module.exports.NanoXAddPageToBuild = NanoXAddPageToBuild