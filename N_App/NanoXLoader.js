class NanoXLoader {
    constructor({AllowSignUp=false, SplashScreen=null, SplashScreenBackgroundColor=null}){
        this._AllowSignUp = AllowSignUp
        this._SplashScreen = SplashScreen
        this._SplashScreenBackgroundColor = SplashScreenBackgroundColor

        // Variable de la LocalDB
        this._DbKeyToken = "NanoXToken"
        this._DBKeyVersion = "NanoXVersion"
        this._DBKeyCodeAppCSS = "NanoXAppCss"
        this._DBKeyCodeAppJS = "NanoXAppJs"
        
        // Token
        this._Token = null

        // SplashSreen data
        this._SplashDuration = 1500
        this._TicTimeSplashScreen = null

        // ProgressBar
        this._IdProgressBar = "ProgressBar"
    }

    Start(){
        this._Token = this.GetToken() 
        if(this._Token != null){
            this.LoadApp()
        } else {
            this.LoadView()
        }
    }

    GetToken(){
        return localStorage.getItem(this._DbKeyToken)
    }

    GetVersion(){
        return localStorage.getItem(this._DBKeyVersion)
    }

    LoadView(){
        let ViewLogin = new NanoXViewLogin(this.LogedIn.bind(this))
        document.body.appendChild(ViewLogin.GetView())

        if (this._AllowSignUp){
            let ViewSignUp = new NanoXViewSignUp(this.SignedUp.bind(this))
            document.body.appendChild(ViewSignUp.GetLink())
        }
    }

    LogOut(){
        document.body.innerHTML = ""
        this._Token = null
        localStorage.removeItem(this._DbKeyToken)
        localStorage.removeItem(this._DBKeyVersion)
        localStorage.removeItem(this._DBKeyCodeAppCSS)
        localStorage.removeItem(this._DBKeyCodeAppJS)
        // Effacer l'anienne application partie JS
        if (document.getElementById("CodeJs")) {
            var CodeJs = document.getElementById("CodeJs")
            CodeJs.parentNode.removeChild(CodeJs)
        }
        // Effacer l'anienne application partie CSS
        if (document.getElementById("CodeCSS")) {
            var CodeCSS = document.getElementById("CodeCSS")
            CodeCSS.parentNode.removeChild(CodeCSS)
        }
        location.reload()
    }

    LoadApp(){
        document.body.innerHTML = ""
        document.body.appendChild(this.GetWaintingScreen() )
        // ToDo
    }

    LogedIn(Token){
        this._Token = Token
        localStorage.setItem(this._DbKeyToken, this._Token)
        this.Start()
    }

    SignedUp(){
        alert("Signed Up ToDo")
    }

    GetWaintingScreen(){
        let reponse = ""
        if(this._SplashScreen != null){
            if (this._SplashScreenBackgroundColor != null){
                document.body.style.backgroundColor = this._SplashScreenBackgroundColor
            }
            this._TicTimeSplashScreen = new Date().getTime()

            let div = document.createElement("div")
            div.classList.add("NanoXFlexColCenter")
            div.style.width = "100vw"
            div.style.height = "100vh"
            div.innerHTML = this._SplashScreen

            reponse = div
        } else {
            reponse = this.GetLoadingView()
        }
        return reponse
    }

    GetLoadingView(){
        // Content
        let divcontent = document.createElement("div")
        divcontent.classList.add("NanoXFlexColCenter")
        divcontent.style.width = "40rem"
        divcontent.style.maxWidth = "90%"
        // Empty
        let divempty = document.createElement("div")
        divempty.style.height = "10rem"
        divcontent.appendChild(divempty)
        // Texte
        let divtexte = document.createElement("div")
        divcontent.appendChild(divtexte)
        divtexte.id= "DivText"
        divtexte.classList.add("NanoxText")
        divtexte.innerText = "Loading App..."
        // Progress bar
        let progressbar = document.createElement("progress")
        divcontent.appendChild(progressbar)
        progressbar.id= this._IdProgressBar
        progressbar.setAttribute("value", "0")
        progressbar.setAttribute("max", "100")
        progressbar.classList.add("NanoxProgressBar")
        // Error Message
        let diverror = document.createElement("div")
        divcontent.appendChild(diverror)
        diverror.id= "ErrorMsg"
        diverror.classList.add("NanoxErrorText")
        diverror.classList.add("NanoxText")
        diverror.innerText = ""
        // Empty
        let divemptuerror = document.createElement("div")
        divemptuerror.style.height = "2rem"
        divcontent.appendChild(divemptuerror)
        // Button reload
        let buttonreload = document.createElement("button")
        divcontent.appendChild(buttonreload)
        buttonreload.classList.add("NanoxButton")
        buttonreload.classList.add("NanoxText")
        buttonreload.innerText = "Reload"
        buttonreload.style.width = "30%"
        buttonreload.id = "LoadingButton"
        buttonreload.style.display=  "none"
        buttonreload.addEventListener("click", ()=>{window.location.reload(true)})

        return divcontent
    }

    SetErrorMessage(Error){
        if(this._SplashScreen != null){
            document.body.innerHTML = this.GetLoadingView()
        }
        // Set background white
        if (this._SplashScreenBackgroundColor != null){
            document.body.style.backgroundColor = "white"
        }
        document.getElementById("ErrorMsg").innerText = Error;
        document.getElementById("LoadingButton").style.display= "block"
        document.getElementById("DivText").style.display= "none"
        document.getElementById(this._IdProgressBar).style.display= "none"
    }
}