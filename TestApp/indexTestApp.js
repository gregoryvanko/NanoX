// Get Nonox Log
let LogInfo = require('../index').NanoXLogInfo
let LogError = require('../index').NanoXLogError

// Start TestApp
async function Start(Port = 1234, Name = "NanoXDev", Debug = false){

    // NonoX Option
    const OptionNanoX = {
        AppName: Name,
        AppPort: Port,
        AppSecret: "TestNonoXSecret",
        MongoUrl: "mongodb://localhost:27017",
        Debug: Debug,
        IconPath:  __dirname + "/Backend/Test-apple-icon-192x192.png",
        ApiServer: true,
        AllowSignUp: true
    }

    // Initiation de NanoX
    require('../index').NanoXInitiation(OptionNanoX)

    // Test add route
    //TestAddRoute()

    // Start NanoX
    await require('../index').NanoXStart()

    // Test Log fonction
    //TestLog()

    // Test Mongoose
    //TestMongooseSave()
}

// Test User
let TestUser = {User: "Test", Id: "TestID"}
// Test Log
function TestLog(){
    LogInfo("Premier test from app de test", TestUser)
    LogError("Premier erreur", TestUser)
}
// Test Mongo Save
function TestMongooseSave(){
    var Model_Livre = require("./Backend/TestMongoose/Model_Livres")
    const NewLivre = new Model_Livre({Nom: "Roman", Auteur: "Gregory"})
    NewLivre.save().then(()=> {console.log("New Livre saved in db")}).catch(err => console.log(err))
}
// Test Add route
function TestAddRoute(){
    let NanoXAddRoute = require('../index').NanoXAddRoute
    NanoXAddRoute("/test", require('./Backend/TestRoute/Route_Test'))
}

module.exports.Start = Start