let mongoose = require("mongoose")

let UsersSchema = new mongoose.Schema({
    User: String,
    FirstName: String,
    LastName: String,
    Password: String,
    Admin: Boolean
}, { collection:'User'});

module.exports = mongoose.model('User', UsersSchema)