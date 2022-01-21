// Get Nonox Log
let LogInfo = require('../index').NanoXLogInfo
let LogError = require('../index').NanoXLogError

// Start TestApp
async function Start(Port = 1234, Name = "NanoXDev", Debug = false){

    // NonoX Option
    const OptionNanoX = {
        AppName: Name,
        AppColor: "rgb(20, 163, 255)",
        AppPort: Port,
        AppSecret: "TestNonoXSecret",
        MongoUrl: "mongodb://localhost:27017",
        Debug: Debug,
        IconPath:  __dirname + "/Backend/Test-apple-icon-192x192.png",
        ApiServer: true,
        AllowSignUp: true,
        AppPath: "",
        NanoXAppOption : {
            SplashScreen : `<div style="font-size: 4vh;">Splash Screen</div><div id="ProgressText" style="font-size: 3vh;">0%</div>`,
            //SplashScreenBackgroundColor : "red",
            ShowMenuBar: true,
            MenuBarIstransparent:false,
            ShowNameInMenuBar: true,
            //CssClassForName: "TestClassName",
            ColorMenuBar: "black",
            ColorIconMenuBar: "white",
            HeightMenuBar: "3rem",
            AppFolderClient: __dirname + "/Frontend/App",
            AppFolderAdmin: __dirname + "/Frontend/Admin",
            UseAppModule: true
        }
    }

    // Initiation de NanoX
    require('../index').NanoXInitiation(OptionNanoX)

    // Test add route
    //TestAddRoute()

    // Test add page builder
    //TestAddPageBuilder()

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
// Test Add Page Builder
function TestAddPageBuilder(){
    let NanoXAddPageToBuild = require('../index').NanoXAddPageToBuild
    NanoXAddPageToBuild("gg.html", "gg.html", "TitreGG", "", "", TestBuildBodyPage())
}
function TestBuildBodyPage(){
    return "<div>page gg.html</div>"
}

module.exports.Start = Start