function GetJsStart(){
    let NanoXAppOption = require("../../index").NanoXGetNanoXAppOption()
    let output = 
`
let MyNanoXCore = new NanoXCore(${JSON.stringify(NanoXAppOption)})

function NanoXGetDivApp(){return MyNanoXCore.GetDivApp()}

function NanoXAddActionButtonLeft(Id = null, Titre= null, Svg= null, Action= null){
    MyNanoXCore.AddActionButtonLeft(Id, Titre, Svg, Action)
}

function NanoXAddActionButtonRight(Id = null, Titre= null, Svg= null, Action= null){
    MyNanoXCore.AddActionButtonRight(Id, Titre, Svg, Action)
}
`
    return output
}

function GetJsEnd(){
    return `MyNanoXCore.Start()`
}

function GetCss(){
    let Output = 
`
`
    return Output
}

module.exports.GetJsStart = GetJsStart
module.exports.GetJsEnd = GetJsEnd
module.exports.GetCss = GetCss