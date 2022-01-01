// Get Nonox Log
let LogInfo = require('../index').LogInfo
let LogError = require('../index').LogError

// Start TestApp
async function Start(Port = 1234, Name = "NanoXDev", Debug = false){

    // NonoX Option
    const OptionNanoX = {
        AppName: Name,
        AppPort: Port,
        AppSecret: "TestNonoXSecret",
        MongoUrl: "mongodb://localhost:27017",
        Debug: Debug
    }

    // Initiation de NanoX
    require('../index').NanoXInitiation(OptionNanoX)
    // Start NanoX
    await require('../index').NanoXStart()

    // Test Log fonction
    //TestLog()

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