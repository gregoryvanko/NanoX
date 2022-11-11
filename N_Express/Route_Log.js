const LogInfo = require("../index").NanoXLogInfo
const LogStatApi = require("../index").NanoXLogStatApi
const AuthBasic = require("./Mid_AuthBasic")
const router = require("express").Router()

router.post("/", AuthBasic, (req, res) => {
    LogInfo(req.body.Log, req.user)
    res.send("saved")
})

module.exports = router