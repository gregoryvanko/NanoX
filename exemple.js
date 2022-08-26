const Option = {
    Port:5000,
    Name:"NanoXDev",
    Debug: true,
    MongoDbUrl: "mongodb://mongodev:27017"
}
require('./TestApp/indexTestApp').Start(Option)