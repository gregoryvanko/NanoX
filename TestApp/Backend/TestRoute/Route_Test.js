const express = require('../../../index').Express

const AuthBasic = require('../../../index').NanoXAuthBasic
const AuthAdmin = require('../../../index').NanoXAuthAdmin

const LogStatApi = require("../../../index").NanoXLogStatApi

const router = express.Router()

router.get("/", AuthAdmin, (req, res) => {
    LogStatApi("test", "get", req.user)
    res.send({Valide: true, Message:"route de test"})
    //res.status(500).send("Authentication error")
    //const path = require('path');
    //res.sendFile(path.join(__dirname, '/TestHtmlPage.html'));
})

router.post("/", (req, res) => {
    LogStatApi("test", "post", req.user)
    if (req.body.Livre && req.body.Auteur){
        res.send({Valide: true, Message:"Livre ok"})
    } else{
        res.status(500).send("Livre or Auteur missing")
    }
})

module.exports = router