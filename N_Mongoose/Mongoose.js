let mongoose = require("mongoose")

async function Connect(MongoDB = "MyNanoXApp", MongoUrl = "mongodb://localhost:27017"){
    await mongoose.connect(`${MongoUrl}/${MongoDB}`, {useNewUrlParser: true, useUnifiedTopology: true}).catch(err => console.log(err))
    let db = mongoose.connection
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
}

module.exports.Connect = Connect