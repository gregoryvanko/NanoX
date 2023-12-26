class TestApp{
    constructor(){
        this._DivApp = NanoXGetDivApp()
        this._ToogleTest = "coucou la valeur est:"
    }

    Start(){
        NanoXClearMenuButtonLeft()
        NanoXAddMenuButtonLeft("Titre","Titre", null, this.TestButton.bind(this))
        NanoXClearMenuButtonRight()
        NanoXAddMenuButtonRight("Titre1","Titre tres long", null, this.TestButton.bind(this))
        NanoXClearMenuButtonSettings()
        NanoXAddMenuButtonSettings("Settings1", "Test settings1", null, this.TestButton.bind(this))
        NanoXAddMenuButtonSettings("Settings2", "Test settings2", null, this.TestButton.bind(this))

        
        NanoXSetMenuBarTranslucide(true)
        NanoXSetMenuBarOnTop(true)
       
        NanoXShowNameInMenuBar(true)

        console.log(NanoXDetAppName())

        this._DivApp.appendChild(NanoXBuild.ProgressRing({Id:"test",  Progress:50}))

        this._DivApp.appendChild(NanoXBuild.Video("/video/2021-10-Bussang.mp4?token=" + NanoXGetToken()))

        let div = NanoXBuild.DivFlexRowStart()
        this._DivApp.appendChild(div)
        div.appendChild(NanoXBuild.DivText('coucou'))
        

        // Test TestToggleSwitch
        let TestToggleSwitch = NanoXBuild.ToggleSwitch({Id:"test1", Checked: true, OnChange: this.TestToggleSwitchOnChange.bind(this),HeightRem: 1.5})
        //TestToggleSwitch.onchange = this.TestToggleSwitchOnChange.bind(this)
        this._DivApp.appendChild(TestToggleSwitch)

        // Test Axios
        NanoXApiGet("/test", {}, this.OnDownloadTest.bind(this)).then( reponse => {
            console.log(reponse)
        }, Err => {
            console.log(Err)
        })

    }

    OnDownloadTest(Pourcent){
        console.log(Pourcent)
    }

    TestToggleSwitchOnChange(e){
        console.log(this._ToogleTest + " " + e.target.checked)
    }

    TestButton(){
        console.log("Testbutton")
    }
}

let MyTestApp = new TestApp()
NanoXAddModule("Test1 du nouveau titre", null, MyTestApp.Start.bind(MyTestApp), true)
NanoXAddModule("Test2", null, null, false)