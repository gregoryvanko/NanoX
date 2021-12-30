class TestNanoX{
    constructor(Name, Port, Debug){
        let MyNanoX = require('./index').NanoX
        
        const OptionNanoX = {
            AppName: Name,                          // Nom de l'application
            AppPort: Port,                          // Port du serveur
            AppSecret: "TestAppSecret",             // phrase secrete pour l'encodage du token 
            MongoUrl: "mongodb://localhost:27017",  // Url de la DB Mongo
            Debug: Debug
        }
        this._MyApp = new MyNanoX(OptionNanoX)
        this._UserServer = {Name: "Server", Id: "ServerId"}

        this._NLog = this._MyApp.NLog
    }

    Start(){
        this._MyApp.Start()

        // Test NLog
        //this.TestLog()

        // Test Mongoose
        //this.TestMongooseSave()
    }

    TestLog(){
        this._NLog.LogInfo("Premier test from app de test", this._UserServer)
        this._NLog.LogError("Premier erreur", this._UserServer)
    }

    TestMongooseSave(){
        var Model_Users = require("./TestApp/Backend/TestMongoose/Model_Users")
        const NewUser = new Model_Users({Nom: "VanKo", Prenom: "Gregory"})
        NewUser.save().catch(err => console.log(err))
        console.log("NewTest saved in db")
    }
}


/** Lancement du l'application de test */
const Name = "NanoXDev"
const Port = 5000
const Debug = true
let MyTestNanoX = new TestNanoX(Name, Port, Debug)
MyTestNanoX.Start() 