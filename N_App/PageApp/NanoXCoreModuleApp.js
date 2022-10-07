class NanoXModuleApp{
    constructor(MenuBar){
        this._DivApp = null
        this._ListOfModules = []
        this._StartWithOneModule = null
        this._MenuBar = MenuBar
    }

    Start(FirstAppStart = false){
        // Initiation de divapp pas avant d'exeuter la fonction start (depend du load des fichiers js)
        this._DivApp = NanoXGetDivApp()
        this._DivApp.innerHTML = ""
        if (this._ListOfModules.length > 0){
            if (this._ListOfModules.length == 1){
                this.ClickAppCard(this._ListOfModules[0].Start)
            } else {
                if ((this._StartWithOneModule != null) && (FirstAppStart)){
                    this.ClickAppCard(this._StartWithOneModule)
                } else {
                    // Clear button on menu
                    this._MenuBar.ClearMenuButtonLeft()
                    this._MenuBar.ClearMenuButtonRight()
                    this._MenuBar.ClearMenuButtonSettings()
                    // Add module card
                    let content = NanoXBuild.DivFlexRowSpaceEvenly(null, null, "width: 90%; margin-top: 4rem; margin-bottom: 4rem;")
                    this._DivApp.appendChild(content)
                    this._ListOfModules.forEach(element => {
                        content.appendChild(this.BuildAppCard(element.Titre, element.Svg, element.Start))
                    })
                }
            }
        } else {
            // Titre de la page
            this._DivApp.appendChild(NanoXBuild.DivText("No module defined", null, "", "margin-top: 4rem; margin-bottom: 4rem;"))
        }
    }

    BuildAppCard(Titre, Svg, Start){
        let element = NanoXBuild.Div("", "NanoXModuleImageConteneur", "display: flex; flex-direction: column; justify-content:space-around; align-content:center; align-items: center; box-sizing: border-box;")
        element.addEventListener("click", this.ClickAppCard.bind(this,Start))
        let divimage = NanoXBuild.Div("", "", "width: 98%; height: 70%;")
        divimage.innerHTML = Svg
        element.appendChild(divimage)
        element.appendChild(NanoXBuild.DivText(Titre, "", "", "font-size: 1.5rem;"))
        return element
    }

    ClickAppCard(Start){
        this._DivApp.innerHTML = ""
        Start()
    }

    AddModule(Titre= null, Svg= null, Start= null, StartWithThisModule= false){
        if (Titre == null){Titre = "No title"}
        if (Svg == null){Svg = this.GetNoSvg()}
        if (Start == null) {Start = ()=>{alert("Start fonction not define")}}

        this._ListOfModules.push({Titre: Titre, Svg: Svg, Start: Start})
        if (StartWithThisModule){
            if (this._StartWithOneModule == null){this._StartWithOneModule = Start}
        }
    }

    GetNoSvg(){
        return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 172 172"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="#000000"><path d="M3.1175,-0.1075c-0.14781,0.02687 -0.29562,0.06719 -0.43,0.1075c-1.29,0.22844 -2.32469,1.16906 -2.6875,2.41875c-0.36281,1.26313 0.01344,2.60688 0.9675,3.49375l165.12,165.12c1.37063,1.37063 3.57438,1.37063 4.945,0c1.37063,-1.37062 1.37063,-3.57437 0,-4.945l-21.6075,-21.6075h3.01c10.66938,0 19.565,-8.89562 19.565,-19.565v-77.83c0,-10.66937 -8.89562,-19.565 -19.565,-19.565h-26.5525l-5.4825,-8.9225c-3.09062,-5.16 -8.64031,-8.2775 -14.835,-8.2775h-39.13c-5.84531,0 -11.74437,3.1175 -14.835,8.2775l-5.4825,8.9225h-13.6525l-26.5525,-26.5525c-0.71219,-0.76594 -1.74687,-1.15563 -2.795,-1.075zM66.435,17.2h39.56c3.44,0 6.85313,2.06938 8.9225,5.16l7.2025,12.04h30.6375c6.88,0 12.685,5.805 12.685,12.685v77.83c0,6.88 -5.805,12.685 -12.685,12.685h-10.2125l-22.79,-22.79c6.79938,-7.68625 10.965,-17.85844 10.965,-28.81c0,-24.76531 -19.95469,-44.72 -44.72,-44.72c-10.95156,0 -21.13719,4.16563 -29.025,10.75l-17.63,-17.63h10.8575l7.2025,-12.04c1.72,-3.09062 5.24063,-5.16 9.03,-5.16zM13.115,28.595c-7.56531,2.75469 -13.115,9.89 -13.115,18.49v77.83c0,10.66938 8.89563,19.565 19.565,19.565h109.435l-6.88,-6.88h-102.555c-6.88,0 -12.685,-5.805 -12.685,-12.685v-77.83c0,-6.88 5.50938,-12.33562 12.04,-12.685zM86,47.8375c20.98938,0 37.84,16.85063 37.84,37.84c0,9.245 -3.48031,17.50906 -9.03,24.1875l-5.805,-5.805c3.85656,-4.99875 6.235,-11.26062 6.235,-18.06c0,-16.16531 -13.07469,-29.24 -29.24,-29.24c-6.79937,0 -13.06125,2.37844 -18.06,6.235l-6.235,-6.235c6.57094,-5.52281 15.07688,-8.9225 24.295,-8.9225zM47.515,62.995c-4.12531,6.88 -6.5575,14.405 -6.5575,23.005c0.34938,24.76531 20.27719,44.72 45.0425,44.72c8.25063,0 16.125,-2.43219 23.005,-6.5575l-5.16,-5.16c-5.16,3.09063 -11.31437,4.8375 -17.845,4.8375c-20.98937,0 -37.84,-16.85062 -37.84,-37.84c0,-6.53062 1.76031,-12.685 4.515,-17.845zM86,63.64c12.38938,0 22.36,9.97063 22.36,22.36c0,4.99875 -1.69312,9.44656 -4.3,13.115l-31.2825,-31.2825c3.68188,-2.66062 8.18344,-4.1925 13.2225,-4.1925zM58.8025,74.2825c-1.37062,3.44 -2.365,7.60563 -2.365,11.395c0.34938,16.51469 13.39719,29.5625 29.5625,29.5625c4.12531,0 7.955,-0.645 11.395,-2.365l-5.59,-5.59c-2.06937,0.68531 -4.05812,1.075 -6.1275,1.075c-12.38937,0 -22.36,-9.97062 -22.36,-22.36c0,-2.06937 0.28219,-4.16562 0.9675,-6.235z"></path></g></g></svg>`
    }
}