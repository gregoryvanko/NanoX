class NanoXModuleApp{
    constructor(){
        this._DivApp = null
        this._ListOfModules = []
        this._StartWithOneModule = null
    }

    Start(){
        // Initiation de divapp pas avant d'exeuter la fonction start (depend du load des fichiers js)
        this._DivApp = NanoXGetDivApp()
        this._DivApp.appendChild(NanoXBuild.DivText("ToDo"))
    }

    AddModule(Titre= null, Svg= null, Start= null, StartWithThisModule= false){
        if (Titre == null){Titre = "No title"}
        if (Svg == null){Svg = this.GetNoSvg()}
        if (Start == null) {Start = ()=>{alert("Start fonction not define")}}

        this._ListOfModules.push({Titre: Titre, Svg: Svg, Start: Start})
        if (StartWithThisModule){
            this._StartWithOneModule = Start
        }
    }

    GetNoSvg(){
        return "ToDo"
    }
}