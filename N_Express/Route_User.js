let LogInfo = require("../index").NanoXLogInfo
let LogError = require("../index").NanoXLogError
const AuthBasic = require("./Mid_AuthBasic")


const express = require("express")
const router = express.Router()

// Get user info
router.get("/", AuthBasic, (req, res) => {
    LogInfo(`API nanoxuser : get user data`, {Name: req.user.User, Id: req.user._id})
    res.send({Error: false, ErrorMsg: "no error",  Data:req.user})
})

// Modify user info
// ToDo

module.exports = router