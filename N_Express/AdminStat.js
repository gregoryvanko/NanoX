async function GetAllUser(){
    return new Promise ((resolve, reject)=>{
        let ModelUsers = require("../N_Mongoose/Model_User")

        const Projection = { User: 1, FirstName: 1, LastName: 1}
        const Querry = {}

        ModelUsers.find(Querry, Projection, (err, result) => {
            if (err) {
                reject(`Mongoose find all user error => ${err}`)
            } else {
                resolve(result) 
            }
        })
        
    })
}

module.exports.GetallUser = GetAllUser