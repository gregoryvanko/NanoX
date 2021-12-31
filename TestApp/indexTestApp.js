// NonoX Option
let OptionNanoX = {
    AppName: "NanoXDev",                          // Nom de l'application
    AppPort: 1234,                          // Port du serveur
    AppSecret: "TestNonoXSecret",             // phrase secrete pour l'encodage du token 
    MongoUrl: "mongodb://localhost:27017",  // Url de la DB Mongo
    Debug: false
}

// Get Nonox Log
let LogInfo = require('../index').LogInfo
let LogError = require('../index').LogError

// Start TestApp
async function Start(Port, Debug){
    OptionNanoX.AppPort = Port
    OptionNanoX.Debug = Debug

    // Initiation de NanoX
    require('../index').NanoXInitiation(OptionNanoX)
    // Start NanoX
    await require('../index').NanoXStart()

    // Test Log fonction
    TestLog()

    // Test Mongoose
    //TestMongooseSave()
}

// Test User
let TestUser = {Name: "Test", Id: "TestID"}
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

module.exports.Start = Start