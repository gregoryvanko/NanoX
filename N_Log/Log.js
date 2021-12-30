class NLog{
    constructor(Debug = false){
        this._Debug = Debug
    }

    static Stat_FirstGet = "FirstGet"
    static Stat_ConnectionValided = "ConnectionValided"
    static Stat_ConnectionError = "ConnectionError"

    ConsoleLog(Now, Type, Message, User){
        if(this._Debug){
            if (Type == "Error"){
                console.log('\x1b[31m%s\x1b[0m', this.GetDateString(Now) + " " + Type + " " + User.Name + ": " + Message)
            } else if (Type == "Stat"){
                console.log('\x1b[34m%s\x1b[0m', this.GetDateString(Now) + " " + Type + " " + User.Name + ": " + Message)
            } else {
                console.log(this.GetDateString(Now) + " " + Type + " " + User.Name + ": " + Message)
            }
            
        }
    }

    SaveLog(Type, Message, User){
        let now = new Date()
        var ModelLog = require("./Model_Log")
        const NewLog = new ModelLog({Date: now, Type: Type, Valeur: Message, User: User.Name, UserId: User.Id})
        NewLog.save().catch(err => console.log(err))
        this.ConsoleLog(now,Type, Message, User)
    }

    GetDateString(DateString){
        var Now = new Date(DateString)
        var dd = Now.getDate()
        var mm = Now.getMonth()+1
        var yyyy = Now.getFullYear()
        if(dd<10) {dd='0'+dd} 
        if(mm<10) {mm='0'+mm}
        return yyyy + "-" + mm + "-" + dd
    }

    LogInfo(Message, User){
        this.SaveLog("Info", Message, User)
    }

    LogError(Message, User){
        this.SaveLog("Error", Message, User)
    }

    LogStat(StatType, User){
        this.SaveLog("Stat", StatType, User)
    }
}

module.exports.NLog = NLog