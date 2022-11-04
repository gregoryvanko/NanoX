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

function GetStartDate(TypeAgregation, Duration){
    let startdate = null
    let currentdate = new Date()
    if (TypeAgregation == "month"){
        startdate = Date.UTC(currentdate.getFullYear(), currentdate.getMonth() - (Duration-1), 1, 0, 0, 0, 1)
        startdate = new Date(startdate)
    } else {
        startdate = Date.UTC(currentdate.getFullYear(), currentdate.getMonth(), currentdate.getDate() - (Duration-1), 0, 0, 0, 1)
        startdate = new Date(startdate)
    }
    return startdate
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
async function GetConnectionStat(TypeAgregation, TypeConnection, StartDate, LabelDetail, UserId = null){
    return new Promise((resolve, reject)=>{
        let ModelLog = require("../N_Log/Model_Log")

        let MatchQuerry = null
        if (UserId == null){
            MatchQuerry = {$and:[{Type: "Stat"} , {Valeur:  TypeConnection}, {Date: {$gte: StartDate}}]} 
        } else {
            MatchQuerry = {$and:[{Type: "Stat"} , {Valeur:  TypeConnection}, {Date: {$gte: StartDate}}, {UserId:  UserId}]} 
        }

        let GroupQuerry = null
        if (TypeAgregation == "month"){
            GroupQuerry = {$month: "$Date"}
        } else {
            GroupQuerry = { $dateToString: { format: "%Y-%m-%d", date: "$Date" } }
        }

        ModelLog.aggregate(
            [
                { 
                    $match: MatchQuerry
                },
                {
                    $group: {
                        _id: GroupQuerry,
                        count: { $sum: 1 }
                    }
                }
            ],
            (err, result) => {
                if (err) {
                    reject(`Mongoose aggragate connection stat error => ${err}`)
                } else {
                    let output = []
                    // convertir le resutat [ { _id: '2022-11-04', count: 1 }, { _id: '2022-11-02', count: 1 } ] en tableau pour le graph
                    LabelDetail.forEach(element => {
                        let SearchKey = null
                        if (TypeAgregation == "month"){
                            SearchKey = element.Mois
                        } else {
                            SearchKey = element.Date.toISOString().split('T')[0]
                        }
                        
                        let LabelValue = result.find(data => data._id == SearchKey)
                        if (LabelValue){
                            output.push(LabelValue.count)
                        } else {
                            output.push(0)
                        }
                    });
                    //console.log(LabelDetail)
                    //console.log(result)
                    //console.log(output)
                    resolve(output)
                }
            }
        )
    })
}

module.exports.GetallUser = GetAllUser
module.exports.GetStartDate = GetStartDate
module.exports.GetLabel = GetLabel
module.exports.GetConnectionStat = GetConnectionStat