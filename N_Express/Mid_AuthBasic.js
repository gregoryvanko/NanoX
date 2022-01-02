let LogError = require("../index").NanoXLogError

module.exports = (req, res, next) => {
    const token = req.header("x-auth-token")
    if (!token){
        LogError("Token is missing in AuthBasic middleware")
        return res.status(401).send({Error: true, ErrorMsg: "Token is missing in AuthBasic middleware"})
    }

    const TokenDecript = require("../N_Crypt/Crypt").DecryptDataToken(token)
    if(!TokenDecript.TokenValide){
        LogError(`Token not decripted: ${TokenDecript.ErrorMsg}`)
        return res.status(401).send({Error: true, ErrorMsg: "Token not decrypted"})
    }
    req.user = TokenDecript.TokenData.data
    next()
}