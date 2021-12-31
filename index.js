class NanoX {
    constructor({AppName = "MyNanoXApp", AppPort=3000, AppSecret="EncryptSecret", MongoUrl="mongodb://localhost:27017", Debug = false}){
        // Variable externe indispensable de la class
        this._AppName = AppName
        this._AppPort = AppPort
        this._AppSecret = AppSecret
        this._MongoUrl = MongoUrl
        this._MongoDbName = this._AppName
        this._Debug = Debug

        // Setup Mongoose
        this._Mongoose = require("./N_Mongoose/Mongoose")

        // Setup Log
        let SetDebugMode = require('./N_Log/Log.js').SetDebugMode
        if (this._Debug){SetDebugMode()}
        this._LogInfo = require('./N_Log/Log.js').LogInfo
        this._LogError = require('./N_Log/Log.js').LogError
        this._LogStat = require('./N_Log/Log.js').LogStat
        this._Stat_FirstGet = require('./N_Log/Log.js').Stat_FirstGet
        this._Stat_ConnectionValided = require('./N_Log/Log.js').Stat_ConnectionValided
        this._Stat_ConnectionError = require('./N_Log/Log.js').Stat_ConnectionError

        // Setup User server
        this._UserServer = {Name: "Server", Id: "ServerId"}
    }

    /**
     * Return N_Log class
     */
    get LogInfo() {return this._LogInfo}
    get LogError() {return this._LogError}
    
    /**
     * Start de l'application
     */
    Start(){
        return new Promise(async(resolve) => {
            // Connect Mongoose
            await this._Mongoose.Connect(this._MongoDbName, this._MongoUrl)

            // Log start appliation
            this._LogInfo("Start Application", this._UserServer)

            // Initiation of User Collection and Admin user
            await this._Mongoose.InitiationUserCollection()

            // Log appliation Started
            this._LogInfo("Application Started", this._UserServer)
            resolve()
        })
    }
}

module.exports.NanoX = NanoX
module.exports.Mongoose = require("mongoose")