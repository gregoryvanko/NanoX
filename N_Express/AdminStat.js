async function GetAllUser(){
    return new Promise ((resolve, reject)=>{
        const ListeOfUser = [{nom: "van ko", prenom: "Aurore", _id: "1234"}, {nom: "van konin", prenom: "gregory", _id: "5678"}]
        resolve(ListeOfUser)
    })
}

module.exports.GetallUser = GetAllUser