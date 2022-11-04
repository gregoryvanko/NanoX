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

function GetLabel (Type, StartDate, Duration){
    let Label = {LabelDetail: [], LabelTexte: []}
    if (Type == "month"){
        for (let index = 0; index < Duration; index++){
            const TheJour = StartDate.getDate()
            const TheMois = StartDate.getMonth() + 1
            Label.LabelDetail.push({Date: new Date(StartDate.getTime()), Jour: TheJour, Mois: TheMois})
            Label.LabelTexte.push(TheMois.toString())
            StartDate.setMonth( StartDate.getMonth() +1 )
        }
    } else {
        for (let index = 0; index < Duration; index++){
            const TheJour = StartDate.getDate()
            const TheMois = StartDate.getMonth() + 1
            Label.LabelDetail.push({Date: new Date(StartDate.getTime()), Jour: TheJour, Mois: TheMois})
            Label.LabelTexte.push(TheJour.toString() + "/" + TheMois.toString())
            StartDate.setDate( StartDate.getDate() +1 )
        }
    }
    return Label
}

/**
 * Retourne un tableau contenat la somme des type de connection par jour ou mois
 * @param {String} TypeAgregation Type d' agregation (day, month)
 * @param {String} TypeConnection Type de connection (ConnectionError, ConnectionValided)
 * @param {Date} StartDate Date de debut de la recherche
 * @param {Object} LabelDetail Detail des label
 * @returns {Promise<[Number]>}
 */
async function GetConnectionStat(TypeAgregation, TypeConnection, StartDate, LabelDetail){
    return new Promise((resolve, reject)=>{
        let ModelLog = require("../N_Log/Model_Log")
        ModelLog.aggregate(
            [
                { $match: {$and:[{Type: "Stat"} , {Valeur:  TypeConnection}, {Date: { $gte: StartDate }} ]} },
                {
                    $group: {
                        _id: { $dateToString: { format: "%Y-%m-%d", date: "$Date" } },
                        count: { $sum: 1 }
                    }
                }
            ],
            (err, result) => {
                if (err) {
                    reject(`Mongoose aggragate connection stat error => ${err}`)
                } else {
                    console.log(result)
                    // ToDo convertir le resutat [ { _id: '2022-11-04', count: 1 }, { _id: '2022-11-02', count: 1 } ] en tableau pour le graph
                    
                    resolve(result)
                }
            }
        )
    })
}

module.exports.GetallUser = GetAllUser
module.exports.GetLabel = GetLabel
module.exports.GetConnectionStat = GetConnectionStat