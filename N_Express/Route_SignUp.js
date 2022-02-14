let LogInfo = require("../index").NanoXLogInfo
let LogError = require("../index").NanoXLogError

const express = require("express")
const router = express.Router()

// SignUp user
router.post("/", (req, res) => {
    LogInfo(`API nanoxsignup : ${JSON.stringify(req.body)}`)
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
                .then((User) => {
                    // Create user data
                    let UserData = {_id: User._id}
                    // Create token
                    let token = require("../N_Crypt/Crypt").EncryptDataToken(UserData)
                    res.send({Token: token})
                    LogInfo("New User Added from nanoxsignup")
                })
                .catch((err) => {
                    res.status(500).send("User creation error")
                    LogError(`Mongoose create user error: ${err.message}`)
                })
            } else {
                res.status(500).send("SignUp error: user already exist")
                LogError(`SignUp error: user already exist`)
            }
        })
        .catch((err) => {
            LogError(`Mongoose find error: ${err.message}`)
            res.status(500).send("Mongoose find error")
        })
    } else {
        res.status(500).send("Missing data in request")
        LogError("Missing data in request")
    }
})


module.exports = router