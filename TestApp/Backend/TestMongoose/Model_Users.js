let Mongoose = require('../../../index').Mongoose

let UsersSchema = new Mongoose.Schema({
    Nom: String,
    Prenom: String
}, { collection:'User'});

module.exports = Mongoose.model('User', UsersSchema)