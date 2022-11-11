/**
 * Retourne la liste de tous les user
 * @returns {Promise<[{_id: GUID, User: String, FirstName: String, LastName: String}]>}
 */
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

/**
 * Retourne la date de debut en fonction d'aujourd'hui, de la duree et du type d'agregation
 * @param {Strin} TypeAgregation Type d'agregation (day, month)
 * @param {Number} Duration le duree que l'on veut observer
 * @returns {Date} Date de debut
 */
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

/**
 * Retourne la liste des details des labels et la liste des textes des labels
 * @param {String} Type Type d'agregatiopn (day, month)
 * @param {Date} StartDate Date de debut des label
 * @param {Number} Duration le nombre de Label
 * @returns {{LabelDetail: [{Date: Date, Jour: Number, Mois: Number}], LabelTexte: String}} un objet contenant la liste des detail du label et la liste des textes des labels
 */
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
 * @param {String} UserId UserId de l'utilisateur
 * @returns {Promise<[Number]>} Promise contenant la liste des valeurs
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

/**
 * Get graph data for stat page
 * @param {String} TypeAgregation Type d' agregation (day, month)
 * @param {Date} StartDate Date de debut de la recherche
 * @param {Object} LabelDetail detail des labels
 * @param {String} PageName Nom de la page ou "allpage"
 * @param {[String]} ListOfPage Liste de toutes les differentest Page
 * @returns {Promise<[{Page: String, Stat:[Number]}]>} Promise contenant une liste d'objet {Page: String, Stat:[Number]}
 */
async function GetPageStat(TypeAgregation, StartDate, LabelDetail, PageName, ListOfPage){
    return new Promise((resolve, reject)=>{
        const ModelLog = require("../N_Log/Model_Log")
        const LogStat_TypePage = require("../N_Log/Log").Stat_TypePage

        let MatchValue = null
        if (PageName == "allpage"){
            MatchValue = new RegExp("^"+ LogStat_TypePage)
        } else {
            MatchValue = LogStat_TypePage + "/" + PageName
        }
        let MatchQuerry = {$and:[{Type: "Stat"} , {Valeur:  MatchValue}, {Date: {$gte: StartDate}}]} 

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
                        _id: {Valeur:"$Valeur", Date:GroupQuerry},
                        count: { $sum: 1 }
                    }
                }
            ],
            (err, result) => {
                if (err) {
                    reject(`Mongoose aggragate Page stat error => ${err}`)
                } else {
                    let output = [] // Liste d'objet {Page: String, Stat:[Number]}
                    // convertir le resutat [{ _id: { Valeur: 'Page: /gg.html', Date: '2022-11-06' }, count: 2 },{ _id: { Valeur: 'Page: /', Date: '2022-11-06' }, count: 7 },{ _id: { Valeur: 'Page: /', Date: '2022-11-05' }, count: 31 }] en tableau pour le graph
                    
                    if (PageName == "allpage"){
                        ListOfPage.forEach(elementListOfPage => {
                            let reponseOnePage = {Page: "/" + elementListOfPage, Stat: []}
                            // Valeur de la page a rechercher dans le result
                            const findvalue = LogStat_TypePage + "/" + elementListOfPage
                            // trier le resulte en ne prenant que les element lié à la page
                            const subresult = result.filter(data => data._id.Valeur ==  findvalue)
                            // On definit le array pour le graph
                            LabelDetail.forEach(element => {
                                let SearchKey = null
                                if (TypeAgregation == "month"){
                                    SearchKey = element.Mois
                                } else {
                                    SearchKey = element.Date.toISOString().split('T')[0]
                                }
                                
                                let LabelValue = subresult.find(data => data._id.Date == SearchKey)
                                if (LabelValue){
                                    reponseOnePage.Stat.push(LabelValue.count)
                                } else {
                                    reponseOnePage.Stat.push(0)
                                }
                            });
                            output.push(reponseOnePage)
                        });
                    } else {
                        let reponseOnePage = {Page: "/" + PageName, Stat: []}
                        // On definit le array pour le graph
                        LabelDetail.forEach(element => {
                            let SearchKey = null
                            if (TypeAgregation == "month"){
                                SearchKey = element.Mois
                            } else {
                                SearchKey = element.Date.toISOString().split('T')[0]
                            }
                            
                            let LabelValue = result.find(data => data._id.Date == SearchKey)
                            if (LabelValue){
                                reponseOnePage.Stat.push(LabelValue.count)
                            } else {
                                reponseOnePage.Stat.push(0)
                            }
                        });
                        output.push(reponseOnePage)
                    }
                    
                    //console.log(LabelDetail)
                    //console.log(result)
                    //console.log(output)
                    resolve(output)
                }
            }
        )
    })
}

/**
 * Get la liste des toutes les differentes api enregistrée dans les log db
 * @returns {Promise<[String]} Promise contenant la liste de toutes les differentes API
 */
async function GetApiLabel(StartDate){
    return new Promise((resolve, reject)=>{
        const ModelLog = require("../N_Log/Model_Log")
        const LogStat_ApiRoute = require("../N_Log/Log").Stat_ApiRoute
        const LogStat_ApiVerbe = require("../N_Log/Log").Stat_ApiVerbe

        let MatchValue = new RegExp("^" + LogStat_ApiRoute)
        let MatchQuerry = {$and:[{Type: "Stat"} , {Valeur:  MatchValue}, {Date: {$gte: StartDate}}]} 

        ModelLog.aggregate(
            [
                { $match: MatchQuerry },
                { $group: { _id: "$Valeur"} },
                { $sort: {_id: 1} }
            ],
            (err, result) => {
                if (err) {
                    reject(`Mongoose aggragate Api stat error => ${err}`)
                } else {
                    let output = []
                    result.forEach(element => {
                        let ReadableApi = element._id.replace(LogStat_ApiRoute, '')
                        ReadableApi = ReadableApi.replace("/", ".")
                        ReadableApi = ReadableApi.replace(LogStat_ApiVerbe, "-")
                        output.push(ReadableApi)
                    });
                    //console.log(output)

                    resolve(output)
                }
            }
        )
    })
}

/**
 * Get graph data for stat api
 * @param {String} TypeAgregation Type d' agregation (day, month)
 * @param {Date} StartDate Date de debut de la recherche
 * @param {Object} LabelDetail detail des labels
 * @param {String} ApiName Nom de l'api ou "allapi"
 * @param {[String]} ListOfApi Liste de toutes les differents API
 * @param {String} UserId UserId de l'utilisateur
 * @returns {Promise<[{Api: String, Stat:[Number]}]>} Promise contenant une liste d'objets {Api: String, Stat:[Number]}
 */
async function GetApiStat(TypeAgregation, StartDate, LabelDetail, ApiName, ListOfApi, UserId){
    return new Promise((resolve, reject)=>{
        const ModelLog = require("../N_Log/Model_Log")
        const LogStat_ApiRoute = require("../N_Log/Log").Stat_ApiRoute
        const LogStat_ApiVerbe = require("../N_Log/Log").Stat_ApiVerbe

        let MatchValue = null
        if (ApiName == "allapi"){
            MatchValue = new RegExp("^"+ LogStat_ApiRoute)
        } else {
            MatchValue = ApiName.replace("-", LogStat_ApiVerbe)
            MatchValue = MatchValue.replace(".", "/")
            MatchValue = LogStat_ApiRoute + MatchValue
        }

        if (UserId == "alluser"){
            MatchQuerry = {$and:[{Type: "Stat"} , {Valeur:  MatchValue}, {Date: {$gte: StartDate}}]} 
        } else {
            MatchQuerry = {$and:[{Type: "Stat"} , {Valeur:  MatchValue}, {Date: {$gte: StartDate}}, {UserId:  UserId}]} 
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
                        _id: {Valeur:"$Valeur", Date:GroupQuerry},
                        count: { $sum: 1 }
                    }
                }
            ],
            (err, result) => {
                if (err) {
                    reject(`Mongoose aggragate Api stat error => ${err}`)
                } else {
                    let output = [] // Liste d'objet {Api: String, Stat:[Number]}
                    // convertir le resutat [{ _id: { Valeur: 'api: ', Date: '2022-11-06' }, count: 2 },{ _id: { Valeur: 'Api: ', Date: '2022-11-06' }, count: 7 }] en tableau pour le graph
                    
                    if (ApiName == "allapi"){
                        ListOfApi.forEach(elementListOfApi => {
                            let reponseOneApi = {Api: elementListOfApi, Stat: []}
                            // Valeur de la page a rechercher dans le result
                            let findvalue = elementListOfApi.replace("-", LogStat_ApiVerbe)
                            findvalue = findvalue.replace(".", "/")
                            findvalue = LogStat_ApiRoute + findvalue

                            // trier le resulte en ne prenant que les element lié à la page
                            const subresult = result.filter(data => data._id.Valeur ==  findvalue)
                            // On definit le array pour le graph
                            LabelDetail.forEach(element => {
                                let SearchKey = null
                                if (TypeAgregation == "month"){
                                    SearchKey = element.Mois
                                } else {
                                    SearchKey = element.Date.toISOString().split('T')[0]
                                }
                                
                                let LabelValue = subresult.find(data => data._id.Date == SearchKey)
                                if (LabelValue){
                                    reponseOneApi.Stat.push(LabelValue.count)
                                } else {
                                    reponseOneApi.Stat.push(0)
                                }
                            });
                            output.push(reponseOneApi)
                        });
                    } else {
                        let reponseOneApi = {Api: ApiName, Stat: []}
                        // On definit le array pour le graph
                        LabelDetail.forEach(element => {
                            let SearchKey = null
                            if (TypeAgregation == "month"){
                                SearchKey = element.Mois
                            } else {
                                SearchKey = element.Date.toISOString().split('T')[0]
                            }
                            
                            let LabelValue = result.find(data => data._id.Date == SearchKey)
                            if (LabelValue){
                                reponseOneApi.Stat.push(LabelValue.count)
                            } else {
                                reponseOneApi.Stat.push(0)
                            }
                        });
                        output.push(reponseOneApi)
                    }
                    
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
module.exports.GetPageStat = GetPageStat
module.exports.GetApiLabel = GetApiLabel
module.exports.GetApiStat = GetApiStat