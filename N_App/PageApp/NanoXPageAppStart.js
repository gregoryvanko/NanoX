
function GetJs(){
    let output = 
`
let MyNanoXCore = new NanoXCore()
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