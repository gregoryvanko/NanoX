const express = require('../../../index').Express

const router = express.Router()

router.get("/", (req, res) => {
    res.send({Valide: true, Message:"route de test"})
})

module.exports = router