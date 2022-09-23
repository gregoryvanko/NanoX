class NanoXStatConnection{
    constructor(){
        this._DivApp = NanoXGetDivApp()
    }

    Start(){
        this._DivApp.innerHTML = "coucou"
    }

}

let MyNanoXStatConnection = new NanoXStatConnection()
NanoXAddModule("Connection", null, MyNanoXStatConnection.Start.bind(MyNanoXStatConnection), true)