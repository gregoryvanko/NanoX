
function GetJs(){
    let output = 
`
let MyNanoXCore = new NanoXCore()

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