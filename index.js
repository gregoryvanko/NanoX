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
        this._NlogR = require('./N_Log/Log.js').NLog
        this._NLog = new this._NlogR(this._Debug)
        // Setup User server
        this._UserServer = {Name: "Server", Id: "ServerId"}
    }

    /**
     * Return N_Log class
     */
    get NLog() {return this._NLog}
    
    /**
     * Start de l'application
     */
    async Start(){
        
        // Connect Mongoose
        await this._Mongoose.Connect(this._MongoDbName, this._MongoUrl)

        // Initiation of User Collection and Admin user
        this._Mongoose.InitiationUserCollection()

        // Log start appliation
        this._NLog.LogInfo("Application Started", this._UserServer)
    }

    
}

module.exports.NanoX = NanoX
module.exports.Mongoose = require("mongoose")