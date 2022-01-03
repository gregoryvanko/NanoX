const path = require('path')
let fs = require('fs')

function BuildPages(PageToBuild){
    let BuildFunction = PageToBuild.BuildFunction
    let PageContent = BuildFunction()
    let dir = path.resolve(__dirname, "Output")
    fs.writeFileSync(`${dir}/${PageToBuild.PageName}`, PageContent)
    return PageToBuild.PageName
}

function CreateOutputFolder(){
    let dir = path.resolve(__dirname, "Output")
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
        console.log("Folder Output for page builder created")
    } else {
        console.log("Folder Output for page builder exist")
    }
}

function GetOutputPath(){
    return path.resolve(__dirname, "Output")
}

module.exports.BuildPages = BuildPages
module.exports.CreateOutputFolder = CreateOutputFolder
module.exports.GetOutputPath = GetOutputPath