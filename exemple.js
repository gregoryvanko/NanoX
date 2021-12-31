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

        // User Server
        this._UserServer = {Name: "Server", Id: "ServerId"}
        // Log
        this._LogInfo = this._MyApp.LogInfo
        this._LogError = this._MyApp.LogError
    }

    async Start(){
        await this._MyApp.Start()

        // Test NLog
        //this.TestLog()

        // Test Mongoose
        this.TestMongooseSave()
    }

    TestLog(){
        this._LogInfo("Premier test from app de test", this._UserServer)
        this._LogError("Premier erreur", this._UserServer)
    }

    TestMongooseSave(){
        var Model_Livre = require("./TestApp/Backend/TestMongoose/Model_Livres")
        const NewLivre = new Model_Livre({Nom: "Roman", Auteur: "Gregory"})
        NewLivre.save().then(()=> {console.log("New Livre saved in db")}).catch(err => console.log(err))
    }
}


/** Lancement du l'application de test */
const Name = "NanoXDev"
const Port = 5000
const Debug = true
let MyTestNanoX = new TestNanoX(Name, Port, Debug)
MyTestNanoX.Start() 