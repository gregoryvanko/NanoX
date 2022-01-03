let LogInfo = require("../index").NanoXLogInfo
let LogError = require("../index").NanoXLogError
const AuthBasic = require("./Mid_AuthBasic")


const express = require("express")
const router = express.Router()

let ModelUsers = require("../N_Mongoose/Model_User")

// Get user info
router.get("/", AuthBasic, (req, res) => {
    LogInfo(`API nanoxuser : get user data`, req.user)
    // Get User info
    ModelUsers.findById(req.user.Id)
    .then(user => {
        if (user != null){
            let UserInfo = user
            UserInfo.Password = null
            res.send({Error: false, ErrorMsg: "no error",  Data:UserInfo})
        } else {
            res.status(500).send({Error: true, ErrorMsg: "User not found"})
            LogError(`User not found`, req.user)
        }
    })
    .catch((err) => {
        LogError(`Mongoose find error: ${err.message}`, req.user)
        res.status(500).send({Error: true, ErrorMsg: "Mongoose find user error"})
    })
})

// Update user info
router.patch("/", AuthBasic, (req, res) => {
    ModelUsers.findById(req.user.Id)
    .then(user => {
        if (user != null){
            if (req.body.FirstName != null){
                user.FirstName = req.body.FirstName
            }
            if (req.body.LastName != null){
                user.LastName = req.body.LastName
            }
            if (req.body.Password != null){
                user.Password = req.body.Password
            }
            user.save()
            .then(() => {
                // Create user data
                let UserData = {User: user.User, Id: user._id, FirstName: user.FirstName, LastName: user.LastName}
                // Create token
                let token = require("../N_Crypt/Crypt").EncryptDataToken(UserData)
                res.send({Error: false, ErrorMsg: "no error",  Data:{Token: token}})
                LogInfo("User updated")
            })
            .catch((err) => {
                res.status(500).json({Error: true, ErrorMsg: "User update error"})
                LogError(`Mongoose update user error: ${err.message}`)
            })

        } else {
            res.status(500).send({Error: true, ErrorMsg: "User not found"})
            LogError(`User not found`, req.user)
        }
    })
    .catch((err) => {
        LogError(`Mongoose find error: ${err.message}`, req.user)
        res.status(500).send({Error: true, ErrorMsg: "Mongoose find user error"})
    })
})

module.exports = router