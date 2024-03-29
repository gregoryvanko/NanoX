function GetJsStart(){
    let NanoXAppOption = require("../../index").NanoXGetNanoXAppOption()
    let output = 
`
let MyNanoXCore = new NanoXCore(${JSON.stringify(NanoXAppOption)})

function NanoXGetDivApp(){
    return MyNanoXCore.DivApp
}

function NanoXGetAppName(){
    return "${NanoXAppOption.AppName}"
}

function NanoXGetColorIconMenuBar(){
    return "${NanoXAppOption.ColorIconMenuBar}"
}

function NanoXShowMenuBar(Show= true, OnTop= true, Istranslucide= false){
    MyNanoXCore.MenuBar.ShowMenuBar(Show, OnTop, Istranslucide)
}

function NanoXSetMenuBarOnTop(OnTop = true){
    MyNanoXCore.MenuBar.SetMenuBarOnTop(OnTop)
}

function NanoXSetMenuBarTranslucide(Translucide = true){
    MyNanoXCore.MenuBar.SetMenuBarTranslucide(Translucide)
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

function NanoXAddMenuButtonSettings(Id= null, Titre= null, Svg= null, Action= null){
    MyNanoXCore.MenuBar.AddMenuButtonSettings(Id, Titre, Svg, Action)
}

function NanoXClearMenuButtonSettings(){
    MyNanoXCore.MenuBar.ClearMenuButtonSettings()
}

function NanoXAddModule(Titre= null, Svg= null, Start= null, StartWithThisModule= false, AdminModule= false){
    if (MyNanoXCore.ModuleApp != null){
        MyNanoXCore.ModuleApp.AddModule(Titre, Svg, Start, StartWithThisModule, AdminModule)
    }
}

function NanoXStartHomeModule(){
    MyNanoXCore.ModuleApp.Start()
}

function NanoXApiGet(Url = "/", Params = {}, OnDownloadProgress = null){
    return new Promise((resolve, reject)=>{
        axios({
            method: 'get',
            url: Url,
            headers: {
                'x-auth-token': NanoXGetToken(),
                'Content-Type': 'application/json'
            },
            params: Params,
            onDownloadProgress : progressEvent => {
                if (OnDownloadProgress != null){
                    const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    OnDownloadProgress(percentage)
                }
            }
        })
        .then((response) => {
            resolve(response.data)
        })
        .catch((error) => {
            if (error.response) {
                reject(error.response.data)
            } else if (error.request) {
                reject(error.request)
            } else {
                reject(error.message)
            }
        })
    })
}

function NanoXApiDelete(Url = "/"){
    return new Promise((resolve, reject)=>{
        axios({
            method: 'delete',
            url: Url,
            headers: {
                'x-auth-token': NanoXGetToken(),
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            resolve(response.data)
        })
        .catch((error) => {
            if (error.response) {
                reject(error.response.data)
            } else if (error.request) {
                reject(error.request)
            } else {
                reject(error.message)
            }
        })
    })
}

function NanoXApiPatch(Url = "/", SendData = {}){
    return new Promise((resolve, reject)=>{
        axios({
            method: 'patch',
            url: Url,
            headers: {
                'x-auth-token': NanoXGetToken(),
                'Content-Type': 'application/json'
            },
            data: SendData
        })
        .then((response) => {
            resolve(response.data)
        })
        .catch((error) => {
            if (error.response) {
                reject(error.response.data)
            } else if (error.request) {
                reject(error.request)
            } else {
                reject(error.message)
            }
        })
    })
}

function NanoXApiPost(Url = "/", SendData = {}, OnDownloadProgress = null, OnUploadProgress = null){
    return new Promise((resolve, reject)=>{
        axios({
            method: 'post',
            url: Url,
            headers: {
                'x-auth-token': NanoXGetToken(),
                'Content-Type': 'application/json'
            },
            data: SendData,
            onDownloadProgress : progressEvent => {
                if (OnDownloadProgress != null){
                    const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    OnDownloadProgress(percentage)
                }
            },
            onUploadProgress : progressEvent => {
                if (OnUploadProgress != null){
                    const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    OnUploadProgress(percentage)
                }
            }
        })
        .then((response) => {
            resolve(response.data)
        })
        .catch((error) => {
            if (error.response) {
                reject(error.response.data)
            } else if (error.request) {
                reject(error.request)
            } else {
                reject(error.message)
            }
        })
    })
}

function NanoXApiPostLog(Log= ""){
    if(Log != ""){
        NanoXApiPost("/nanoxlog", {Log: Log })
    }
}

MyNanoXCore.Start()
`
    return output
}

function GetJsStartModuleApp(){
    let output = 
`
MyNanoXCore.StartModuleApp()
`
    return output
}

module.exports.GetJsStart = GetJsStart
module.exports.GetJsStartModuleApp = GetJsStartModuleApp