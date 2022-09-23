// Get Nonox Log
let LogInfo = require('../index').NanoXLogInfo
let LogError = require('../index').NanoXLogError

// Start TestApp
async function Start({Port = 9000, Name = "NanoX", Debug = false, SplashScreenFilePath = null, MongoDbUrl = "mongodb://localhost:27017"} = {}){

    // NonoX Option
    const OptionNanoX = {
        AppName: Name,
        AppColor: "rgb(20, 163, 255)",
        AppPort: Port,
        AppSecret: "TestNonoXSecret",
        MongoUrl: MongoDbUrl,
        Debug: Debug,
        //IconPath:  __dirname + "/Backend/Test-apple-icon-192x192.png",
        ApiServer: true,
        AllowVideo : true,
        AllowSignUp: true,
        AppPath: "",
        NanoXAppOption : {
            SplashScreen : `<div style="font-size: 4vh;">Splash Screen</div><div id="ProgressText" style="font-size: 3vh;">0%</div>`,
            SplashScreenBackgroundColor : "red",
            ShowMenuBar: true,
            //MenuBarIsTranslucide: true,
            MenuBarOnTop: true,
            ShowNameInMenuBar: true,
            //CssClassForName: "TestClassName",
            ColorMenuBar: "white",
            ColorIconMenuBar: "red",
            HeightMenuBar: "6rem",
            AppFolderClient: __dirname + "/Frontend/App",
            AppFolderAdmin: __dirname + "/Frontend/Admin",
            UseAppModule: true
        }
    }

    // Initiation de NanoX
    require('../index').NanoXInitiation(OptionNanoX)

    // Test add route
    TestAddRoute()

    // Test add page builder
    //TestAddPageBuilder()

    // Start NanoX
    await require('../index').NanoXStart()

    // Test Log fonction
    //TestLog()
}

// Test User
let TestUser = {User: "Test", Id: "TestID"}
// Test Log
function TestLog(){
    LogInfo("Premier test from app de test", TestUser)
    LogError("Premier erreur", TestUser)
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