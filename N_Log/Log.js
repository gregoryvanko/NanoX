let DebugMode = false

let MyUserServer = {User: "Server", _id: "ServerId"}

function SetDebugMode(){
    DebugMode = true
}

function ConsoleLog(Now, Type, Message, User){
    if(DebugMode){
        if (Type == "Error"){
            console.log('\x1b[31m%s\x1b[0m', GetDateString(Now) + " " + Type + " " + User.User + " => " + Message )
        } else if (Type == "Stat"){
            console.log('\x1b[34m%s\x1b[0m', GetDateString(Now) + " " + Type + " " + User.User + " => " + Message )
        } else {
            console.log(GetDateString(Now) + " " + Type + " " + User.User + " => " + Message )
        }
    }
}

function GetDateString(DateString){
    var Now = new Date(DateString)
    var dd = Now.getDate()
    var mm = Now.getMonth()+1
    var yyyy = Now.getFullYear()
    if(dd<10) {dd='0'+dd} 
    if(mm<10) {mm='0'+mm}
    return yyyy + "-" + mm + "-" + dd
}

function SaveLog(Type, Message, User){
    let now = new Date()
    var ModelLog = require("./Model_Log")
    const NewLog = new ModelLog({Date: now, Type: Type, Valeur: Message, UserId: User._id})
    NewLog.save().catch(err => console.error(err))
    ConsoleLog(now,Type, Message, User)
}

function LogInfo(Message = "NoValue", User = MyUserServer){
    SaveLog("Info", Message, User)
}

function LogError(Message = "NoValue", User = MyUserServer){
    SaveLog("Error", Message, User)
}

function LogStat(Message = "NoValue", User = MyUserServer){
    SaveLog("Stat", Message, User)
}
const Stat_TypePage = "Page: "
function LogStatPage(PageName = "NoValue", User = MyUserServer){
    LogStat(Stat_TypePage + "/" + PageName, User)
}

const Stat_ApiRoute = "Api: "
const Stat_ApiVerbe = ", Verbe: "
function LogStatApi(ApiRoute = "NoValue", ApiVerbe = "NoValue", User = MyUserServer){
    LogStat(Stat_ApiRoute + ApiRoute + Stat_ApiVerbe + ApiVerbe, User)
}

module.exports.SetDebugMode = SetDebugMode
module.exports.LogInfo = LogInfo
module.exports.LogError = LogError
module.exports.LogStat = LogStat
module.exports.Stat_ConnectionValided = "ConnectionValided"
module.exports.Stat_ConnectionError = "ConnectionError"
module.exports.Stat_ApplicationLoaded = "ApplicationLoaded"
module.exports.Stat_TypePage = Stat_TypePage
module.exports.LogStatPage = LogStatPage
module.exports.Stat_ApiRoute = Stat_ApiRoute
module.exports.Stat_ApiVerbe = Stat_ApiVerbe
module.exports.LogStatApi = LogStatApi