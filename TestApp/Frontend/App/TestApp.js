class TestApp{
    constructor(){}

    Start(){
        Console.Log("ToDo Start module")
    }
}

let MyTestApp = new TestApp()
NanoXAddModule("Test1", null, MyTestApp.Start.bind(MyTestApp), false)