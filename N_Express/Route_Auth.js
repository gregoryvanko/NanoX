let LogInfo = require("../index").NanoXLogInfo
let LogError = require("../index").NanoXLogError
let LogStat = require('../N_Log/Log').LogStat
const LogStat_ConnectionValided = require("../N_Log/Log").Stat_ConnectionValided
const LogStat_ConnectionError = require("../N_Log/Log").Stat_ConnectionError

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
                    LogStat(LogStat_ConnectionValided, users[0])
                } else {
                    res.status(401).send("Authentication error")
                    LogStat(LogStat_ConnectionError)
                    LogError(`Invalid Pass ${JSON.stringify(req.body)}`)
                }
            } else {
                res.status(401).send("Authentication error")
                LogStat(LogStat_ConnectionError)
                LogError(`Number of User found not equal to 1 ${JSON.stringify(req.body)}`)
            }
        })
        .catch((err) => {
            res.status(401).send("Auth error")
            LogStat(LogStat_ConnectionError)
            LogError(`Mongoose find error: ${err.message}`)
        })
    } else{
        res.status(401).send("Missing User or Pass")
        LogStat(LogStat_ConnectionError)
        LogError("Missing User or Pass")
    }
})

module.exports = router