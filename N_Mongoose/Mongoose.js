let mongoose = require("mongoose")

function Connect(MongoDB = "MyNanoXApp", MongoUrl = "mongodb://localhost:27017"){
    return new Promise(async (resolve) => {
        mongoose.connection
        .once("open", function() {
            console.log("MongoDB connected successfully")
        })
        .on('error', function (err) {  
            console.log('Mongoose default connection error: ' + err);
            process.exit(1)
        });

        await mongoose.connect(`${MongoUrl}/${MongoDB}`, {useNewUrlParser: true, useUnifiedTopology: true})
        resolve()
    })
}

function InitiationUserCollection(){
    return new Promise(async (resolve) => {
        await mongoose.connection.db.listCollections().toArray((err, names) => {
            if (err) {
                console.log(err)
                process.exit(1)
            } else {
                let UserCollectionNotfound = true
                let ModelUsers = require("./Model_User")
                names.forEach(element => {
                    if ((element.type == "collection") && (element.name == "NanoXUser")){
                        UserCollectionNotfound = false
                        ModelUsers.count({}, function( err, count){
                            if (count != 0){
                                console.log("User Collection found and not empty")
                                resolve()
                            } else {
                                console.log("User Collection found but empty, creation of Admin user")
                                const NewUser = new ModelUsers({User: "Admin", FirstName: "AdminFirstName", LastName: "AdminLastName", Password: "Admin", Admin: true})
                                NewUser.save().catch(err => console.log(err))
                                resolve()
                            }
                        })
                    }
                })
                if (UserCollectionNotfound){
                    console.log("User Collection not found, creation of Admin user")
                    const NewUser = new ModelUsers({User: "Admin", FirstName: "AdminFirstName", LastName: "AdminLastName", Password: "Admin", Admin: true})
                    NewUser.save().catch(err => console.log(err))
                    resolve()
                }
            }
        })
    })
}

module.exports.Connect = Connect
module.exports.InitiationUserCollection = InitiationUserCollection