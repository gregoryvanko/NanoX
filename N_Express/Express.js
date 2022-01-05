// Import Express
const Express = require('express')
const MyServer = Express()


function StartExpressServer(Port = 3000, PagesToBuild = [], Routes = [], IconPath = null){
    return new Promise(async(resolve) => {
        let MyPort = Port

        // Get Nonox Log
        let LogError = require('../index').NanoXLogError
        let LogStat = require('../index').NanoXLogStat

        // On demarre le serveur que si il existe au moins une route ou une page
        if ((Routes.length != 0) || (PagesToBuild.length != 0)){

            // Definition de l'icon
            let MyIconPath = (IconPath != null) ? IconPath : __dirname + "/apple-icon-192x192.png"
            console.log(`ÌconPath: ${MyIconPath}`)

            // Parametre de express
            MyServer.use(Express.json({limit: "200mb"}))

            // Ajouter les pages a builder
            if (PagesToBuild.length != 0){
                // Create Output folder
                require("../N_PageBuilder/PageBuilder").CreateOutputFolder()
                // Get Output path
                const OutputPath = require("../N_PageBuilder/PageBuilder").GetOutputPath()
                PagesToBuild.forEach(element => {
                    require("../N_PageBuilder/PageBuilder").BuildPages(element)
                    MyServer.get(`/${element.PageRoute}`, (req, res) => {
                        res.sendFile(`${OutputPath}/${element.PageName}`)
                        if (req.user){
                            LogStat(`Page:/${element.PageRoute}`, req.user)
                        } else {
                            LogStat(`Page:/${element.PageRoute}`)
                        }
                    })
                    console.log(`Page build and added in the server: (PageName:${element.PageName}, PageRoute:/${element.PageRoute})`)
                });
            } else {
                console.log("No page to build")
            }
            
            // Ajouter les routes
            if (Routes.length != 0){
                Routes.forEach(element => {
                    MyServer.use(element.Path, element.Route)
                    console.log(`Route added: ${element.Path}`)
                });
            }
            
            // Route pour icone
            MyServer.get('/apple-icon.png', (req, res) => {
                if(!SendIcon(MyIconPath, res)){LogError('Icon not found')}
            })
            MyServer.get('/apple-touch-icon.png', (req, res) => {
                if(!SendIcon(MyIconPath, res)){LogError('Icon not found')}
            })
            MyServer.get('/apple-touch-icon-precomposed.png', (req, res) => {
                if(!SendIcon(MyIconPath, res)){LogError('Icon not found')}
            })
            MyServer.get('/favicon.ico', (req, res) => {
                if(!SendIcon(MyIconPath, res)){LogError('Icon not found')}
            })

            // Creation de la route 404
            MyServer.use(function(req, res, next) {
                LogError(`Route not found ${req.originalUrl}`)
                res.status(404).send(ErrorRoute(req.originalUrl));
            })

            // Start server
            MyServer.listen(MyPort, ()=>{
                console.log(`Server listening on *: ${MyPort}`)
                resolve()
            }).on('error', (error)=> {
                if (error.code == "EACCES"){console.error('Port is already in use')}
                process.exit(1)
            })
        } else {
            console.log(`Server not started because no route or no page defined`)
            resolve()
        }
    })
}

function SendIcon(MyIconPath, res){
    let success = false
    var fs = require('fs')
    if(fs.existsSync(MyIconPath)){
        let IconFile = fs.readFileSync(MyIconPath)
        res.send(IconFile)
        success = true
    } else {
        res.status(404).send(ErrorHTML("Sorry, Icon not found"))
    }
    return success
}

function ErrorRoute(Link){
    return `<div style="width: 100vw; margin-top: 33vh; display: flex; flex-direction: column; justify-content:space-around; align-content:center; align-items: center;">
    <div style="color: red; font-size: 2rem;">Sorry, Route not found:</div><div style="color: red; font-size: 2rem;">${Link}</div></div>`
}

function ErrorHTML(Message){
    return `<div style="width: 100vw; margin-top: 33vh; display: flex; flex-direction: column; justify-content:space-around; align-content:center; align-items: center;"><div style="color: red; font-size: 2rem;">${Message}</div></div>`
}

module.exports.StartExpressServer = StartExpressServer