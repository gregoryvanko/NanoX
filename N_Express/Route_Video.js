let LogError = require("../index").NanoXLogError

const router = require("express").Router()

router.get("/*", (req, res) => {
    let token = req.query["token"]
    if (!token){
        LogError(`Token is missing in video link`)
        return res.status(401).send("Token is missing in video")
    }

    const TokenDecript = require("../N_Crypt/Crypt").DecryptDataToken(token)
    if(!TokenDecript.TokenValide){
        LogError(`Token in video link not decrypted`)
        return res.status(401).send("Token in video link not decrypted")
    }
    res.status(200).send(``)
})

module.exports = router