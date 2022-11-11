const LogError = require("../index").NanoXLogError
const LogStatApi = require("../index").NanoXLogStatApi
//const AuthBasic = require("./Mid_AuthBasic")
const AuthAdmin = require("./Mid_AuthAdmin")

const GetAllUser = require("./AdminStat").GetallUser
const GetStartDate = require("./AdminStat").GetStartDate
const GetLabel = require("./AdminStat").GetLabel
const GetConnectionStat = require("./AdminStat").GetConnectionStat
const GetPageStat = require("./AdminStat").GetPageStat
const GetApiLabel = require("./AdminStat").GetApiLabel
const GetApiStat = require("./AdminStat").GetApiStat

const express = require("express")
const router = express.Router()

router.get("/connection/:DayMonth/:UserId", AuthAdmin, async (req, res) => {
    LogStatApi("nanoxadminstat/connection", "get", req.user)

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

router.get("/page/:DayMonth/:OnePage", AuthAdmin, async (req, res) => {
    LogStatApi("nanoxadminstat/page", "get", req.user)

    const PageNameValue = (req.params.OnePage == "NanoXEmptyValue")? "" : req.params.OnePage

    // reponse envoyée au client
    let reponse = {ListOfPage: null, PageData: {Label: null, ListeOfStatPage: null}}

    // start Date definition
    const duration = (req.params.DayMonth == "month")? 12 : 30
    let startdate = GetStartDate(req.params.DayMonth, duration)
    const copystrartdate = new Date(startdate.getTime())

    // Set ListOfPage
    reponse.ListOfPage = require("../index").NanoXGetListOfPageRoute()

    // Set Label
    const Label = GetLabel(req.params.DayMonth, startdate, duration)
    reponse.PageData.Label = Label.LabelTexte

    try {
        // Get stat of pages
        reponse.PageData.ListeOfStatPage = await GetPageStat(req.params.DayMonth, copystrartdate, Label.LabelDetail, PageNameValue, reponse.ListOfPage)
        
        // Send reponse
        res.send(reponse)
    } catch (error) {
        const errormsg = `API Stat Connection error: ${error}`
        LogError(errormsg, req.user)
        res.status(500).send(errormsg)
    }
})

router.get("/api/:DayMonth/:OneApi/:UserId", AuthAdmin, async (req, res) => {
    LogStatApi("nanoxadminstat/api", "get", req.user)

    let reponse = {ListOfUser: null, ListOfApi: null, ApiData: {Label: null, ListeOfStatApi: null}}

    // start Date definition
    const duration = (req.params.DayMonth == "month")? 12 : 30
    let startdate = GetStartDate(req.params.DayMonth, duration)
    const copystrartdate = new Date(startdate.getTime())

    // Set Label
    const Label = GetLabel(req.params.DayMonth, startdate, duration)
    reponse.ApiData.Label = Label.LabelTexte

    try {
        if (req.params.UserId == "alluser"){
            // get all user
            reponse.ListOfUser = await GetAllUser()
        }

        // Get list of label for all apiroute
        reponse.ListOfApi = await GetApiLabel(copystrartdate)

        // Get stat of Api
        reponse.ApiData.ListeOfStatApi = await GetApiStat(req.params.DayMonth, copystrartdate, Label.LabelDetail, req.params.OneApi, reponse.ListOfApi, req.params.UserId)

        // Send reponse
        res.send(reponse)
    } catch (error) {
        const errormsg = `API Stat api error: ${error}`
        LogError(errormsg, req.user)
        res.status(500).send(errormsg)
    }
})

module.exports = router