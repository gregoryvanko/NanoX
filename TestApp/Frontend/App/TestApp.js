class TestApp{
    constructor(){
        this._DivApp = NanoXGetDivApp()
        this._ToogleTest = "coucou la valeur est:"
    }

    Start(){
        this._DivApp.appendChild(NanoXBuild.ProgressRing({Id:"test",  Progress:50}))

        let div = NanoXBuild.DivFlexRowStart()
        this._DivApp.appendChild(div)
        div.appendChild(NanoXBuild.DivText('coucou'))
        let TestToggleSwitch = NanoXBuild.ToggleSwitch({Id:"test1", Checked: true, OnChange: this.TestToggleSwitchOnChange.bind(this),HeightRem: 1.5})
        //TestToggleSwitch.onchange = this.TestToggleSwitchOnChange.bind(this)
        div.appendChild(TestToggleSwitch)

    }

    TestToggleSwitchOnChange(e){
        console.log(this._ToogleTest + " " + e.target.checked)
    }
}

let MyTestApp = new TestApp()
NanoXAddModule("Test1 du nouveau titre", null, MyTestApp.Start.bind(MyTestApp), false)
//NanoXAddModule("Test2", null, null, false)