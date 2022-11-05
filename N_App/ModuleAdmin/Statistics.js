class NanoXStatistics{
    constructor(){
        this._DivApp = NanoXGetDivApp()

        this.InitiationClassData()
    }

    InitiationClassData(){
        this._DivApp.innerHTML = ""
        this._ListeOfUser = null
        this._TypeAggregation = "day"
        this._ListeOfTypeAggragation = ["day", "month"]
        this._UserID = "alluser"
        this._InputUserValue = "All user"
        this._ListOfPage = null
        this._PageName = "allpage"
        this._InputPageValue = "All Page"
    }

    Start(){
        this.InitiationClassData()
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
        this.GetDataStatPage(this._TypeAggregation, this._PageName)
    }

    OnClickAPI(){
        this.GetDataStatApi()
    }

    BuildTextGetData(){
        const DivCenter = NanoXBuild.DivFlexColumn("MainCenterDiv") 
        DivCenter.appendChild(NanoXBuild.DivText("Get Data...", "", "", "font-size: 1.2rem; margin-top: 25vh;"))
        return DivCenter
    }

    InitStatView(){
        // Clear view
        this._DivApp.innerHTML = ""
        // Clear MenuButton
        this.ClearMenuButton()
        // add back button
        NanoXAddMenuButtonSettings("IdBack", "Back", IconAdmin.Back(NanoXGetColorIconMenuBar()), this.Start.bind(this))
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
        if (Data.ListOfUser != null){
            this._ListeOfUser = Data.ListOfUser
        }
        // Clear view
        this.InitStatView()
        // add div for input box
        let divinputbox = NanoXBuild.DivFlexRowSpaceAround("divinputbox", "", "width: 90%; margin-bottom: 1rem; justify-content: center;")
        this._DivApp.appendChild(divinputbox)
        // Add autocomplete box for type aggregation
        const Inputaggregation = NanoXBuild.Input(this._TypeAggregation, "text", "Inputaggregation", "Aggregation", "Inputaggregation", "NanoxAdminInput NanoxAdminInputAggregationType NanoxText", "")
        Inputaggregation.autocomplete = "off"
        divinputbox.appendChild(Inputaggregation)
        let me = this
        autocomplete({
            input: document.getElementById("Inputaggregation"),
            minLength: 0,
            emptyMsg: 'No suggestion',
            fetch: function(text, update) {
                text = text.toLowerCase();
                let GroupFiltred = me._ListeOfTypeAggragation.filter(n => n.toLowerCase().startsWith(text))
                let suggestions = []
                GroupFiltred.forEach(element => {
                    const MyObject = {label: element}
                    suggestions.push(MyObject)
                });
                update(suggestions);
            },
            onSelect: function(item) {
                document.getElementById("Inputaggregation").value = item.label;
                if (item.label != "No suggestion"){
                    me._TypeAggregation = item.label
                    me.GetDataStatConnection(me._TypeAggregation, me._UserID)
                }
                
            }
        });

        // Add autocomplete box for user
        const InputUserValue = NanoXBuild.Input(this._InputUserValue, "text", "InputUserValue", "User name", "InputUserValue", "NanoxAdminInput NanoxAdminInputUserValue NanoxText", "")
        InputUserValue.autocomplete = "off"
        divinputbox.appendChild(InputUserValue)
        autocomplete({
            input: document.getElementById("InputUserValue"),
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
                document.getElementById("InputUserValue").value = item.label;
                if (item.label != "No suggestion"){
                    me._UserID = item.id
                    me._InputUserValue = item.label
                    me.GetDataStatConnection(me._TypeAggregation, me._UserID)
                }
                
            }
        });

        // define the dataset
        let thedataset = []
        if (this._UserID == "alluser"){
            thedataset = [
                {
                    label: 'Connection',
                    type: "bar",
                    backgroundColor: "rgba(75, 192, 192, 1)",
                    data: Data.ConnectionData.StatValideConnection,
                },
                {
                    label: 'Error',
                    type: "bar",
                    backgroundColor: "rgba(255, 99, 132, 1)",
                    data: Data.ConnectionData.StatErrorConnection,
                }
            ]
        } else {
            thedataset = [
                {
                    label: 'Connection',
                    type: "bar",
                    backgroundColor: "rgba(75, 192, 192, 1)",
                    data: Data.ConnectionData.StatValideConnection,
                }
            ]
        }
        // Add graph
        let divchart = NanoXBuild.Div("", "NanoxAdminDivChart")
        this._DivApp.appendChild(divchart)
        let canvas = document.createElement("canvas")
        canvas.setAttribute("id", "myChart")
        divchart.appendChild(canvas)
        let ctx = document.getElementById('myChart').getContext('2d');
        let myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Data.ConnectionData.Label,
                datasets: thedataset
            },
            options: {
                maintainAspectRatio: false,
                title: {
                    display: true,
                    text: "Connection"
                },
                legend: {
                    display: true,
                    position: "bottom"
                },
                scales: {
                    xAxes: [{
                        gridLines: {color: "rgba(0, 0, 0, 0)"},
                        stacked: true
                    }],
                    yAxes: [{
                        stacked: true,
                        ticks: {
                            beginAtZero: true,
                            precision: 0
                        }
                    }]
                }
            }
        })
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
        if (Data.ListOfPage != null){
            this._ListOfPage = Data.ListOfPage
        }
        // Clear view
        this.InitStatView()
        // add div for input box
        let divinputbox = NanoXBuild.DivFlexRowSpaceAround("divinputbox", "", "width: 90%; margin-bottom: 1rem; justify-content: center;")
        this._DivApp.appendChild(divinputbox)
        // Add autocomplete box for type aggregation
        const Inputaggregation = NanoXBuild.Input(this._TypeAggregation, "text", "Inputaggregation", "Aggregation", "Inputaggregation", "NanoxAdminInput NanoxAdminInputAggregationType NanoxText", "")
        Inputaggregation.autocomplete = "off"
        divinputbox.appendChild(Inputaggregation)
        let me = this
        autocomplete({
            input: document.getElementById("Inputaggregation"),
            minLength: 0,
            emptyMsg: 'No suggestion',
            fetch: function(text, update) {
                text = text.toLowerCase();
                let GroupFiltred = me._ListeOfTypeAggragation.filter(n => n.toLowerCase().startsWith(text))
                let suggestions = []
                GroupFiltred.forEach(element => {
                    const MyObject = {label: element}
                    suggestions.push(MyObject)
                });
                update(suggestions);
            },
            onSelect: function(item) {
                document.getElementById("Inputaggregation").value = item.label;
                if (item.label != "No suggestion"){
                    me._TypeAggregation = item.label
                    me.GetDataStatPage(me._TypeAggregation, me._PageName)
                }
            }
        });

        // Add autocomplete box for Pages
        const InputPageValue = NanoXBuild.Input(this._InputPageValue, "text", "InputPageValue", "Page", "InputPageValue", "NanoxAdminInput NanoxAdminInputUserValue NanoxText", "")
        InputPageValue.autocomplete = "off"
        divinputbox.appendChild(InputPageValue)
        autocomplete({
            input: document.getElementById("InputPageValue"),
            minLength: 0,
            emptyMsg: 'No suggestion',
            fetch: function(text, update) {
                text = text.toLowerCase();
                let GroupFiltred = (me._ListOfPage != null)? me._ListOfPage.filter(n => n.toLowerCase().startsWith(text)) : []
                let suggestions = [{label: "All Page", id: "allpage"}]
                GroupFiltred.forEach(element => {
                    const MyObject = {label: element, id:element}
                    suggestions.push(MyObject)
                });
                update(suggestions);
            },
            onSelect: function(item) {
                document.getElementById("InputPageValue").value = item.label;
                if (item.label != "No suggestion"){
                    me._PageName = item.id
                    me._InputPageValue = item.label
                    me.GetDataStatPage(me._TypeAggregation, me._PageName)
                }
            }
        })
        // define the dataset
        let thedataset = []
        if (Data.PageData.ListeOfStatPage != null){
            Data.PageData.ListeOfStatPage.forEach(element => {
                thedataset.push(
                    {
                        label: element.Page,
                        type: "line",
                        borderColor: "rgba(54, 162, 235, 1)",
                        fill: false,
                        data: element.Stat,
                    })
            })
        }
        // Add graph
        let divchart = NanoXBuild.Div("", "NanoxAdminDivChart")
        this._DivApp.appendChild(divchart)
        let canvas = document.createElement("canvas")
        canvas.setAttribute("id", "myChart")
        divchart.appendChild(canvas)
        let ctx = document.getElementById('myChart').getContext('2d');
        let myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: Data.PageData.Label,
                datasets: thedataset
            },
            options: {
                maintainAspectRatio: false,
                title: {
                    display: true,
                    text: "Page"
                },
                legend: {
                    display: true,
                    position: "bottom"
                },
                scales: {
                    xAxes: [{
                        gridLines: {color: "rgba(0, 0, 0, 0)"},
                        stacked: true
                    }],
                    yAxes: [{
                        stacked: true,
                        ticks: {
                            beginAtZero: true,
                            precision: 0
                        }
                    }]
                }
            }
        })
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