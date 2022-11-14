class NanoXStatistics{
    constructor(){
        this._DivApp = NanoXGetDivApp()
        this._ConstDay = "day"
        this._ConstMonth = "month"
        this._ConstAllUser = "alluser"
        this._ConstAllUserText = "All User"
        this._ConstAllPage = "allpage"
        this._ConstAllPageText = "All Page"
        this._ConstAllApi = "allapi"
        this._ConstAllApiText = "All Api"

        this.InitiationClassData()
    }

    InitiationClassData(){
        this._DivApp.innerHTML = ""
        this._ListeOfUser = null
        this._TypeAggregation = this._ConstDay
        this._ListeOfTypeAggragation = [this._ConstDay, this._ConstMonth]
        this._UserID = this._ConstAllUser
        this._InputUserValue = this._ConstAllUserText
        this._ListOfPage = null
        this._ListOfApi  = null
        this._PageName = this._ConstAllPage
        this._InputPageValue = this._ConstAllPageText
        this._ApiName = this._ConstAllApi
        this._InputApiValue = this._ConstAllApiText
    }

    Start(){
        this.InitiationClassData()
        this.ClearMenuButton()
        this._DivApp.appendChild(this.BuildViewStart())
        NanoXApiPostLog("User Load admin module Statistics, view Start")
    }

    ClearMenuButton(){
        // clear menu button left
        NanoXClearMenuButtonLeft()
        // clear menu button right
        NanoXClearMenuButtonRight()
        // clear menu button setttings
        NanoXClearMenuButtonSettings()
    }

    BuildViewStart(){
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
        this.GetDataStatApi(this._TypeAggregation, this._ApiName, this._UserID)
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

    DynamicColors(){
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        return "rgb(" + r + "," + g + "," + b + ")";
    }

    GetDataStatConnection(DayMonth = this._ConstDay, UserId = this._ConstAllUser){
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
        NanoXApiPostLog("User Load admin module Statistics, view Connection")
    }

    BuildViewStatConnection(Data){
        if (Data.ListOfUser != null){
            this._ListeOfUser = [{label: this._ConstAllUserText, id: this._ConstAllUser }]
            Data.ListOfUser.forEach(element => {
                this._ListeOfUser.push({label: element.LastName + " " + element.FirstName, id: element._id})
            });
        }
        // Clear view
        this.InitStatView()
        // add div for input box
        let divinputbox = NanoXBuild.DivFlexRowSpaceAround("divinputbox", "", "width: 90%; margin-bottom: 1rem; justify-content: center;")
        this._DivApp.appendChild(divinputbox)
        // Add autocomplete box for type aggregation
        const Inputaggregation = NanoXBuild.Input(this._TypeAggregation, "text", "Inputaggregation", "Aggregation", "Inputaggregation", "NanoxAdminInput NanoxAdminInputAggregationType NanoxText", "")
        Inputaggregation.autocomplete = "off"
        Inputaggregation.setAttribute("inputmode","none")
        Inputaggregation.setAttribute ("onfocus" , "this.value = ''; ")
        divinputbox.appendChild(Inputaggregation)
        let me = this
        autocomplete({
            input: document.getElementById("Inputaggregation"),
            minLength: 0,
            emptyMsg: 'No suggestion',
            showOnFocus: true,
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
        InputUserValue.setAttribute("inputmode","none")
        InputUserValue.setAttribute ("onfocus" , "this.value = ''; ")
        divinputbox.appendChild(InputUserValue)
        autocomplete({
            input: document.getElementById("InputUserValue"),
            minLength: 0,
            emptyMsg: 'No suggestion',
            showOnFocus: true,
            fetch: function(text, update) {
                text = text.toLowerCase();
                let GroupFiltred = me._ListeOfUser.filter(n => n.label.toLowerCase().startsWith(text))
                update(GroupFiltred);
            },
            onSelect: function(item) {
                document.getElementById("InputUserValue").value = item.label;
                if (item.label != "No suggestion"){
                    me._UserID = item.id
                    me._InputUserValue = item.label
                    me.GetDataStatConnection(me._TypeAggregation, me._UserID)
                }
                
            }
        })

        // define the dataset for the graph
        let thedataset = []
        if (this._UserID == this._ConstAllUser ){
            thedataset = [
                {
                    label: this._InputUserValue,
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
                    label: this._InputUserValue,
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

    GetDataStatPage(DayMonth = this._ConstDay, Page = this._ConstAllPage){
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
        NanoXApiPostLog("User Load admin module Statistics, view Page")
    }

    BuildViewStatPage(Data){
        if (Data.ListOfPage != null){
            this._ListOfPage = [{label: this._ConstAllPageText, id: this._ConstAllPage}]
            Data.ListOfPage.forEach(element => {
                this._ListOfPage.push({label: "/" + element, id: element})
            });
        }
        // Clear view
        this.InitStatView()
        // add div for input box
        let divinputbox = NanoXBuild.DivFlexRowSpaceAround("divinputbox", "", "width: 90%; margin-bottom: 1rem; justify-content: center;")
        this._DivApp.appendChild(divinputbox)

        // Add autocomplete box for type aggregation
        const Inputaggregation = NanoXBuild.Input(this._TypeAggregation, "text", "Inputaggregation", "Aggregation", "Inputaggregation", "NanoxAdminInput NanoxAdminInputAggregationType NanoxText", "")
        Inputaggregation.autocomplete = "off"
        Inputaggregation.setAttribute("inputmode","none")
        Inputaggregation.setAttribute ("onfocus" , "this.value = ''; ")
        divinputbox.appendChild(Inputaggregation)
        let me = this
        autocomplete({
            input: document.getElementById("Inputaggregation"),
            minLength: 0,
            emptyMsg: 'No suggestion',
            showOnFocus: true,
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
        })

        // Add autocomplete box for Pages
        const InputPageValue = NanoXBuild.Input(this._InputPageValue, "text", "InputPageValue", "Page", "InputPageValue", "NanoxAdminInput NanoxAdminInputUserValue NanoxText", "")
        InputPageValue.autocomplete = "off"
        InputPageValue.setAttribute("inputmode","none")
        InputPageValue.setAttribute ("onfocus" , "this.value = ''; ")
        divinputbox.appendChild(InputPageValue)
        autocomplete({
            input: document.getElementById("InputPageValue"),
            minLength: 0,
            emptyMsg: 'No suggestion',
            showOnFocus: true,
            fetch: function(text, update) {
                text = text.toLowerCase();
                let GroupFiltred = (me._ListOfPage != null)? me._ListOfPage.filter(n => n.label.toLowerCase().startsWith(text)) : []
                update(GroupFiltred);
            },
            onSelect: function(item) {
                document.getElementById("InputPageValue").value = item.label;
                if (item.label != "No suggestion"){
                    me._PageName = item.id
                    me._InputPageValue = item.label
                    const PageToSend = (me._PageName == "")? "NanoXEmptyValue" : me._PageName 
                    me.GetDataStatPage(me._TypeAggregation, PageToSend)
                }
            }
        })

        // define the dataset of graph
        let thedataset = []
        if (Data.PageData.ListeOfStatPage != null){
            Data.PageData.ListeOfStatPage.forEach(element => {
                thedataset.push(
                    {
                        label: element.Page,
                        type: "line",
                        borderColor: this.DynamicColors(),
                        fill: false,
                        data: element.Stat
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
                    position: "bottom",
                    labels:{
                        boxWidth: 10,
                    }
                },
                scales: {
                    xAxes: [{
                        gridLines: {color: "rgba(0, 0, 0, 0)"},
                        stacked: false
                    }],
                    yAxes: [{
                        stacked: false,
                        ticks: {
                            beginAtZero: true,
                            precision: 0
                        }
                    }]
                }
            }
        })
    }   

    GetDataStatApi(DayMonth = this._ConstDay, Api = this._ConstAllApi, UserId = this._ConstAllUser){
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
        NanoXApiPostLog("User Load admin module Statistics, view Api")
    }

    ReplaceApiLabel(label){
        label = label.replace(".", "/")
        label = label.replace("-", " ")
        return label
    }

    BuildViewStatApi(Data){
        if (Data.ListOfUser != null){
            this._ListeOfUser = [{label: this._ConstAllUserText, id: this._ConstAllUser }]
            Data.ListOfUser.forEach(element => {
                this._ListeOfUser.push({label: element.LastName + " " + element.FirstName, id: element._id})
            });
        }

        if (Data.ListOfApi != null){
            this._ListOfApi = [{label: this._ConstAllApiText, id: this._ConstAllApi}]
            Data.ListOfApi.forEach(element => {
                this._ListOfApi.push({label: this.ReplaceApiLabel(element), id: element})
            });
        }
        // Clear view
        this.InitStatView()
        // add div for input box
        let divinputbox = NanoXBuild.DivFlexRowSpaceAround("divinputbox", "", "width: 90%; margin-bottom: 1rem; justify-content: center;")
        this._DivApp.appendChild(divinputbox)

        // Add autocomplete box for type aggregation
        const Inputaggregation = NanoXBuild.Input(this._TypeAggregation, "text", "Inputaggregation", "Aggregation", "Inputaggregation", "NanoxAdminInput NanoxAdminInputAggregationType NanoxText", "")
        Inputaggregation.autocomplete = "off"
        Inputaggregation.setAttribute("inputmode","none")
        Inputaggregation.setAttribute ("onfocus" , "this.value = ''; ")
        divinputbox.appendChild(Inputaggregation)
        let me = this
        autocomplete({
            input: document.getElementById("Inputaggregation"),
            minLength: 0,
            emptyMsg: 'No suggestion',
            showOnFocus: true,
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
                    me.GetDataStatApi(me._TypeAggregation, me._ApiName, me._UserID)
                }
            }
        })

        // Add autocomplete box for Api
        const InputApiValue = NanoXBuild.Input(this._InputApiValue, "text", "InputApiValue", "Api", "InputApiValue", "NanoxAdminInput NanoxAdminInputUserValue NanoxText", "")
        InputApiValue.autocomplete = "off"
        InputApiValue.setAttribute("inputmode","none")
        InputApiValue.setAttribute ("onfocus" , "this.value = ''; ")
        divinputbox.appendChild(InputApiValue)
        autocomplete({
            input: document.getElementById("InputApiValue"),
            minLength: 0,
            emptyMsg: 'No suggestion',
            showOnFocus: true,
            fetch: function(text, update) {
                text = text.toLowerCase();
                let GroupFiltred = (me._ListOfApi != null)? me._ListOfApi.filter(n => n.label.toLowerCase().startsWith(text)) : []
                update(GroupFiltred);
            },
            onSelect: function(item) {
                document.getElementById("InputApiValue").value = item.label;
                if (item.label != "No suggestion"){
                    me._ApiName = item.id
                    me._InputApiValue = item.label
                    me.GetDataStatApi(me._TypeAggregation, me._ApiName, me._UserID)
                }
            }
        })

        // Add autocomplete box for user
        const InputUserValue = NanoXBuild.Input(this._InputUserValue, "text", "InputUserValue", "User name", "InputUserValue", "NanoxAdminInput NanoxAdminInputUserValue NanoxText", "")
        InputUserValue.autocomplete = "off"
        InputUserValue.setAttribute("inputmode","none")
        InputUserValue.setAttribute ("onfocus" , "this.value = ''; ")
        divinputbox.appendChild(InputUserValue)
        autocomplete({
            input: document.getElementById("InputUserValue"),
            minLength: 0,
            emptyMsg: 'No suggestion',
            showOnFocus: true,
            fetch: function(text, update) {
                text = text.toLowerCase();
                let GroupFiltred = me._ListeOfUser.filter(n => n.label.toLowerCase().startsWith(text))
                update(GroupFiltred);
            },
            onSelect: function(item) {
                document.getElementById("InputUserValue").value = item.label;
                if (item.label != "No suggestion"){
                    me._UserID = item.id
                    me._InputUserValue = item.label
                    me.GetDataStatApi(me._TypeAggregation, me._ApiName, me._UserID)
                }
                
            }
        })

        // define the dataset of graph
        let thedataset = []
        if (Data.ApiData.ListeOfStatApi != null){
            Data.ApiData.ListeOfStatApi.forEach(element => {
                thedataset.push(
                    {
                        label: this.ReplaceApiLabel(element.Api),
                        type: "line",
                        borderColor: this.DynamicColors(),
                        fill: false,
                        data: element.Stat
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
                labels: Data.ApiData.Label,
                datasets: thedataset
            },
            options: {
                maintainAspectRatio: false,
                title: {
                    display: true,
                    text: "Api"
                },
                legend: {
                    display: true,
                    position: "bottom",
                    labels:{
                        boxWidth: 10,
                    }
                },
                scales: {
                    xAxes: [{
                        gridLines: {color: "rgba(0, 0, 0, 0)"},
                        stacked: false
                    }],
                    yAxes: [{
                        stacked: false,
                        ticks: {
                            beginAtZero: true,
                            precision: 0
                        }
                    }]
                }
            }
        })
    }

}

let MyNanoXStatistics = new NanoXStatistics()
NanoXAddModule("Statistics", IconAdmin.IconModuleStat(), MyNanoXStatistics.Start.bind(MyNanoXStatistics), false)