function GetJsStart(){
    let NanoXAppOption = require("../../index").NanoXGetNanoXAppOption()
    let output = 
`
let MyNanoXCore = new NanoXCore(${JSON.stringify(NanoXAppOption)})

function NanoXGetDivApp(){return MyNanoXCore.GetDivApp()}

function NanoXShowMenuBar(Show = true){
    MyNanoXCore.ShowMenuBar(Show)
}

function NanoXSetMenuBarTransparent(Transparent = fase){
    MyNanoXCore.SetMenuBarTransparent(Transparent)
}

function NanoXShowNameInMenuBar(Show = true){
    MyNanoXCore.ShowNameInMenuBar(Show)
}

function NanoXAddMenuButtonLeft(Id = null, Titre= null, Svg= null, Action= null){
    MyNanoXCore.AddMenuButtonLeft(Id, Titre, Svg, Action)
}

function NanoXClearMenuButtonLeft(){
    MyNanoXCore.ClearMenuButtonLeft()
}

function NanoXAddMenuButtonRight(Id = null, Titre= null, Svg= null, Action= null){
    MyNanoXCore.AddMenuButtonRight(Id, Titre, Svg, Action)
}

function NanoXClearMenuButtonRight(){
    MyNanoXCore.ClearMenuButtonRight()
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