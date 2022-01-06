let LogError = require("../index").NanoXLogError

module.exports = (req, res, next) => {
    const token = req.header("x-auth-token")
    if (!token){
        LogError("Token is missing in AuthBasic middleware")
        return res.status(401).send({ErrorMsg: "Token is missing in AuthBasic middleware"})
    }

    const TokenDecript = require("../N_Crypt/Crypt").DecryptDataToken(token)
    if(!TokenDecript.TokenValide){
        LogError(`Token not decripted: ${TokenDecript.ErrorMsg}`)
        return res.status(401).send({ErrorMsg: "Token not decrypted"})
    }

    const _id = TokenDecript.TokenData.data._id
    if (!_id){
        LogError(`_id not found in token: ${JSON.stringify(TokenDecript.TokenData.data)}`)
        return res.status(401).send({ErrorMsg: "_id not found in token"})
    }

    // Get User
    let ModelUsers = require("../N_Mongoose/Model_User")
    ModelUsers.findById(_id)
    .then(user => {
        if (user != null){
            if (user.Admin){
                req.user = {_id:user._id, User:user.User, FirstName:user.FirstName, LastName:user.LastName, Admin:user.Admin}
                next()
            } else {
                LogError(`User not Admin`, user)
                return res.status(401).send({ErrorMsg: "User not Admin"})
            }
        } else {
            LogError(`User not found by id in Auth Admin`)
            return res.status(401).send({ErrorMsg: "User not found by id in Admin Auth"})
        }
    })
    .catch((err) => {
        LogError(`Mongoose find error in Auth Admin: ${err.message}`)
        return res.status(401).send({ErrorMsg: "Mongoose find error in Admin Auth"})
    })
}