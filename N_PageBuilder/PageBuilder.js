const path = require('path')
let fs = require('fs')

function BuildPages(PageToBuild){
    let dir = path.resolve(__dirname, "Output")
    fs.writeFileSync(`${dir}/${PageToBuild.PageName}`, GetHtmlTemplate(PageToBuild.Titre, PageToBuild.Css, PageToBuild.Js, PageToBuild.Body))
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

function GetHtmlTemplate (Titre = "No Titre", CSS=null, Js=null, Body = null){
    let CSSText = ""
    let JSText = ""
    let BodyText = ""
    if (CSS){
        CSSText=
`
<style>
${CSS}
</style>
`   
    }

    if (Js){
        JSText=
`
<script>
${Js}
</script>
`
    }
    if (Body){BodyText = Body}

    return `
<!doctype html>
<html>
    <head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'/>
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="default">
        <meta name="apple-mobile-web-app-title" content="${Titre}">
        <link rel="apple-touch-icon" href="apple-icon.png">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>${Titre}</title>
        ${CSSText}
        ${JSText}
    </head>
    <body>
    ${BodyText}
    </body>
</html>
    `
}

module.exports.BuildPages = BuildPages
module.exports.CreateOutputFolder = CreateOutputFolder
module.exports.GetOutputPath = GetOutputPath