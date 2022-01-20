class TestApp{
    constructor(){}

    Start(){
        console.log("ToDo Start module TestApp")
    }
}

let MyTestApp = new TestApp()
NanoXAddModule("Test1 du nouveau titre", null, MyTestApp.Start.bind(MyTestApp), false)
NanoXAddModule("Test2", null, null, false)