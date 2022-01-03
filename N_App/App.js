const fs = require('fs')
const os = require('os')

function BuildInitialHtml(){
    let AppName = require("../index").NanoXGetAppName()
    let AppColor = require("../index").NanoXGetAppColor()

    let Output = `
<!doctype html>
<html>
    <head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'/>
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
        <meta name="apple-mobile-web-app-title" content="${AppName}">
        <link rel="apple-touch-icon" href="apple-icon.png">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>${AppName}</title>
        <style>
            :root {
                --NanoX-appcolor: ${AppColor};
            }
            ${fs.readFileSync(__dirname + "/NanoX.css", 'utf8') + os.EOL}
        </style>
        <script>
            ${fs.readFileSync(__dirname + "/NanoXLoader.js", 'utf8') + os.EOL}
            let MyNanoXLoader = new NanoXLoader()
            onload = function() {
                MyNanoXLoader.Start()
            }
        </script>
    </head>
    <body></body>
</html>`
    return Output
}

module.exports.BuildInitialHtml = BuildInitialHtml