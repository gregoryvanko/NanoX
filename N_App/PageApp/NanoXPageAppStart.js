function GetJsStart(){
    let NanoXAppOption = require("../../index").NanoXGetNanoXAppOption()
    let output = 
`
let MyNanoXCore = new NanoXCore(${JSON.stringify(NanoXAppOption)})

function NanoXGetDivApp(){
    return MyNanoXCore.DivApp
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

function NanoXApiGet(Url = "/"){
    return new Promise((resolve, reject)=>{
        axios({
            method: 'get',
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

function NanoXApiPatch(Url = "/", SendData = null){
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

function NanoXApiPost(Url = "/", SendData = null, OnDownloadProgress = null, OnUploadProgress = null){
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