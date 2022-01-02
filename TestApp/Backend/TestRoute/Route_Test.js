const express = require('../../../index').Express

const router = express.Router()

router.get("/", (req, res) => {
    //res.send({Valide: true, Message:"route de test"})
    const path = require('path');
    res.sendFile(path.join(__dirname, '/TestHtmlPage.html'));
})

router.post("/", (req, res) => {
    if (req.body.Livre && req.body.Auteur){
        console.log(req.body)
        res.send({Valide: true, Message:"Livre ok"})
    } else{
        res.status(500).json({Error: true, ErrorMsg: "Livre or Auteur missing"})
    }
})

module.exports = router