function GetJs(){
    let NanoXAppOption = require("../../index").NanoXGetNanoXAppOption()
    let output = 
`
let MyNanoXCore = new NanoXCore(${JSON.stringify(NanoXAppOption)})

function NanoXGetDivApp(){return MyNanoXCore.GetDivApp()}

MyNanoXCore.Start()
`
    return output
}

function GetCss(){
    let Output = 
`
`
    return Output
}

module.exports.GetJs = GetJs
module.exports.GetCss = GetCss