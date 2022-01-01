// Import Express
const Express = require('express')
const MyServer = Express()

// Log
let LogError = null


function StartExpressServer(Port = 3000, Routes = [], IconPath = null){
    return new Promise(async(resolve) => {
        let MyPort = Port

        // Get Nonox Log
        LogError = require('../index').NanoXLogError

        // On demarre le serveur que si il existe au moins une route
        if (Routes.length != 0){

            // Definition de l'icon
            let MyIconPath = (IconPath != null) ? IconPath : __dirname + "/apple-icon-192x192.png"
            console.log(`ÌconPath: ${MyIconPath}`)

            // Ajouter les routes
            Routes.forEach(element => {
                MyServer.use(element.Path, element.Route)
            });

            // Parametre de express
            MyServer.use(Express.json({limit: "200mb"}))

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
            console.log(`Server not started because no route existe`)
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