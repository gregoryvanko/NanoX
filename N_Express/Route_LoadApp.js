let LogInfo = require("../index").NanoXLogInfo
let LogError = require("../index").NanoXLogError
const AuthBasic = require("./Mid_AuthBasic")

const fs = require('fs')
const express = require("express")
const router = express.Router()

router.post("/", AuthBasic, (req, res) => {
    LogInfo(`API loadapp : get user data`, req.user)
    if (req.body.Version){
        // Get Output path
        const OutputPath = require("../N_PageBuilder/PageBuilder").GetOutputPath()
        if (fs.existsSync(`${OutputPath}/app.json`)){
            if (req.body.Version == require("../index").NanoXGetAppVersion()){
                res.json({Version: req.body.Version, CodeAppJS: null, CodeAppCSS: null})
            } else {
                res.json(require("../N_PageBuilder/Output/app.json"))
            }
        } else {
            res.status(500).json({ErrorMsg: "Missing file app.json"})
        LogError("Missing file app.json")
        }
    } else {
        res.status(500).json({ErrorMsg: "Missing Version"})
        LogError("Missing Version")
    }
})

module.exports = router