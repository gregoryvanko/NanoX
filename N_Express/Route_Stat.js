const LogInfo = require("../index").NanoXLogInfo
const LogError = require("../index").NanoXLogError
//const AuthBasic = require("./Mid_AuthBasic")
const AuthAdmin = require("./Mid_AuthAdmin")

const GetAllUser = require("./AdminStat").GetallUser
const GetStartDate = require("./AdminStat").GetStartDate
const GetLabel = require("./AdminStat").GetLabel
const GetConnectionStat = require("./AdminStat").GetConnectionStat

const express = require("express")
const router = express.Router()

router.get("/connection/:DayMonth/:UserId", AuthAdmin, async (req, res) => {
    LogInfo(`API nanoxadminstat : get connection data`, req.user)

    // reponse envoyée au client
    let reponse = {ListOfUser: null, ConnectionData: {Label: null, StatValideConnection: null, StatErrorConnection : null}}

    // start Date definition
    const duration = (req.params.DayMonth == "month")? 12 : 30
    let startdate = GetStartDate(req.params.DayMonth, duration)
    const copystrartdate = new Date(startdate.getTime())

    // Set Label
    const Label = GetLabel(req.params.DayMonth, startdate, duration)
    reponse.ConnectionData.Label = Label.LabelTexte

    try {
        if (req.params.UserId == "alluser"){
            // get all user
            reponse.ListOfUser = await GetAllUser()

            // get all valide connection for all user
            const ApplicationLoaded = require("../N_Log/Log").Stat_ApplicationLoaded
            reponse.ConnectionData.StatValideConnection = await GetConnectionStat(req.params.DayMonth, ApplicationLoaded, copystrartdate, Label.LabelDetail, null)

            // get all error connection
            const ConnectionError = require("../N_Log/Log").Stat_ConnectionError
            reponse.ConnectionData.StatErrorConnection = await GetConnectionStat(req.params.DayMonth, ConnectionError, copystrartdate, Label.LabelDetail, null)
        } else {
            // get all valide connection for one user
            const ApplicationLoaded = require("../N_Log/Log").Stat_ApplicationLoaded
            reponse.ConnectionData.StatValideConnection = await GetConnectionStat(req.params.DayMonth, ApplicationLoaded, copystrartdate, Label.LabelDetail, req.params.UserId)
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

    // reponse envoyée au client
    let reponse = {ListOfPage: null, PageData: {Label: null, ListeOfStatPage: null}}

    // start Date definition
    const duration = (req.params.DayMonth == "month")? 12 : 30
    let startdate = GetStartDate(req.params.DayMonth, duration)
    const copystrartdate = new Date(startdate.getTime())

    // Set Label
    const Label = GetLabel(req.params.DayMonth, startdate, duration)
    reponse.PageData.Label = Label.LabelTexte

    // ToDo
    console.log(req.params.DayMonth)
    console.log(req.params.OnePage)
    res.send(reponse)
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