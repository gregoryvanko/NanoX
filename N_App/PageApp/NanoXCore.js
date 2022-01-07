class NanoXCore {
    constructor(){
        this._IdDivApp = "IdDivApp"
        this._IdBarActionButton = "IdBarActionButton"
        this._IdBarActionButtonLeft = "IdBarActionButtonLeft"
        this._IdBarActionButtonRight = "IdBarActionButtonRight"
    }

    Start(){
        this.BuildActionButtonBar()
        this.BuildDivApplication()
    }

    BuildActionButtonBar(){
        let divBarButton = NonoXBuild.Div(this._IdBarActionButton, "NanoXActionBar NanoXActionBarDim", "display: -webkit-flex; display: flex; flex-direction: row; justify-content:space-between; align-content:center; align-items: center;")
        document.body.appendChild(divBarButton)
        document.body.appendChild(NonoXBuild.Div(null,"NanoXActionBarDim"))
        let divBarButtonLeft = NonoXBuild.DivFlexRowStart(this._IdBarActionButtonLeft)
        divBarButton.appendChild(divBarButtonLeft)
        divBarButtonLeft.appendChild(NonoXBuild.Div(null, null, "margin-left: 1rem;"))
        divBarButtonLeft.appendChild(NonoXBuild.DivTexte("A"))
        divBarButtonLeft.appendChild(NonoXBuild.DivTexte("B"))
        let divBarButtonRight = NonoXBuild.DivFlexRowEnd(this._IdBarActionButtonRight)
        divBarButton.appendChild(divBarButtonRight)
        divBarButtonRight.appendChild(NonoXBuild.DivTexte("X"))
        divBarButtonRight.appendChild(NonoXBuild.DivTexte("Y"))
        divBarButtonRight.appendChild(NonoXBuild.Div(null, null, "margin-right: 1rem;"))
        
    }

    BuildDivApplication(){
        document.body.appendChild(NonoXBuild.DivFlexColumn(this._IdDivApp, "width: 100%;"))
    }

    GetDivApp(){
        return document.getElementById(this._IdDivApp)
    }
}