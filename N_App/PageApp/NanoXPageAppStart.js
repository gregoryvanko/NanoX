function GetJsStart(){
    let NanoXAppOption = require("../../index").NanoXGetNanoXAppOption()
    let output = 
`
let MyNanoXCore = new NanoXCore(${JSON.stringify(NanoXAppOption)})

function NanoXStartApp(){
    MyNanoXCore.Start()
}

function NanoXGetDivApp(){
    return MyNanoXCore.GetDivApp()
}

function NanoXShowMenuBar(Show = true){
    MyNanoXCore.MenuBar.ShowMenuBar(Show, false)
}

function NanoXSetMenuBarTransparent(Transparent = fase){
    MyNanoXCore.MenuBar.SetMenuBarTransparent(Transparent)
}

function NanoXShowNameInMenuBar(Show = true){
    MyNanoXCore.MenuBar.ShowNameInMenuBar(Show)
}

function NanoXAddMenuButtonLeft(Id = null, Titre= null, Svg= null, Action= null){
    MyNanoXCore.MenuBar.AddMenuButtonLeft(Id, Titre, Svg, Action)
}

function NanoXClearMenuButtonLeft(){
    MyNanoXCore.MenuBar.ClearMenuButtonLeft()
}

function NanoXAddMenuButtonRight(Id= null, Titre= null, Svg= null, Action= null){
    MyNanoXCore.MenuBar.AddMenuButtonRight(Id, Titre, Svg, Action)
}

function NanoXClearMenuButtonRight(){
    MyNanoXCore.MenuBar.ClearMenuButtonRight()
}

function NanoXAddModule(Titre= null, Svg= null, Start= null, StartWithThisModule= false){
    if (MyNanoXCore.ModuleApp != null){
        MyNanoXCore.ModuleApp.AddModule(Titre, Svg, Start, StartWithThisModule)
    }
}

function NanoXStartHomeModule(){
    MyNanoXCore.ModuleApp.Start()
}
`
    return output
}

function GetJsEnd(){
    let output = 
`
NanoXStartApp()
`
    return output
}

module.exports.GetJsStart = GetJsStart
module.exports.GetJsEnd = GetJsEnd