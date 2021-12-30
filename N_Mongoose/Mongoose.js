let mongoose = require("mongoose")

async function Connect(MongoDB = "MyNanoXApp", MongoUrl = "mongodb://localhost:27017"){
    mongoose.connection
    .once("open", function() {
        console.log("MongoDB connected successfully")
    })
    .on('error', console.error.bind(console, 'MongoDB connection error:'));
    await mongoose.connect(`${MongoUrl}/${MongoDB}`, {useNewUrlParser: true, useUnifiedTopology: true}).catch(err => console.log(err))
}

function InitiationUserCollection(){
    mongoose.connection.db.listCollections().toArray((err, names) => {
        if (err) {
            console.log(err)
        } else {
            let FindUserCollection = false
            names.forEach(element => {
                if ((element.type == "collection") && (element.name == "User")){
                    FindUserCollection = true
                }
            })
            if (FindUserCollection){
                console.log("User Collection exist")
            } else {
                console.log("User Collection not found, creation of Admin user")
                var ModelUsers = require("./Model_User")
                const NewUser = new ModelUsers({User: "Admin", FirstName: "AdminFirstName", LastName: "AdminLastName", Password: "Admin", Admin: true})
                NewUser.save().catch(err => console.log(err))
            }
        }
    })
}

module.exports.Connect = Connect
module.exports.InitiationUserCollection = InitiationUserCollection