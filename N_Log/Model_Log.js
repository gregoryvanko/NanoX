let mongoose = require("mongoose")

let LogSchema = new mongoose.Schema({
    Date: { type: Date, default: Date.now() },
    Type: String,
    Valeur: String,
    User: String,
    UserId: String
}, { collection:'LogNX'});

module.exports = mongoose.model('LogNX', LogSchema)