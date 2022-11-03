const LogInfo = require("../index").NanoXLogInfo
const LogError = require("../index").NanoXLogError
//const AuthBasic = require("./Mid_AuthBasic")
const AuthAdmin = require("./Mid_AuthAdmin")

const GetAllUser = require("./AdminStat").GetallUser
const SetLabel = require("./AdminStat").SetLabel

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

            // set label
            let currentdate = new Date()
            let date = null
            let duration = 0
            if (req.params.DayMonth == "month"){
                date = new Date(currentdate.getFullYear(), currentdate.getMonth(), 1, 0, 0, 1, 0)
                duration = 12
            } else {
                date = new Date(currentdate.getFullYear(), currentdate.getMonth(), currentdate.getDay(), 0, 0, 1, 0)
                duration = 30
            }
            reponse.ConnectionData.Label = SetLabel(req.params.DayMonth, date, duration)

            // get stat connection page app
            // ToDo

            // get all valide connection for all user
            // ToDo

            // get all error connection
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