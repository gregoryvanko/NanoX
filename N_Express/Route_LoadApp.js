let LogInfo = require("../index").NanoXLogInfo
let LogError = require("../index").NanoXLogError
const AuthBasic = require("./Mid_AuthBasic")

const fs = require('fs')
const express = require("express")
const router = express.Router()

router.post("/", AuthBasic, (req, res) => {
    LogInfo(`API loadapp`, req.user)
    if (req.body.Version){
        // Get Output path
        const OutputPath = require("../N_PageBuilder/PageBuilder").GetOutputPath()

        if(req.user.Admin){
            // Send appAdmin
            if (fs.existsSync(`${OutputPath}/appadmin.json`)){
                if (req.body.Version == require("../index").NanoXGetAppVersion()){
                    res.json({Version: req.body.Version, CodeAppJS: null, CodeAppCSS: null})
                    LogInfo(`Admin App from browser`, req.user)
                } else {
                    res.json(require("../N_PageBuilder/Output/appadmin.json"))
                    LogInfo(`Admin App from server`, req.user)
                }
            } else {
                res.status(404).send("Missing file appadmin.json")
                LogError("Missing file appadmin.json")
            }
        } else {
            if (fs.existsSync(`${OutputPath}/app.json`)){
                if (req.body.Version == require("../index").NanoXGetAppVersion()){
                    res.json({Version: req.body.Version, CodeAppJS: null, CodeAppCSS: null})
                    LogInfo(`App from browser`, req.user)
                } else {
                    res.json(require("../N_PageBuilder/Output/app.json"))
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