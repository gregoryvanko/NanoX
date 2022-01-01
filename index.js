let MyAppName = "MyNanoXApp"
let MyNAppPort = 3000
let MyAppSecret = "EncryptSecret"
let MyMongoUrl= "mongodb://localhost:27017"
let MyMongoDbName = MyAppName
let MyDebug = false
let MyIconPath = null

let Mongoose = require("./N_Mongoose/Mongoose")

let Express = require("./N_Express/Express")

let LogR = require('./N_Log/Log')
let SetDebugMode = LogR.SetDebugMode
let LogInfo = LogR.LogInfo
let LogError = LogR.LogError
let LogStat = LogR.LogStat
let Stat_FirstGet = LogR.Stat_FirstGet
let Stat_ConnectionValided = LogR.Stat_ConnectionValided
let Stat_ConnectionError = LogR.Stat_ConnectionError

let ServerRoutes = []


function NanoXInitiation({AppName = "MyNanoXApp", AppPort=3000, AppSecret="EncryptSecret", MongoUrl="mongodb://localhost:27017", Debug = false, IconPath = null}) {
    MyAppName = AppName
    MyNAppPort = AppPort
    MyAppSecret = AppSecret
    MyMongoUrl = MongoUrl
    MyDebug = Debug
    MyIconPath = IconPath
    // Set MongoDb name
    MyMongoDbName = AppName
    // Set Debug mode
    if (Debug){SetDebugMode()}
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
        await Express.StartExpressServer(MyNAppPort, ServerRoutes, MyIconPath)

        // Log appliation Started
        console.log(`Nonox application Started`)
        resolve()
    })
}

function NanoXAddRoute(Path = null, Route = null ){
    if ((Path != null) && (Route != null)){
        ServerRoutes.push({Path: Path, Route : Route})
    }
}

module.exports.NanoXStart = NanoXStart
module.exports.NanoXInitiation = NanoXInitiation
module.exports.NanoXLogInfo = LogInfo
module.exports.NanoXLogError = LogError
module.exports.Mongoose = require("mongoose")
module.exports.NanoXAddRoute = NanoXAddRoute
module.exports.Express = require("express")