const LogInfo = require("../index").NanoXLogInfo
const LogError = require("../index").NanoXLogError
//const AuthBasic = require("./Mid_AuthBasic")
const AuthAdmin = require("./Mid_AuthAdmin")

const express = require("express")
const router = express.Router()

let ModelLog = require("../N_Log/Model_Log")

router.get("/connection/:DayMonth/:OneUser", AuthAdmin, (req, res) => {
    LogInfo(`API nanoxadminstat : get connection data`, req.user)
    // Get connection data
    // ToDo
    console.log(req.params.DayMonth)
    console.log(req.params.OneUser)
    res.send("Ok connection")
})

router.get("/page/:DayMonth/:OnePage", AuthAdmin, (req, res) => {
    LogInfo(`API nanoxadminstat : get page data`, req.user)
    // Get page data
    // ToDo
    console.log(req.params.DayMonth)
    console.log(req.params.OnePage)
    res.send("Ok page")
})

router.get("/api/:DayMonth/:OneApi/:OneUser", AuthAdmin, (req, res) => {
    LogInfo(`API nanoxadminstat : get api data`, req.user)
    // Get api data
    // ToDo
    console.log(req.params.DayMonth)
    console.log(req.params.OneApi)
    console.log(req.params.OneUser)
    res.send("Ok api")
})

module.exports = router