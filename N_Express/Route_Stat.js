const LogInfo = require("../index").NanoXLogInfo
const LogError = require("../index").NanoXLogError
//const AuthBasic = require("./Mid_AuthBasic")
const AuthAdmin = require("./Mid_AuthAdmin")

const GetAllUser = require("./AdminStat").GetallUser
const GetLabel = require("./AdminStat").GetLabel
const GetConnectionStat = require("./AdminStat").GetConnectionStat

const express = require("express")
const router = express.Router()

router.get("/connection/:DayMonth/:UserId", AuthAdmin, async (req, res) => {
    LogInfo(`API nanoxadminstat : get connection data`, req.user)

    let reponse = {ListOfUser: null, ConnectionData: null}
    try {
        if (req.params.UserId == "alluser"){
            // get all user
            reponse.ListOfUser = await GetAllUser()

            // Format response object
            reponse.ConnectionData = {Label: null, StatAppPage: null, StatValideConnection: null, StatErrorConnection : null}

            // Date definition
            let currentdate = new Date()
            let startdate = null
            let duration = 0
            if (req.params.DayMonth == "month"){
                startdate = Date.UTC(currentdate.getFullYear(), currentdate.getMonth(), 1, 0, 0, 0, 1)
                startdate = new Date(startdate)
                duration = 12
                startdate = startdate.setMonth(startdate.getMonth() - duration)
            } else {
                startdate = Date.UTC(currentdate.getFullYear(), currentdate.getMonth(), currentdate.getDate(), 0, 0, 0, 1)
                startdate = new Date(startdate)
                duration = 10
                startdate = startdate.setDate( startdate.getDate() - (duration-1) )
                startdate = new Date(startdate)
            }
            const copystrartdate = new Date(startdate.getTime())

            // Set Label
            const Label = GetLabel(req.params.DayMonth, startdate, duration)
            reponse.ConnectionData.Label = Label.LabelTexte

            // get stat connection page app
            reponse.ConnectionData.StatAppPage = null
            // ToDo

            // get all valide connection for all user
            const ConnectionValided = require("../N_Log/Log").Stat_ConnectionValided
            reponse.ConnectionData.StatValideConnection = await GetConnectionStat(req.params.DayMonth, ConnectionValided, copystrartdate, Label.LabelDetail)
            // ToDo

            // get all error connection
            const ConnectionError = require("../N_Log/Log").Stat_ConnectionError
            reponse.ConnectionData.StatErrorConnection = await GetConnectionStat(req.params.DayMonth, ConnectionError, copystrartdate, Label.LabelDetail)
            // ToDo
        } else {
            // get connection data for one user
            // ToDo
        }
        
        // Send reponse
        res.send(reponse)
    } catch (error) {
        const errormsg = `API Stat Connection error: ${error}`
        LogError(errormsg, req.user)
        res.status(500).send(errormsg)
    }
})

router.get("/page/:DayMonth/:OnePage", AuthAdmin, (req, res) => {
    LogInfo(`API nanoxadminstat : get page data`, req.user)
    // Get page data
    // ToDo
    console.log(req.params.DayMonth)
    console.log(req.params.OnePage)
    res.send("Ok page")
})

router.get("/api/:DayMonth/:OneApi/:UserId", AuthAdmin, async (req, res) => {
    LogInfo(`API nanoxadminstat : get api data`, req.user)

    console.log(req.params.DayMonth)
    console.log(req.params.OneApi)
    console.log(req.params.UserId)

    let reponse = {ListOfUser: null, ApiData: null}
    try {
        if (req.params.UserId == "alluser"){
            // get all user
            reponse.ListOfUser = await GetAllUser()
        }
        // get api data
        // ToDo

        // Send reponse
        res.send(reponse)
    } catch (error) {
        const errormsg = `API Stat api error: ${error}`
        LogError(errormsg, req.user)
        res.status(500).send(errormsg)
    }
})




module.exports = router