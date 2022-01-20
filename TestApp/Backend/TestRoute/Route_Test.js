const express = require('../../../index').Express

const AuthBasic = require('../../../index').NanoXAuthBasic
const AuthAdmin = require('../../../index').NanoXAuthAdmin

const router = express.Router()

router.get("/", AuthAdmin, (req, res) => {
    res.send({Valide: true, Message:"route de test"})
    //const path = require('path');
    //res.sendFile(path.join(__dirname, '/TestHtmlPage.html'));
})

router.post("/", (req, res) => {
    if (req.body.Livre && req.body.Auteur){
        res.send({Valide: true, Message:"Livre ok"})
    } else{
        res.status(500).json({Error: true, ErrorMsg: "Livre or Auteur missing"})
    }
})

module.exports = router