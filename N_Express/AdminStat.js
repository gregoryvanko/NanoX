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

function SetLabel (Type, TheDate, Duration){
    let Label = []
    if (Type == "month"){
        
        TheDate.setMonth(TheDate.getMonth() - Duration)
        for (let index = 0; index < Duration; index++){
            Label.push({Date: new Date(TheDate.getTime()), Jour: TheDate.getDate(), Mois: TheDate.getMonth() + 1})
            TheDate.setMonth( TheDate.getMonth() +1 )
        }
    } else {
        TheDate.setDate( TheDate.getDate() - (Duration-1) )
        for (let index = 0; index < Duration; index++){
            Label.push({Date: new Date(TheDate.getTime()), Jour: TheDate.getDate(), Mois: TheDate.getMonth() + 1})
            TheDate.setDate( TheDate.getDate() +1 )
        }
    }
    return Label
}

module.exports.GetallUser = GetAllUser
module.exports.SetLabel = SetLabel