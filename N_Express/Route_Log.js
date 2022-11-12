const LogInfo = require("../index").NanoXLogInfo
const LogStatApi = require("../index").NanoXLogStatApi
const AuthBasic = require("./Mid_AuthBasic")
const AuthAdmin = require("./Mid_AuthAdmin")
const router = require("express").Router()

router.post("/", AuthBasic, (req, res) => {
    LogInfo(req.body.Log, req.user)
    res.send("saved")
})

router.get("/:TypeLog/:StartDate/:UserID/:SearchText", AuthAdmin, (req, res) =>{
    let reponse = {ListOfUser: null, LogData: null}
    console.log(req.params.TypeLog)
    console.log(req.params.StartDate)
    console.log(req.params.UserID)
    console.log(req.params.SearchText)

    res.send(reponse)
})

module.exports = router