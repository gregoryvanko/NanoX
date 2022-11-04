class NanoXStatistics{
    constructor(){
        this._DivApp = NanoXGetDivApp()

        this._ListeOfUser = null
        this._TypeAggregation = "day"
        this._UserID = "alluser"
    }

    Start(){
        this._DivApp.innerHTML = ""
        this._ListeOfUser = null
        this._TypeAggregation = "day"
        this._UserID = "alluser"
    
        this.ClearMenuButton()
        this._DivApp.appendChild(this.BuildViewConnection())
    }

    ClearMenuButton(){
        // clear menu button left
        NanoXClearMenuButtonLeft()
        // clear menu button right
        NanoXClearMenuButtonRight()
        // clear menu button setttings
        NanoXClearMenuButtonSettings()
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
        this.GetDataStatConnection(this._TypeAggregation, this._UserID)
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
        this._ListeOfUser = Data.ListOfUser
        // Clear view
        this._DivApp.innerHTML = ""
        // Clear MenuButton
        this.ClearMenuButton()
        // add back button
        NanoXAddMenuButtonSettings("IdBack", "Back", IconAdmin.Back(NanoXGetColorIconMenuBar()), this.Start.bind(this))
        // Add autocomplete box for user
        const InputUser = NanoXBuild.Input("All user", "text", "InputUser", "User name", "InputUser", "NanoxAdminInput NanoxText", "")
        InputUser.autocomplete = "off"
        this._DivApp.appendChild(InputUser)
        let me = this
        autocomplete({
            input: document.getElementById("InputUser"),
            minLength: 0,
            emptyMsg: 'No suggestion',
            fetch: function(text, update) {
                text = text.toLowerCase();
                let GroupFiltred = me._ListeOfUser.filter(n => n.LastName.toLowerCase().startsWith(text))
                let suggestions = [{label: "All user", id: "alluser"}]
                GroupFiltred.forEach(element => {
                    const MyObject = {label: element.LastName + " " + element.FirstName, id: element._id}
                    suggestions.push(MyObject)
                });
                update(suggestions);
            },
            onSelect: function(item) {
                document.getElementById("InputUser").value = item.label;
                me._UserID = item.id
                me.GetDataStatConnection(me._TypeAggregation, me._UserID)
            }
        });
        // Add Graph
        // ToDo
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