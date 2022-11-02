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
        this.GetDataStatConnection()
    }

    OnClickPage(){
        this.GetDataStatPage()
    }

    OnClickAPI(){
        this.GetDataStatApi()
    }

    BuildTextGetData(){
        const DivCenter = NanoXBuild.DivFlexColumn("MainCenterDiv") 
        DivCenter.appendChild(NanoXBuild.DivText("Get Data...", "", "", "font-size: 1.2rem; margin-top: 25vh;"))
        return DivCenter
    }

    GetDataStatConnection(DayMonth = "day", UserId = "alluser"){
        // Clear view
        this._DivApp.innerHTML = ""
        // Add texte get data
        this._DivApp.appendChild(this.BuildTextGetData())
        // Call Api with Type=day and User=all
        NanoXApiGet(`/nanoxadminstat/connection/${DayMonth}/${UserId}`).then((reponse)=>{
            this.BuildViewStatConnection(reponse)
        },(erreur)=>{
            this._DivApp.innerHTML=erreur
        })
    }

    BuildViewStatConnection(Data){
        // ToDo
        console.log(Data)
    }

    GetDataStatPage(DayMonth = "day", Page = "allpage"){
        // Clear view
        this._DivApp.innerHTML = ""
        // Add texte get data
        this._DivApp.appendChild(this.BuildTextGetData())
        // Call Api with Type=day and User=all
        NanoXApiGet(`/nanoxadminstat/page/${DayMonth}/${Page}`).then((reponse)=>{
            this.BuildViewStatPage(reponse)
        },(erreur)=>{
            this._DivApp.innerHTML=erreur
        })
    }

    BuildViewStatPage(Data){
        // ToDo
        console.log(Data)
    }

    GetDataStatApi(DayMonth = "day", Api = "allapi", UserId = "alluser"){
        // Clear view
        this._DivApp.innerHTML = ""
        // Add texte get data
        this._DivApp.appendChild(this.BuildTextGetData())
        // Call Api with Type=day and User=all
        NanoXApiGet(`/nanoxadminstat/api/${DayMonth}/${Api}/${UserId}`).then((reponse)=>{
            this.BuildViewStatApi(reponse)
        },(erreur)=>{
            this._DivApp.innerHTML=erreur
        })
    }

    BuildViewStatApi(Data){
        // ToDo
        console.log(Data)
    }

}

let MyNanoXStatistics = new NanoXStatistics()
NanoXAddModule("Statistics", IconAdmin.IconModule(), MyNanoXStatistics.Start.bind(MyNanoXStatistics), true)