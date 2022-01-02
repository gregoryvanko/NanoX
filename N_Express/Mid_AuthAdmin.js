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
    let TokenUserData = TokenDecript.TokenData.data

    // Get User
    let ModelUsers = require("../N_Mongoose/Model_User")
    ModelUsers.find({ User: TokenUserData.User})
        .then(users => {
            if (users.length == 1){
                let FoundUser = users[0]
                if (FoundUser.Admin){
                    req.user = TokenUserData
                    next()
                } else {
                    LogError(`User not Admin`, {Name: TokenUserData.User, Id: TokenUserData._id})
                    return res.status(401).send({Error: true, ErrorMsg: "User not Admin"})
                }
            } else {
                LogError(`Number of User found not equal to 1`, {Name: TokenUserData.User, Id: TokenUserData._id})
                return res.status(401).send({Error: true, ErrorMsg: "Number of User found not equal to 1"})
            }
        })
        .catch((err) => {
            LogError(`Mongoose find error: ${err.message}`, {Name: TokenUserData.User, Id: TokenUserData._id})
            return res.status(401).send({Error: true, ErrorMsg: "Mongoose find error"})
        })
}