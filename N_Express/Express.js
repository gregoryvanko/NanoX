// Import Express
const Express = require('express')
const MyServer = Express()

let LogInfo = null
let LogError = null


function StartExpressServer(Port = 3000){

    // Get Nonox Log
    LogInfo = require('../index').LogInfo
    LogError = require('../index').LogError

    let MyPort = Port
    
    MyServer.use(Express.json({limit: "200mb"}))

    //const RouteTest = require("./Route_Test")
    //MyServer.use("nanoxapi/test", RouteTest)


    // Creation de la route 404
    MyServer.use(function(req, res, next) {
        LogError(`Route not found ${req.originalUrl}`)
        res.status(404).send(ErrorRoute(req.originalUrl));
    })

    MyServer.listen(MyPort, ()=>{
        console.log(`listening on *: ${MyPort}`)
    }).on('error', (error)=> {
        if (error.code == "EACCES"){console.error('Port is already in use')}
        process.exit(1)
    })
}

function ErrorRoute(Link){
    return `<div style="width: 100vw; margin-top: 33vh; display: flex; flex-direction: column; justify-content:space-around; align-content:center; align-items: center;">
    <div style="color: red; font-size: 2rem;">Sorry, Route not found:</div><div style="color: red; font-size: 2rem;">${Link}</div></div>`
}

module.exports.StartExpressServer = StartExpressServer