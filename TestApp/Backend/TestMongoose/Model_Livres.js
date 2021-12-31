let Mongoose = require('../../../index').Mongoose

let LivresSchema = new Mongoose.Schema({
    Nom: String,
    Auteur: String
}, { collection:'Livre'});

module.exports = Mongoose.model('Livre', LivresSchema)