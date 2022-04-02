class NanoXMenuBar {
    constructor(NanoXAppOption){
        this._NanoXAppOption = NanoXAppOption

        this._IdMenuBar = "IdMenuBar"
        this._IdMenuBarEmpty = "IdMenuBarEmpty"
        this._IdMenuBarTranslucideLeft = "IdMenuBarTranslucideLeft"
        this._IdMenuBarTranslucideright = "IdMenuBarTranslucideright"
        this._IdMenuBarTranslucideEmpty = "IdMenuBarTranslucideEmpty"
        this._IdBarButtonLeft = "IdBarButtonLeft"
        this._IdBarActionButtonLeft = "IdBarActionButtonLeft"
        this._IdBarActionButtonRight = "IdBarActionButtonRight"
        this._IdBarTitreName = "IdBarTitreName"
        this._IdNanoXMobileMenu = "IdNanoXMobileMenu"
        this._IdNanoXUserMenu = "IdNanoXUserMenu"

        this._ListOfActionButtonBar = []
    }

    ShowMenuBar(Show = this._NanoXAppOption.ShowMenuBar, OnTop= this._NanoXAppOption.MenuBarOnTop, Istranslucide = this._NanoXAppOption.MenuBarIsTranslucide){
        // faut-it afficher la bar de menu
        if(Show){
            // remove all element of menu bar
            this.RemoveMenuBar()
            this.RemoveBuildMenuBarTranslucide()
            // la bar de menu est elle translucide?
            if(Istranslucide){
                // afficher un bar de menu translucide
                this.BuildMenuBarTranslucide()
            } else {
                // afficher un bar de menu non translucide
                this.BuildMenuBar(OnTop)
            }
            // Show name
            this.ShowNameInMenuBar(this._NanoXAppOption.ShowNameInMenuBar)
            // Build Button
            this.BuildMenuButton()
        } else {
            // remove all element of menu bar
            this.RemoveMenuBar()
            this.RemoveBuildMenuBarTranslucide()
        }
    }

    ShowNameInMenuBar(Show = true){
        if(Show){
            if (! document.getElementById(this._IdBarTitreName)){
                let ClassName =(this._NanoXAppOption.CssClassForName != null)? this._NanoXAppOption.CssClassForName : "NanoXActionBarTitre"

                let divName = NanoXBuild.DivText(this._NanoXAppOption.AppName, this._IdBarTitreName, "NanoXAppColor " +  ClassName, null)
                document.getElementById(this._IdBarButtonLeft).insertBefore(divName, document.getElementById(this._IdBarButtonLeft).firstChild)
            }
        } else {
            if (document.getElementById(this._IdBarTitreName)){
                document.getElementById(this._IdBarButtonLeft).removeChild(document.getElementById(this._IdBarTitreName))
            }
        }
    }

    SetMenuBarOnTop(OnTop = true){
        if (OnTop){
            this._NanoXAppOption.MenuBarOnTop = true
            this.ShowMenuBar(true, this._NanoXAppOption.MenuBarOnTop, this._NanoXAppOption.MenuBarIsTranslucide)
        } else {
            this._NanoXAppOption.MenuBarOnTop = false
            this.ShowMenuBar(true, this._NanoXAppOption.MenuBarOnTop, this._NanoXAppOption.MenuBarIsTranslucide)
        }
    }

    SetMenuBarTranslucide(Translucide = true){
        if (Translucide){
            this._NanoXAppOption.MenuBarIsTranslucide = true
            this.ShowMenuBar(true, this._NanoXAppOption.MenuBarOnTop, this._NanoXAppOption.MenuBarIsTranslucide)
        } else {
            this._NanoXAppOption.MenuBarIsTranslucide = false
            this.ShowMenuBar(true, this._NanoXAppOption.MenuBarOnTop, this._NanoXAppOption.MenuBarIsTranslucide)
        }
    }

    AddMenuButtonLeft(Id = null, Titre= null, Svg= null, Action= null){
        if(Titre == null){Titre = "No Titre"}
        if (Action == null) {Action = ()=>{alert("Action not define")}}
        this._ListOfActionButtonBar.push({Type: "Left", Id: Id, Svg:Svg, Titre: Titre, Action: Action})
        let button = this.BuildActionButton(Id, Svg, Action)
        document.getElementById(this._IdBarActionButtonLeft).appendChild(button)
    }

    ClearMenuButtonLeft(){
        document.getElementById(this._IdBarActionButtonLeft).innerHTML = ""
        let newlist =[]
        this._ListOfActionButtonBar.forEach(element => {
            if (element.Type == "Right"){
                newlist.push(element)
            }
        });
        this._ListOfActionButtonBar = newlist
    }

    AddMenuButtonRight(Id = null, Titre= null, Svg= null, Action= null){
        if(Titre == null){Titre = "No Titre"}
        if (Action == null) {Action = ()=>{alert("Action not define")}}
        this._ListOfActionButtonBar.push({Type: "Right", Id: Id, Svg:Svg, Titre: Titre, Action: Action})
        let button = this.BuildActionButton(Id, Svg, Action)
        document.getElementById(this._IdBarActionButtonRight).appendChild(button)
    }

    ClearMenuButtonRight(){
        document.getElementById(this._IdBarActionButtonRight).innerHTML = ""
        let newlist =[]
        this._ListOfActionButtonBar.forEach(element => {
            if (element.Type == "Left"){
                newlist.push(element)
            }
        });
        this._ListOfActionButtonBar = newlist
    }


    BuildMenuBarTranslucide(){
        if (!document.getElementById(this._IdMenuBarTranslucideright)){
            let divMenuBarRight= NanoXBuild.Div(this._IdMenuBarTranslucideright, "NanoXMenuBarTranslucideRight")
            divMenuBarRight.style.height = this._NanoXAppOption.HeightMenuBar
            // Add to body
            document.body.insertBefore(divMenuBarRight, document.body.firstChild)
            // Add Bar Button Left
            divMenuBarRight.appendChild(this.BuildBarButtonRight())
        }

        if (!document.getElementById(this._IdMenuBarTranslucideLeft)){
            let divMenuBarLeft= NanoXBuild.Div(this._IdMenuBarTranslucideLeft, "NanoXMenuBarTranslucideLeft")
            divMenuBarLeft.style.height = this._NanoXAppOption.HeightMenuBar
            // Add to body
            document.body.insertBefore(divMenuBarLeft, document.body.firstChild)
            // Add Bar Button Left
            divMenuBarLeft.appendChild(this.BuildBarButtonLeft())
        }

        if (!document.getElementById(this._IdMenuBarTranslucideEmpty)){
            let divSafeIos = NanoXBuild.Div(this._IdMenuBarTranslucideEmpty, "NanoXHeightSafeTop", "width: 100%; background-color: black;")
            // Add to body
            document.body.insertBefore(divSafeIos, document.body.firstChild)
        }
    }

    RemoveBuildMenuBarTranslucide(){
        if (document.getElementById(this._IdMenuBarTranslucideLeft)){document.body.removeChild(document.getElementById(this._IdMenuBarTranslucideLeft))}
        if (document.getElementById(this._IdMenuBarTranslucideright)){document.body.removeChild(document.getElementById(this._IdMenuBarTranslucideright))}
        if (document.getElementById(this._IdMenuBarTranslucideEmpty)){document.body.removeChild(document.getElementById(this._IdMenuBarTranslucideEmpty))}
    }

    BuildMenuBar(OnTop){
        if (!document.getElementById(this._IdMenuBar)){
            let divMenuBar= NanoXBuild.Div(this._IdMenuBar, null, "width: 100%;")
            if(OnTop){divMenuBar.classList.add("NanoXMenuBarOnTop")}
            let divSafeIos = NanoXBuild.Div(null, "NanoXHeightSafeTop", "width: 100%; background-color: black;")
            divMenuBar.appendChild(divSafeIos)
            let divMenu = NanoXBuild.DivFlexRowSpaceBetween(this._IdMenuBar, "NanoXMenuBar")
            divMenu.style.backgroundColor = this._NanoXAppOption.ColorMenuBar
            divMenu.style.height = this._NanoXAppOption.HeightMenuBar
            divMenu.style.borderBottomWidth = "1px"
            divMenuBar.appendChild(divMenu)
            // Add to body
            document.body.insertBefore(divMenuBar, document.body.firstChild)
            // add fake div bellow Menu Bar
            if(OnTop){this.BuildMenuBarEmpty()}
            // Add Bar Button Left
            divMenu.appendChild(this.BuildBarButtonLeft())
            // Add Bar Button Right
            divMenu.appendChild(this.BuildBarButtonRight())
        }
    }

    RemoveMenuBar(){
        if (document.getElementById(this._IdMenuBar)){document.body.removeChild(document.getElementById(this._IdMenuBar))}
        this.RemoveMenuBarEmpty()
    }

    BuildMenuBarEmpty(){
        if (!document.getElementById(this._IdMenuBarEmpty)){
            let divdim = NanoXBuild.Div(this._IdMenuBarEmpty, null ,"width: 100%;")
            let divSafeIos = NanoXBuild.Div(null, "NanoXHeightSafeTop", "width: 100%;")
            divdim.appendChild(divSafeIos)
            let divdmenu = NanoXBuild.Div(null, null ,"width: 100%;")
            divdim.appendChild(divdmenu)
            divdmenu.style.height = this._NanoXAppOption.HeightMenuBar
            let divMenuBar = document.getElementById(this._IdMenuBar)
            divMenuBar.parentNode.insertBefore(divdim, divMenuBar.nextSibling)
        }
    }

    RemoveMenuBarEmpty(){
        if (document.getElementById(this._IdMenuBarEmpty)){document.body.removeChild(document.getElementById(this._IdMenuBarEmpty))}
    }

    BuildBarButtonLeft(){
        // Blur en dessous des bar button si le menu est translicide
        let blur = (this._NanoXAppOption.MenuBarIsTranslucide)? " backdrop-filter: blur(4px);" : ""
        let divBarButtonLeft = NanoXBuild.DivFlexRowStart(this._IdBarButtonLeft, null, "margin-left: 0.8rem; border-radius: 10px; border: transparent solid;" + blur)
        divBarButtonLeft.appendChild(NanoXBuild.Div(this._IdBarActionButtonLeft, "NanoXActionBarFlexStart"))
        return divBarButtonLeft
    }

    BuildBarButtonRight(){
        // Blur en dessous des bar button si le menu est translicide
        let blur = (this._NanoXAppOption.MenuBarIsTranslucide)? " backdrop-filter: blur(4px);" : ""
        let divBarButtonRight = NanoXBuild.DivFlexRowEnd(null, null, "margin-right: 0.8rem; border-radius: 10px; border: transparent solid;" + blur)
        divBarButtonRight.appendChild(NanoXBuild.Div(this._IdBarActionButtonRight, "NanoXActionBarFlexEnd"))
        divBarButtonRight.appendChild(this.BuildActionButton("NanoXUserButton", this.SvgTroisDots(this.GetIconColor()), this.ClickOnUser.bind(this)))
        // Add HambergerIcon
        this.BuildHamburgerIcon(divBarButtonRight)
        return divBarButtonRight
    }

    GetIconColor(){
        let Colormenubaricon = this._NanoXAppOption.ColorIconMenuBar
        // si la couleur de la barre = la couleur dans l'icone, alors l'icone est noir (ou blache si la colour de la bar est noir)
        if (this._NanoXAppOption.ColorIconMenuBar == this._NanoXAppOption.ColorMenuBar){
            if (this._NanoXAppOption.ColorMenuBar == "black"){
                Colormenubaricon = "white"
            } else {
                Colormenubaricon = "black"
            }
        }
        if (this._NanoXAppOption.MenuBarIsTranslucide){
            if(Colormenubaricon == "white"){
                Colormenubaricon = "black"
            }
        }
        return Colormenubaricon
    }

    BuildHamburgerIcon(divBarButtonRight){
        let ColorMenuBarIcon = this.GetIconColor()
        let hambergerIcon = NanoXBuild.Div("Nxhamburger-icon")
        divBarButtonRight.appendChild(hambergerIcon)
        let bar1 = NanoXBuild.Div(null, "bar1")
        bar1.style.backgroundColor = ColorMenuBarIcon
        hambergerIcon.appendChild(bar1)
        let bar2 = NanoXBuild.Div(null, "bar2")
        bar2.style.backgroundColor = ColorMenuBarIcon
        hambergerIcon.appendChild(bar2)
        let bar3 = NanoXBuild.Div(null, "bar3")
        bar3.style.backgroundColor = ColorMenuBarIcon
        hambergerIcon.appendChild(bar3)
        hambergerIcon.onclick = this.ClickHambergerIcon.bind(this)
    }


    BuildMenuButton(){
        this._ListOfActionButtonBar.forEach(element => {
            let button = this.BuildActionButton(element.Id, element.Svg, element.Action)
            if (element.Type == "Left"){
                document.getElementById(this._IdBarActionButtonLeft).appendChild(button)
            }
            if (element.Type == "Right"){
                document.getElementById(this._IdBarActionButtonRight).appendChild(button)
            }
        });
    }

    BuildActionButton(Id = null, Svg = null, Action=null){
        if (Svg == null){ 
            Svg = this.SvgDefault(this.GetIconColor())
        }
        if (Action == null) {Action = ()=>{alert("Action not define")}}
        let button = document.createElement("button")
        if (Id){button.id = Id}
        button.classList.add("NanoXActionButton")
        button.innerHTML = Svg
        button.onclick = Action
        return button
    }

    SvgDefault(Color= "#000000"){
        return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 172 172"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="${Color}"><path d="M30.96,13.76c-9.44436,0 -17.2,7.75564 -17.2,17.2v110.08c0,9.44437 7.75564,17.2 17.2,17.2h110.08c9.44437,0 17.2,-7.75563 17.2,-17.2v-110.08c0,-9.44436 -7.75563,-17.2 -17.2,-17.2zM30.96,20.64h110.08c5.69163,0 10.32,4.62836 10.32,10.32v110.08c0,5.69163 -4.62837,10.32 -10.32,10.32h-110.08c-5.69164,0 -10.32,-4.62837 -10.32,-10.32v-110.08c0,-5.69164 4.62836,-10.32 10.32,-10.32zM44.72,51.6c-1.24059,-0.01754 -2.39452,0.63425 -3.01993,1.7058c-0.62541,1.07155 -0.62541,2.39684 0,3.46839c0.62541,1.07155 1.77935,1.72335 3.01993,1.7058h82.56c1.24059,0.01754 2.39452,-0.63425 3.01993,-1.7058c0.62541,-1.07155 0.62541,-2.39684 0,-3.46839c-0.62541,-1.07155 -1.77935,-1.72335 -3.01993,-1.7058zM44.72,82.56c-1.24059,-0.01754 -2.39452,0.63425 -3.01993,1.7058c-0.62541,1.07155 -0.62541,2.39684 0,3.46839c0.62541,1.07155 1.77935,1.72335 3.01993,1.7058h82.56c1.24059,0.01754 2.39452,-0.63425 3.01993,-1.7058c0.62541,-1.07155 0.62541,-2.39684 0,-3.46839c-0.62541,-1.07155 -1.77935,-1.72335 -3.01993,-1.7058zM44.72,113.52c-1.24059,-0.01754 -2.39452,0.63425 -3.01993,1.7058c-0.62541,1.07155 -0.62541,2.39684 0,3.46839c0.62541,1.07155 1.77935,1.72335 3.01993,1.7058h82.56c1.24059,0.01754 2.39452,-0.63425 3.01993,-1.7058c0.62541,-1.07155 0.62541,-2.39684 0,-3.46839c-0.62541,-1.07155 -1.77935,-1.72335 -3.01993,-1.7058z"></path></g></g></svg>`
    }

    SvgUser(Color = "#000000"){
        return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 172 172"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path><g fill="${Color}"><path d="M89.01,11.7175c-16.07125,0.29563 -26.3375,6.78594 -30.745,16.8775c-4.20594,9.60781 -3.26531,21.74188 -0.215,34.2925c-1.63937,1.92156 -2.94281,4.50156 -2.4725,8.385c0.51063,4.23281 1.67969,7.24281 3.3325,9.3525c0.91375,1.15563 2.10969,1.26313 3.225,1.8275c0.60469,3.60125 1.6125,7.2025 3.1175,10.2125c0.86,1.73344 1.84094,3.3325 2.795,4.6225c0.43,0.57781 1.04813,0.91375 1.505,1.3975c0.02688,4.24625 0.04031,7.78031 -0.3225,12.255c-1.11531,2.70094 -3.72219,4.87781 -7.955,6.9875c-4.36719,2.17688 -10.05125,4.1925 -15.8025,6.665c-5.75125,2.4725 -11.66375,5.4825 -16.34,10.2125c-4.67625,4.73 -7.98187,11.22031 -8.4925,19.78l-0.215,3.655h138.03l-0.215,-3.655c-0.51062,-8.55969 -3.82969,-15.05 -8.4925,-19.78c-4.66281,-4.73 -10.50812,-7.74 -16.2325,-10.2125c-5.72437,-2.4725 -11.34125,-4.48812 -15.695,-6.665c-4.17906,-2.09625 -6.81281,-4.21937 -7.955,-6.88c-0.37625,-4.52844 -0.34937,-8.07594 -0.3225,-12.3625c0.45688,-0.49719 1.075,-0.81969 1.505,-1.3975c0.94063,-1.30344 1.84094,-2.9025 2.6875,-4.6225c1.46469,-3.01 2.52625,-6.62469 3.1175,-10.2125c1.075,-0.56437 2.23063,-0.69875 3.1175,-1.8275c1.65281,-2.10969 2.82188,-5.11969 3.3325,-9.3525c0.45688,-3.7625 -0.80625,-6.24844 -2.365,-8.17c1.67969,-5.45562 3.82969,-14.27062 3.1175,-23.3275c-0.38969,-4.945 -1.65281,-9.87656 -4.6225,-13.975c-2.71437,-3.7625 -7.12187,-6.50375 -12.685,-7.6325c-3.61469,-4.68969 -10.11844,-6.45 -17.63,-6.45zM89.1175,18.5975c0.04031,0 0.06719,0 0.1075,0c6.92031,0.02688 11.40844,2.05594 12.685,4.3l0.86,1.3975l1.6125,0.215c4.78375,0.65844 7.525,2.59344 9.46,5.2675c1.935,2.67406 3.01,6.40969 3.3325,10.535c0.645,8.25063 -1.73344,17.85844 -3.225,22.36l-0.86,2.6875l2.365,1.3975c-0.14781,-0.09406 1.31688,0.90031 0.9675,3.7625c-0.40312,3.37281 -1.20937,5.11969 -1.8275,5.9125c-0.61812,0.79281 -0.94062,0.7525 -0.9675,0.7525l-2.9025,0.215l-0.3225,2.795c-0.3225,2.96969 -1.51844,6.61125 -2.9025,9.46c-0.69875,1.42438 -1.41094,2.67406 -2.0425,3.5475c-0.63156,0.87344 -1.29,1.35719 -0.9675,1.1825l-1.8275,0.9675v2.0425c0,4.98531 -0.20156,9.07031 0.3225,14.835v0.43l0.215,0.43c1.96188,5.28094 6.50375,8.57313 11.5025,11.0725c4.99875,2.49938 10.73656,4.34031 16.125,6.665c5.38844,2.32469 10.32,5.10625 13.975,8.815c2.9025,2.94281 4.73,6.83969 5.6975,11.7175h-122.12c0.9675,-4.86437 2.78156,-8.77469 5.6975,-11.7175c3.66844,-3.70875 8.66719,-6.49031 14.0825,-8.815c5.41531,-2.32469 11.11281,-4.16562 16.125,-6.665c5.01219,-2.49937 9.64813,-5.79156 11.61,-11.0725l0.215,-0.86c0.52406,-5.76469 0.3225,-9.84969 0.3225,-14.835v-2.0425l-1.8275,-0.9675c0.30906,0.16125 -0.43,-0.30906 -1.075,-1.1825c-0.645,-0.87344 -1.43781,-2.12312 -2.15,-3.5475c-1.42437,-2.84875 -2.59344,-6.51719 -2.9025,-9.46l-0.3225,-2.795l-2.9025,-0.215c-0.02687,0 -0.34937,0.04031 -0.9675,-0.7525c-0.61812,-0.79281 -1.42437,-2.53969 -1.8275,-5.9125c-0.33594,-2.86219 1.11531,-3.85656 0.9675,-3.7625l2.2575,-1.3975l-0.645,-2.4725c-3.23844,-12.47 -3.80281,-23.79781 -0.43,-31.4975c3.35938,-7.67281 10.2125,-12.49687 24.51,-12.7925z"></path></g></g></svg>`
    }

    SvgLogout(Color = "#000000"){
        return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 172 172"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"/><g fill="${Color}"><path d="M85.94625,6.82625c-1.89469,0.04031 -3.41312,1.59906 -3.38625,3.49375v75.68c-0.01344,1.23625 0.63156,2.39188 1.70656,3.02344c1.075,0.61813 2.39187,0.61813 3.46687,0c1.075,-0.63156 1.72,-1.78719 1.70656,-3.02344v-75.68c0.01344,-0.92719 -0.34937,-1.8275 -1.00781,-2.48594c-0.65844,-0.65844 -1.55875,-1.02125 -2.48594,-1.00781zM62.08125,10.80375c-0.43,-0.01344 -0.86,0.05375 -1.24969,0.18813c-31.36313,10.52156 -53.95156,40.15125 -53.95156,75.00812c0,43.65844 35.46156,79.12 79.12,79.12c43.65844,0 79.12,-35.46156 79.12,-79.12c0,-34.85687 -22.58844,-64.48656 -53.95156,-75.00812c-1.80062,-0.60469 -3.74906,0.36281 -4.35375,2.16344c-0.60469,1.80062 0.36281,3.74906 2.17688,4.36719c28.60844,9.59438 49.24844,36.59031 49.24844,68.4775c0,39.93625 -32.30375,72.24 -72.24,72.24c-39.93625,0 -72.24,-32.30375 -72.24,-72.24c0,-31.88719 20.64,-58.88312 49.24844,-68.4775c1.59906,-0.52406 2.59344,-2.09625 2.35156,-3.7625c-0.22844,-1.65281 -1.6125,-2.9025 -3.27875,-2.95625z"/></g></g></svg>`
    }

    SvgHome(Color = "#000000") {
        return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 172 172"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"/><g fill="${Color}"><path d="M85.87235,3.62813c-0.72195,0.0249 -1.41775,0.27642 -1.98875,0.71891l-79.12,61.7386c-1.49911,1.16886 -1.76683,3.33167 -0.59797,4.83078c1.16886,1.49911 3.33167,1.76683 4.83078,0.59797l4.76359,-3.71547v90.4411c0.00019,1.89978 1.54022,3.43981 3.44,3.44h47.58219c0.37149,0.0614 0.75054,0.0614 1.12203,0h40.15797c0.37149,0.0614 0.75054,0.0614 1.12203,0h47.61578c1.89978,-0.00019 3.43981,-1.54022 3.44,-3.44v-90.4411l4.7636,3.71547c0.96974,0.75623 2.26928,0.93763 3.40904,0.47586c1.13976,-0.46177 1.94657,-1.49654 2.11649,-2.71449c0.16992,-1.21795 -0.32287,-2.43403 -1.29273,-3.19012l-26.1964,-20.43844v-25.00719h-20.64v8.89562l-32.2836,-25.18859c-0.64007,-0.49632 -1.43474,-0.7509 -2.24406,-0.71891zM86,11.42859l65.36,51.00203v92.36937h-41.28v-65.36h-48.16v65.36h-41.28v-92.36937zM127.28,27.52h6.88v12.7589l-6.88,-5.375zM68.8,96.32h34.4v58.48h-34.4z"/></g></g></svg>`
    }

    SvgTroisDots(Color = "#000000"){
        return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 172 172"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"/><g fill="${Color}"><path d="M86,10.32c-11.35469,0 -20.64,9.28531 -20.64,20.64c0,11.35469 9.28531,20.64 20.64,20.64c11.35469,0 20.64,-9.28531 20.64,-20.64c0,-11.35469 -9.28531,-20.64 -20.64,-20.64zM86,17.2c7.64594,0 13.76,6.11406 13.76,13.76c0,7.64594 -6.11406,13.76 -13.76,13.76c-7.64594,0 -13.76,-6.11406 -13.76,-13.76c0,-7.64594 6.11406,-13.76 13.76,-13.76zM86,65.36c-11.35469,0 -20.64,9.28531 -20.64,20.64c0,11.35469 9.28531,20.64 20.64,20.64c11.35469,0 20.64,-9.28531 20.64,-20.64c0,-11.35469 -9.28531,-20.64 -20.64,-20.64zM86,72.24c7.64594,0 13.76,6.11406 13.76,13.76c0,7.64594 -6.11406,13.76 -13.76,13.76c-7.64594,0 -13.76,-6.11406 -13.76,-13.76c0,-7.64594 6.11406,-13.76 13.76,-13.76zM86,120.4c-11.35469,0 -20.64,9.28531 -20.64,20.64c0,11.35469 9.28531,20.64 20.64,20.64c11.35469,0 20.64,-9.28531 20.64,-20.64c0,-11.35469 -9.28531,-20.64 -20.64,-20.64zM86,127.28c7.64594,0 13.76,6.11406 13.76,13.76c0,7.64594 -6.11406,13.76 -13.76,13.76c-7.64594,0 -13.76,-6.11406 -13.76,-13.76c0,-7.64594 6.11406,-13.76 13.76,-13.76z"/></g></g></svg>`
    }



    ClickOnUser(){
        this.BuildViewUserMenu()
    }

    BuildViewUserMenu(){
        if (document.getElementById(this._IdNanoXUserMenu)){
            this.RemoveViewUserMenu()
        } else {
            let divcontent = NanoXBuild.DivFlexColumn(this._IdNanoXUserMenu, "NanoXUserMenu")

            // Home button
            if (this._NanoXAppOption.UseAppModule){
                divcontent.appendChild(this.BuildMobileMenuButton("Home", "NxHome", this.SvgHome(this.GetIconColor()), ()=>{this.RemoveViewUserMenu(); this.ClickOnHome()}))
                divcontent.appendChild(NanoXBuild.Line("100%", "1px", "balck"))
            }

            // Button Mon compte
            divcontent.appendChild(this.BuildMobileMenuButton("Mon Compte", "NxGetMyData", this.SvgUser(this.GetIconColor()), ()=>{this.RemoveViewUserMenu(); this.ClickOnGetMyData()}))

            // Button LogOut
            divcontent.appendChild(this.BuildMobileMenuButton("Logout", "NxLogOut", this.SvgLogout(this.GetIconColor()), ()=>{this.RemoveViewUserMenu(); this.ClickOnLogOut()}))

            document.body.appendChild(divcontent)
        }
    }

    RemoveViewUserMenu(){
        document.body.removeChild(document.getElementById(this._IdNanoXUserMenu))
    }



    ClickHambergerIcon(){
        document.getElementById("Nxhamburger-icon").classList.toggle('Nxopen')
        if (document.getElementById("Nxhamburger-icon").classList.contains('Nxopen')){
            this.BuildViewMobileMenu()
        }else{
            this.RemoveViewMobileMenu()
        }
    }

    BuildViewMobileMenu(){
        let divcontent = NanoXBuild.DivFlexColumn(this._IdNanoXMobileMenu, "NanoXMobileMenu")
        // Left action
        let ActionLeftExist = false
        this._ListOfActionButtonBar.forEach(element => {
            if (element.Type == "Left"){
                let action = element.Action
                divcontent.appendChild(this.BuildMobileMenuButton(element.Titre, element.Id, element.Svg, ()=>{this.ClickHambergerIcon(); action()}))
                ActionLeftExist = true
            }
        });
        // Line
        if (ActionLeftExist){divcontent.appendChild(NanoXBuild.Line("100%", "1px", "balck"))}
        // Right action
        let ActionRightExist = false
        this._ListOfActionButtonBar.forEach(element => {
            if (element.Type == "Right"){
                let action = element.Action
                divcontent.appendChild(this.BuildMobileMenuButton(element.Titre, element.Id, element.Svg, ()=>{this.ClickHambergerIcon(); action()}))
                ActionRightExist = true
            }
        });
        // Line
        if (ActionRightExist){divcontent.appendChild(NanoXBuild.Line("100%", "1px", "balck"))}
        // Home button
        if (this._NanoXAppOption.UseAppModule){
            divcontent.appendChild(this.BuildMobileMenuButton("Home", "Home", this.SvgHome(this.GetIconColor()),()=>{this.ClickHambergerIcon(); this.ClickOnHome()}))
            // Line
            divcontent.appendChild(NanoXBuild.Line("100%", "1px", "balck"))
        }
        // Button Mon compte
        divcontent.appendChild(this.BuildMobileMenuButton("Mon Compte", "NxGetMyData", this.SvgUser(this.GetIconColor()), ()=>{this.ClickHambergerIcon(); this.ClickOnGetMyData()}))
        // Button LogOut   
        divcontent.appendChild(this.BuildMobileMenuButton("Logout", "NxLogOut", this.SvgLogout(this.GetIconColor()), ()=>{this.ClickHambergerIcon(); this.ClickOnLogOut()}))

        document.body.appendChild(divcontent)
    }

    RemoveViewMobileMenu(){
        document.body.removeChild(document.getElementById(this._IdNanoXMobileMenu))
    }

    BuildMobileMenuButton(Titre = null, Id = null, Svg = null, Action=null){
        if (Svg == null){ Svg = this.SvgDefault(this.GetIconColor())}
        if (Action == null) {Action = ()=>{alert("Action not define")}}
        if (Titre == null){Titre = "No Titre"}

        let TextImagDiv = NanoXBuild.DivFlexRowStart(null, null, "width: 100%;")
        let Image = NanoXBuild.Div(null, null, "width: 17%; display: flex;")
        Image.innerHTML = Svg
        TextImagDiv.appendChild(Image)
        let text = NanoXBuild.Div(null, null, "display: flex; margin-left: 0.4rem; color:" + this.GetIconColor())
        text.innerText = Titre
        TextImagDiv.appendChild(text)
        let button = NanoXBuild.Button(TextImagDiv.outerHTML, Action.bind(this), Id, "NanoXMobileMenuButton")
        return button
    }




    ClickOnGetMyData(){
        let MyNanoXUserData = new NanoXUserData()
        MyNanoXUserData.GetUserData()
    }

    ClickOnHome(){
        NanoXStartHomeModule()
    }

    ClickOnLogOut(){
        NanoXLogout()
    }
}