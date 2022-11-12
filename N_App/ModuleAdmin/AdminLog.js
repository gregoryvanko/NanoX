class NanoXLog {
    constructor(){
        this._DivApp = NanoXGetDivApp()
        this._ConstAllUser = "alluser"
        this._ConstAllUserText = "All User"
        this._ConstAllType = "all"
        this._ListeOfStatType = [this._ConstAllType, "Info", "Stat", "Error"]
        this._NoSearchText = "notext"

        this.InitiationClassData()
    }

    InitiationClassData(){
        this._DivApp.innerHTML = ""

        this._ListeOfUser = null
        this._UserID = this._ConstAllUser
        this._InputUserValue = this._ConstAllUserText
        this._TypeLog = this._ConstAllType
        this._StartData = new Date().getTime()
        this._SearchText = this._NoSearchText
    }

    Start(){
        this.InitiationClassData()
        this.ClearMenuButton()
        this.GetLogData()
        NanoXApiPostLog("User Load admin module Log, view Start")
    }

    ClearMenuButton(){
        // clear menu button left
        NanoXClearMenuButtonLeft()
        // clear menu button right
        NanoXClearMenuButtonRight()
        // clear menu button setttings
        NanoXClearMenuButtonSettings()
    }

    BuildTextGetData(){
        const DivCenter = NanoXBuild.DivFlexColumn("MainCenterDiv") 
        DivCenter.appendChild(NanoXBuild.DivText("Get Data...", "", "", "font-size: 1.2rem; margin-top: 25vh;"))
        return DivCenter
    }

    GetLogData(TypeLog = this._TypeLog, StartDate = this._StartData, UserID = this._UserID, SearchText = this._SearchText){
        // Clear view
        this._DivApp.innerHTML = ""
        // Add texte get data
        this._DivApp.appendChild(this.BuildTextGetData())

        // Si le texte a chercher est vide, il faut remplacer cette valeur par un string pour que le get fonctionne
        if (SearchText == ""){
            SearchText = this._NoSearchText
        }
        // Call Api with Type=day and User=all
        NanoXApiGet(`/nanoxlog/${TypeLog}/${StartDate}/${UserID}/${SearchText}`).then((reponse)=>{
            this.BuildLogView(reponse)
        },(erreur)=>{
            this._DivApp.innerHTML=erreur
        })
    }

    InitStatView(){
        // Clear view
        this._DivApp.innerHTML = ""
        // Clear MenuButton
        this.ClearMenuButton()
    }

    BuildLogView(Data){
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

        // Add autocomplete box for type of log
        const InputTypeOfLog = NanoXBuild.Input(this._TypeLog, "text", "InputTypeOfLog", "Type", "InputTypeOfLog", "NanoxAdminInput NanoxAdminInputLogType NanoxText", "")
        InputTypeOfLog.autocomplete = "off"
        divinputbox.appendChild(InputTypeOfLog)
        let me = this
        autocomplete({
            input: document.getElementById("InputTypeOfLog"),
            minLength: 0,
            emptyMsg: 'No suggestion',
            fetch: function(text, update) {
                text = text.toLowerCase();
                let GroupFiltred = me._ListeOfStatType.filter(n => n.toLowerCase().startsWith(text))
                let suggestions = []
                GroupFiltred.forEach(element => {
                    const MyObject = {label: element}
                    suggestions.push(MyObject)
                });
                update(suggestions);
            },
            onSelect: function(item) {
                document.getElementById("InputTypeOfLog").value = item.label;
                if (item.label != "No suggestion"){
                    me._TypeLog = item.label
                    me.GetLogData(me._TypeLog, me._StartData, me._UserID, me._SearchText)
                }
            }
        })

        // Add Start Date
        const DateAfficher = this.FormatDateToString(this._StartData)
        const InputStartDate = NanoXBuild.Input(DateAfficher, "text", "InputStartDate", "Date", "InputStartDate", "NanoxAdminInput NanoxAdminInputStartDate NanoxText", "")
        InputStartDate.autocomplete = "off"
        InputStartDate.setAttribute("inputmode","none")
        divinputbox.appendChild(InputStartDate)
        // https://mymth.github.io/vanillajs-datepicker
        const datepicker = new Datepicker(InputStartDate, {
            autohide : true,
            format : "dd/mm/yyyy",
            language : "fr",
            todayHighlight : true,
            updateOnBlur : false
        });
        InputStartDate.addEventListener('focusout', (event) => {
            // Convert sting dd/mm/yyyy to timestemp
            this._StartData = new Date(this.FormatStringToDate(InputStartDate.value)).getTime()
            this.GetLogData(this._TypeLog, this._StartData, this._UserID, this._SearchText)
        });
        InputStartDate.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
              event.preventDefault();
              InputStartDate.blur()
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
                let GroupFiltred = (me._ListeOfUser == null)? [{label: me._ConstAllUserText, id: me._ConstAllUser }] : me._ListeOfUser.filter(n => n.label.toLowerCase().startsWith(text))
                update(GroupFiltred);
            },
            onSelect: function(item) {
                document.getElementById("InputUserValue").value = item.label;
                if (item.label != "No suggestion"){
                    me._UserID = item.id
                    me._InputUserValue = item.label
                    me.GetLogData(me._TypeLog, me._StartData, me._UserID, me._SearchText)
                }
            }
        })

        // Add Start Date
        let InputText = (this._SearchText == this._NoSearchText)? "" : this._SearchText
        const InputSearchText = NanoXBuild.Input(InputText, "text", "InputSearchText", "Search text", "InputSearchText", "NanoxAdminInput NanoxAdminInputUserValue NanoxText", "")
        InputSearchText.autocomplete = "off"
        divinputbox.appendChild(InputSearchText)
        InputSearchText.addEventListener('focusout', (event) => {
            this._SearchText = InputSearchText.value
            this.GetLogData(this._TypeLog, this._StartData, this._UserID, this._SearchText)
        
        })
        InputSearchText.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
              event.preventDefault();
              InputSearchText.blur()
            }
        });


        // Add Div Log
        let divlog = NanoXBuild.DivFlexColumn("DivLog", "", "")
        this._DivApp.appendChild(divlog)
    }

    FormatDateToString(inputTimestemp) {
        let InputDate = new Date(inputTimestemp)
        let date, month, year
        date = InputDate.getDate();
        month = InputDate.getMonth() + 1;
        year = InputDate.getFullYear();
      
        date = date.toString().padStart(2, '0');
      
        month = month.toString().padStart(2, '0');
      
        return `${date}/${month}/${year}`;
    }

    FormatStringToDate(InputDate){
        let dateParts = InputDate.split("/");
        return new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0], 23, 59, 59); 
    }
    
}

let MyNanoXLog = new NanoXLog()
NanoXAddModule("Log", IconAdmin.IconModuleLog(), MyNanoXLog.Start.bind(MyNanoXLog), false)