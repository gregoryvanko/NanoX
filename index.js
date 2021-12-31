let MyAppName = "MyNanoXApp"
let MyNAppPort = 3000
let MyAppSecret = "EncryptSecret"
let MyMongoUrl= "mongodb://localhost:27017"
let MyMongoDbName = MyAppName
let MyDebug = false
let MyUserServer = {Name: "Server", Id: "ServerId"}

let Mongoose = require("./N_Mongoose/Mongoose")

let LogR = require('./N_Log/Log.js')
let SetDebugMode = LogR.SetDebugMode
let LogInfo = LogR.LogInfo
let LogError = LogR.LogError
let LogStat = LogR.LogStat
let Stat_FirstGet = LogR.Stat_FirstGet
let Stat_ConnectionValided = LogR.Stat_ConnectionValided
let Stat_ConnectionError = LogR.Stat_ConnectionError


function NanoXInitiation({AppName = "MyNanoXApp", AppPort=3000, AppSecret="EncryptSecret", MongoUrl="mongodb://localhost:27017", Debug = false}) {
    MyAppName = AppName
    MyNAppPort = AppPort
    MyAppSecret = AppSecret
    MyMongoUrl = MongoUrl
    MyDebug = Debug

    MyMongoDbName = AppName
    if (Debug){SetDebugMode()}
}

function NanoXStart(){
    return new Promise(async(resolve) => {
        // Connect Mongoose
        await Mongoose.Connect(MyMongoDbName, MyMongoUrl)

        // Log start appliation
        LogInfo("Start Application", MyUserServer)

        // Initiation of User Collection and Admin user
        await Mongoose.InitiationUserCollection()

        // Log appliation Started
        LogInfo("Application Started", MyUserServer)
        resolve()
    })
}

module.exports.NanoXStart = NanoXStart
module.exports.NanoXInitiation = NanoXInitiation
module.exports.LogInfo = LogInfo
module.exports.LogError = LogError
module.exports.Mongoose = require("mongoose")