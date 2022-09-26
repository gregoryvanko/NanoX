class NanoXStatConnection{
    constructor(){
        this._DivApp = NanoXGetDivApp()
    }

    Start(){
        this._DivApp.innerHTML = "coucou"
    }

}

let MyNanoXStatConnection = new NanoXStatConnection()
NanoXAddModule("Connection", IconAdmin.IconModule(), MyNanoXStatConnection.Start.bind(MyNanoXStatConnection), true)