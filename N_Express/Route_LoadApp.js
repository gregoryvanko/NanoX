const LogInfo = require("../index").NanoXLogInfo
const LogStatApi = require("../index").NanoXLogStatApi
const LogError = require("../index").NanoXLogError
const LogStat = require('../N_Log/Log').LogStat
const LogStat_ApplicationLoaded = require("../N_Log/Log").Stat_ApplicationLoaded
const AuthBasic = require("./Mid_AuthBasic")

const fs = require('fs')
const express = require("express")
const router = express.Router()

router.post("/", AuthBasic, (req, res) => {
    LogStatApi("nanoxloadapp", "post", req.user)
    if (req.body.Version){
        // Get Output path
        const OutputPath = require("../N_PageBuilder/PageBuilder").GetOutputPath()
        const CurrentVersion = require("../index").NanoXGetAppVersion()

        if(req.user.Admin){
            // Send appAdmin
            if (fs.existsSync(`${OutputPath}/appadmin.json`)){
                LogStat(LogStat_ApplicationLoaded, req.user)
                if (req.body.Version == CurrentVersion){
                    res.json({Version: CurrentVersion, CodeAppJS: null, CodeAppCSS: null})
                    LogInfo(`Admin App from browser`, req.user)
                } else {
                    const adminappfile = require("../N_PageBuilder/Output/appadmin.json")
                    res.json({Version: CurrentVersion, CodeAppJS: adminappfile.CodeAppJS, CodeAppCSS: adminappfile.CodeAppCSS})
                    LogInfo(`Admin App from server`, req.user)
                }
            } else {
                res.status(404).send("Missing file appadmin.json")
                LogError("Missing file appadmin.json")
            }
        } else {
            if (fs.existsSync(`${OutputPath}/app.json`)){
                LogStat(LogStat_ApplicationLoaded, req.user)
                if (req.body.Version == CurrentVersion){
                    res.json({Version: CurrentVersion, CodeAppJS: null, CodeAppCSS: null})
                    LogInfo(`App from browser`, req.user)
                } else {
                    const appfile = require("../N_PageBuilder/Output/app.json")
                    res.json({Version: CurrentVersion, CodeAppJS: appfile.CodeAppJS, CodeAppCSS: appfile.CodeAppCSS})
                    LogInfo(`App from server`, req.user)
                }
            } else {
                res.status(404).send("Missing file app.json")
                LogError("Missing file app.json")
            }
        }
    } else {
        res.status(404).send("Missing Version")
        LogError("Missing Version")
    }
})

module.exports = router