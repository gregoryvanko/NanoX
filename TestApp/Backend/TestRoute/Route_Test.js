const express = require('../../../index').Express

const router = express.Router()

router.get("/", (req, res) => {
    //res.send({Valide: true, Message:"route de test"})
    const path = require('path');
    res.sendFile(path.join(__dirname, '/TestHtmlPage.html'));
})

module.exports = router