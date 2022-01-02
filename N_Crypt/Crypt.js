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

module.exports.EncryptDataToken = EncryptDataToken