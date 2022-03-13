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
        <meta name="viewport" content="initial-scale=1, width=device-width, maximum-scale=1, user-scalable=0, viewport-fit=cover">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="black">
        <meta name="theme-color" content="black">
        <meta name="apple-mobile-web-app-title" content="${Titre}">
        <meta name="application-name" content="${Titre}">
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