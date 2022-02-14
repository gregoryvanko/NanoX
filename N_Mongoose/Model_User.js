let mongoose = require("mongoose")

let UsersSchema = new mongoose.Schema({
    User: String,
    FirstName: String,
    LastName: String,
    Password: String,
    Admin: Boolean
}, { collection:'NanoXUser'});

module.exports = mongoose.model('NanoXUser', UsersSchema)