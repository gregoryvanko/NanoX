const LogInfo = require("../index").NanoXLogInfo
const LogError = require("../index").NanoXLogError
const LogStatApi = require("../index").NanoXLogStatApi
const AuthBasic = require("./Mid_AuthBasic")
const AuthAdmin = require("./Mid_AuthAdmin")
const router = require("express").Router()

router.post("/", AuthBasic, (req, res) => {
    LogInfo(req.body.Log, req.user)
    res.send("saved")
})

router.get("/:TypeLog/:StartDate/:UserID/:SearchText/:PageLog", AuthAdmin, async (req, res) =>{
    const GetAllUser = require("./AdminStat").GetallUser

    let reponse = {ListOfUser: null, LogData: null}

    if(req.params.PageLog == 1){
        LogStatApi("nanoxlog", "get")
    }

    try {
        reponse.ListOfUser = await GetAllUser()
        reponse.LogData = await GetLog(req.params.TypeLog, new Date(req.params.StartDate), req.params.UserID, req.params.SearchText, req.params.PageLog)
        res.status(200).send(reponse)
    } catch (error) {
        const errormsg = `API Log error: ${error}`
        LogError(errormsg, req.user)
        res.status(500).send(errormsg)
    }
})

async function GetLog(TypeLog, StartDate, UserID, SearchText, PageLog){
    return new Promise((resolve, reject)=>{
        const numberoflogtosend = 20
        let reponse = []

        const ModelLog = require("../N_Log/Model_Log")

        let Listeofquerry = [{Date: {$lte: new Date(StartDate)}}]
        if (TypeLog != "all") {
            Listeofquerry.push({Type: TypeLog})
        }
        if (UserID != "alluser") {
            Listeofquerry.push({UserId: UserID})
        }
        if (SearchText != "notext") {
            Listeofquerry.push({Valeur: SearchText}) //ToDo
        }
        const query = {$and: Listeofquerry}
        console.log(query)
        const projection = {} 

        ModelLog.find(query, projection, (err, result) => {
            if (err) {
                reject(`Mongoose aggragate Page stat error => ${err}`)
            } else {
                if (result.length != 0){
                    reponse = result
                }
                resolve(reponse)
            }
        }).limit(numberoflogtosend).skip(numberoflogtosend * (PageLog)).sort({Date: -1})
    })
}

module.exports = router