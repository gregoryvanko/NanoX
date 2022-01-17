class NanoXCore {
    constructor(NanoXAppOption){
        this._NanoXAppOption = NanoXAppOption
        this._IdDivApp = "IdDivApp"

        this._MenuBar = new NanoXMenuBar(this._NanoXAppOption)
        this._ModuleApp = null
        if (this._NanoXAppOption.UseAppModule){
            this._ModuleApp = new NanoXModuleApp()
        }
    }

    get MenuBar(){return this._MenuBar}
    get ModuleApp(){return this._ModuleApp}

    Start(){
        this._MenuBar.ShowMenuBar()
        this.BuildDivApplication()
        if (this._NanoXAppOption.UseAppModule){
            this._ModuleApp.Start()
        }
    }

    GetDivApp(){
        return document.getElementById(this._IdDivApp)
    }

    BuildDivApplication(){
        document.body.appendChild(NanoXBuild.DivFlexColumn(this._IdDivApp, null, "width: 100%;"))
    }
}