let LogInfo = require("../index").NanoXLogInfo
let LogError = require("../index").NanoXLogError

const express = require("express")
const router = express.Router()

// SignUp user
router.post("/", (req, res) => {
    LogInfo(`API nanoxSignUp : ${JSON.stringify(req.body)}`)
    if (req.body.User && req.body.FirstName && req.body.LastName && req.body.Password){
        // Creer le user si il n'exite pas
        let ModelUsers = require("../N_Mongoose/Model_User")
        // cherhcer l existance du user
        ModelUsers.find({ User: req.body.User})
        .then(users => {
            if (users.length == 0){
                // creation new user
                const NewUser = new ModelUsers({
                    User: req.body.User, 
                    FirstName: req.body.FirstName, 
                    LastName: req.body.LastName, 
                    Password: req.body.Password, 
                    Admin: false
                })
                // save new user
                NewUser.save()
                .then(() => {
                    res.send({ErrorMsg: "no error"})
                    LogInfo("New User Added from nanoxSignUp")
                })
                .catch((err) => {
                    res.status(500).json({ErrorMsg: "User creation error"})
                    LogError(`Mongoose create user error: ${err.message}`)
                })
            } else {
                res.status(500).send({ErrorMsg: "SignUp error: user already exist"})
                LogError(`SignUp error: user already exist`)
            }
        })
        .catch((err) => {
            LogError(`Mongoose find error: ${err.message}`)
            res.status(500).send({ErrorMsg: "Mongoose find error"})
        })
    } else {
        res.status(500).json({ErrorMsg: "Missing data in request"})
        LogError("Missing data in request")
    }
})


module.exports = router