let LogInfo = require("../index").NanoXLogInfo
let LogError = require("../index").NanoXLogError
let LogStat = require("../index").NanoXLogStat
const LogR = require("../N_Log/Log")

const express = require("express")
const router = express.Router()

router.post("/", (req, res) => {
    LogInfo(`API nanoxauth : ${JSON.stringify(req.body)}`)
    // Vérifier si les parametres User et Pass sont present
    if (req.body.User && req.body.Pass){
        // Get User
        let ModelUsers = require("../N_Mongoose/Model_User")
        ModelUsers.find({ User: req.body.User})
        .then(users => {
            if (users.length == 1){
                if (users[0].Password == req.body.Pass){
                    // Create user data
                    let UserData = {_id: users[0]._id}
                    // Create token
                    let token = require("../N_Crypt/Crypt").EncryptDataToken(UserData)
                    res.send({Token: token})
                    LogStat(LogR.Stat_ConnectionValided, users[0])
                } else {
                    res.status(500).json({ErrorMsg: "Authentication error"})
                    LogStat(LogR.Stat_ConnectionError)
                    LogError("Invalid Pass")
                }
            } else {
                res.status(500).json({ErrorMsg: "Authentication error"})
                LogStat(LogR.Stat_ConnectionError)
                LogError("Number of User found not equal to 1")
            }
        })
        .catch((err) => {
            res.status(500).json({ErrorMsg: "Auth error"})
            LogStat(LogR.Stat_ConnectionError)
            LogError(`Mongoose find error: ${err.message}`)
        })
    } else{
        res.status(500).json({ErrorMsg: "Missing User or Pass"})
        LogStat(LogR.Stat_ConnectionError)
        LogError("Missing User or Pass")
    }
})

module.exports = router