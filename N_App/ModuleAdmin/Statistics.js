class NanoXStatistics{
    constructor(){
        this._DivApp = NanoXGetDivApp()
    }

    Start(){
        this._DivApp.innerHTML = ""
        this._DivApp.appendChild(this.BuildViewConnection())
    }

    BuildViewConnection(){
        const DivCenter = NanoXBuild.DivFlexColumn("MainCenterDiv")
        DivCenter.appendChild(NanoXBuild.DivText("Statistics", "", "NanoXAdminTitre", ""))
        DivCenter.appendChild(NanoXBuild.Button("Connection", this.OnClickConnection.bind(this),null, "NanoXAdminButtonStat", null))
        DivCenter.appendChild(NanoXBuild.Button("Page", this.OnClickPage.bind(this),null, "NanoXAdminButtonStat", null))
        DivCenter.appendChild(NanoXBuild.Button("Api", this.OnClickAPI.bind(this),null, "NanoXAdminButtonStat", null))

        return DivCenter
    }

    OnClickConnection(){
        this.BuildViewStatConnection()
    }

    OnClickPage(){
        alert("Todo")
    }

    OnClickAPI(){
        alert("Todo")
    }

    BuildTextGetData(){
        const DivCenter = NanoXBuild.DivFlexColumn("MainCenterDiv") 
        DivCenter.appendChild(NanoXBuild.DivText("Get Data...", "", "", "font-size: 1.2rem; margin-top: 25vh;"))
        return DivCenter
    }

    BuildViewStatConnection(){
        // Clear view
        this._DivApp.innerHTML = ""
        // Add texte get data
        this._DivApp.appendChild(this.BuildTextGetData())
        // Call Api with Type=day and User=all
        NanoXApiGet("/nanoxadminstat/connection/day/all").then((reponse)=>{
            // ToDo
            console.log(reponse)
        },(erreur)=>{
            this._DivApp.innerHTML=erreur
        })
    }

}

let MyNanoXStatistics = new NanoXStatistics()
NanoXAddModule("Statistics", IconAdmin.IconModule(), MyNanoXStatistics.Start.bind(MyNanoXStatistics), true)