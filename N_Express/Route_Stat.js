const LogInfo = require("../index").NanoXLogInfo
const LogError = require("../index").NanoXLogError
//const AuthBasic = require("./Mid_AuthBasic")
const AuthAdmin = require("./Mid_AuthAdmin")

const GetAllUser = require("./AdminStat").GetallUser

const express = require("express")
const router = express.Router()

router.get("/connection/:DayMonth/:UserId", AuthAdmin, async (req, res) => {
    LogInfo(`API nanoxadminstat : get connection data`, req.user)

    console.log(req.params.DayMonth)
    console.log(req.params.UserId)

    let reponse = {ListOfUser: null, ConnectionData: null}
    if (req.params.UserId == "alluser"){
        try {
            // get all user
            reponse.ListOfUser = await GetAllUser()
            // get connection data
            
            // send reponse
            res.send(reponse)
        } catch (error) {
            const errormsg = `Connection error: ${error}`
            LogError(errormsg, req.user)
            res.status(500).send(errormsg)
        }
    } else {
        // get connection data for one user

        // send reponse
        res.send(reponse)
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