const LogInfo = require("../index").NanoXLogInfo
const LogError = require("../index").NanoXLogError
//const AuthBasic = require("./Mid_AuthBasic")
const AuthAdmin = require("./Mid_AuthAdmin")

const express = require("express")
const router = express.Router()

let ModelLog = require("../N_Log/Model_Log")

router.get("/connection/:Type/:User", AuthAdmin, (req, res) => {
    LogInfo(`API nanoxadminstat : get connection data`, req.user)
    // Get connection data
    console.log(req.params.Type)
    console.log(req.params.User)
    res.send("Ok")
})

module.exports = router