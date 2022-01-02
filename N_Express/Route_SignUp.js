let LogInfo = require("../index").NanoXLogInfo
let LogError = require("../index").NanoXLogError

const express = require("express")
const router = express.Router()

// SignUp user
router.post("/", (req, res) => {
    LogInfo(`API nanoxSignUp : ${JSON.stringify(req.body)}`)
    if (req.body.User && req.body.FirstName && req.body.LastName && req.body.Password){
        let ModelUsers = require("../N_Mongoose/Model_User")
        const NewUser = new ModelUsers({
            User: req.body.User, 
            FirstName: req.body.FirstName, 
            LastName: req.body.LastName, 
            Password: req.body.Password, 
            Admin: false}
            )
        NewUser.save()
        .then(() => {
            res.send({Error: false, ErrorMsg: "no error"})
            LogInfo("New User Added from nanoxSignUp")
        })
        .catch((err) => {
            res.status(500).json({Error: true, ErrorMsg: "User creation error"})
            LogError(`Mongoose create user error: ${err.message}`)
        })
    } else {
        res.status(500).json({Error: true, ErrorMsg: "Missing data in request"})
        LogError("Missing data in request")
    }
})


module.exports = router