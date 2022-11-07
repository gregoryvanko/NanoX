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
        this._SplashDuration = 1000
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
        document.body.innerHTML = ""
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
        this.RemoveLocalStorage()
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

    RemoveLocalStorage(){
        localStorage.removeItem(this._DbKeyToken)
        localStorage.removeItem(this._DBKeyVersion)
        localStorage.removeItem(this._DBKeyCodeAppCSS)
        localStorage.removeItem(this._DBKeyCodeAppJS)
    }

    LoadApp(){
        document.body.innerHTML = ""
        document.body.appendChild(this.GetWaintingScreen() )
        axios({
            method: 'post',
            url: '/nanoxloadapp',
            headers: {
                'x-auth-token': `${this.GetToken()}`,
                'Content-Type': 'application/json'
            },
            data: {
                Version: `${this.GetVersion()}`
            },
            onDownloadProgress : progressEvent => {
                const percentage = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total
                );
                if(document.getElementById("ProgressBar")){document.getElementById("ProgressBar").value = percentage}
                if(document.getElementById("ProgressText")){document.getElementById("ProgressText").innerText = percentage + "%"}
            }
        })
        .then((response) => {
            const myreponse = response.data
            let CSS = document.createElement('style')
            CSS.type = 'text/css'
            CSS.id = 'CodeCSS'
            let JS = document.createElement('script')
            JS.type = 'text/javascript'
            JS.id = 'CodeJs'
            if (myreponse.Version != this.GetVersion()){
                console.log("From server")
                localStorage.setItem(this._DBKeyVersion, myreponse.Version)
                // Load de l'application CSS
                CSS.innerHTML = myreponse.CodeAppCSS
                localStorage.setItem(this._DBKeyCodeAppCSS, myreponse.CodeAppCSS)
                // Load de l'application JS
                JS.innerHTML = myreponse.CodeAppJS
                localStorage.setItem(this._DBKeyCodeAppJS, myreponse.CodeAppJS)
            } else {
                console.log("From Browser")
                // Load de l'application CSS
                CSS.innerHTML = localStorage.getItem(this._DBKeyCodeAppCSS)
                // Load de l'application JS
                JS.innerHTML = localStorage.getItem(this._DBKeyCodeAppJS)
            }
            // Add Css
            document.getElementsByTagName('head')[0].appendChild(CSS)
            let Time = 100
            if (this._SplashScreen != "null"){
                let TacTimeSplashScreen = new Date().getTime()
                let TicTacDelta = this._SplashDuration - (TacTimeSplashScreen - this._TicTimeSplashScreen)
                Time = (TicTacDelta < 0) ? 1 : TicTacDelta
            }
            let SplashScreenBackgroundColor = this._SplashScreenBackgroundColor
            setTimeout(function() {
                // Set background white
                if (SplashScreenBackgroundColor != null){
                    document.body.style.removeProperty("background-color")
                }
                // effacer le contenu du body
                document.body.innerHTML = ""
                // Lancement du javascript de l'application
                document.getElementsByTagName('head')[0].appendChild(JS)
            }, Time)
        })
        .catch((error) => {
            this.RemoveLocalStorage()
            if (error.response) {
                if ((error.response.status == 500) || (error.response.status == 401)){
                    this.SetErrorMessage(error.response.data)
                } else {
                    this.SetErrorMessage(error.response.data)
                }
            } else if (error.request) {
                this.SetErrorMessage(error.request)
            } else {
                this.SetErrorMessage(error.message)
            }
        })
    }

    LogedIn(Token){
        this._Token = Token
        localStorage.setItem(this._DbKeyToken, this._Token)
        this.Start()
    }

    SignedUp(Token){
        this._Token = Token
        localStorage.setItem(this._DbKeyToken, this._Token)
        this.Start()
    }

    GetWaintingScreen(){
        let reponse = ""
        if(this._SplashScreen != "null"){
            if (this._SplashScreenBackgroundColor != "null"){
                document.body.style.backgroundColor = this._SplashScreenBackgroundColor
            }
            this._TicTimeSplashScreen = new Date().getTime()
            reponse = this.GetSplashScreen()
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

    GetSplashScreen(){
        let div = document.createElement("div")
        div.classList.add("NanoXFlexColCenter")
        div.style.width = "100vw"
        div.style.height = "100vh"
        div.style.justifyContent = "flex-start"
        div.innerHTML = this._SplashScreen

        return div
    }

    SetErrorMessage(Error){
        if(this._SplashScreen != "null"){
            document.body.innerHTML = ""
            document.body.appendChild(this.GetLoadingView())
        }
        // Set background white
        if (this._SplashScreenBackgroundColor != "null"){
            document.body.style.removeProperty("background-color")
        }
        document.getElementById("ErrorMsg").innerText = Error;
        document.getElementById("LoadingButton").style.display= "block"
        document.getElementById("DivText").style.display= "none"
        document.getElementById(this._IdProgressBar).style.display= "none"
    }
}