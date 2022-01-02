let MyAppSecret = require("../index").NanoXGetAppSecret()

function EncryptDataToken(DBData){
    // creation d'un JWT
    let jwt = require('jsonwebtoken');
    var token = jwt.sign({ data: DBData }, MyAppSecret);
    // encrytion du JWT
    let Encrypttoken = Encrypt(token)
    return Encrypttoken
}

function Encrypt(text){
    const Cryptr = require('cryptr');
    const cryptr = new Cryptr(MyAppSecret);
    const encryptedString = cryptr.encrypt(text);
    return encryptedString
}

function DecryptDataToken(token){
    let reponse = {TokenValide: false, TokenData: null, ErrorMsg: "no error message"}
    let DecryptReponse = Decrypt(token)
    if(DecryptReponse.decryptedValide){
        let jwt = require('jsonwebtoken')
        try {
            reponse.TokenData = jwt.verify(DecryptReponse.decryptedData, MyAppSecret)
            reponse.TokenValide = true
        } catch(err) {
            reponse.ErrorMsg = "jsonwebtoken non valide"
        }
    } else {
        reponse.ErrorMsg = DecryptReponse.ErrorMsg
    }
    return reponse
}

function Decrypt(text){
    let reponse = {decryptedValide: false, decryptedData : "", ErrorMsg: "no error message"}
    let Cryptr = require('cryptr')
    let cryptr = new Cryptr(MyAppSecret)
    try {
        reponse.decryptedData = cryptr.decrypt(text)
        reponse.decryptedValide = true
    } catch (error) {
        reponse.ErrorMsg = "cryptr non valide"
    }
    return reponse
}

module.exports.EncryptDataToken = EncryptDataToken
module.exports.DecryptDataToken = DecryptDataToken