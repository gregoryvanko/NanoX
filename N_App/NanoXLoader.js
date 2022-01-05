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
        console.log("ToDo")
    }

    LogedIn(){
        alert("Loged in ToDo")
    }

    SignedUp(){
        alert("Signed Up ToDo")
    }
}