class NanoXViewLogin{
    constructor(LogedIn){
        this._LogedIn = LogedIn
    }

    GetView(Login){
        // Content
        let divcontent = document.createElement("div")
        divcontent.classList.add("NanoXFlexColCenter")
        divcontent.style.width = "100%"
        // empty space
        divcontent.appendChild(this.BuildEmptySpace("1rem"))
        // Titre
        let divtitre = document.createElement("div")
        divcontent.appendChild(divtitre)
        divtitre.classList.add("NanoxTitre")
        divtitre.classList.add("NanoXAppColor")
        divtitre.innerText = document.title
        // empty space
        divcontent.appendChild(this.BuildEmptySpace("4rem"))
        // Box
        let divbox = document.createElement("div")
        divcontent.appendChild(divbox)
        divbox.classList.add("NanoxBoxShadow")
        divbox.classList.add("NanoXFlexColCenter")
        // empty space
        divbox.appendChild(this.BuildEmptySpace("0.5rem"))
        // Input email
        let InputMail = document.createElement("input")
        divbox.appendChild(InputMail)
        InputMail.id = "LoginLoginValue"
        InputMail.classList.add("NanoxLoginInput")
        InputMail.classList.add("NanoxText")
        InputMail.setAttribute("type", "text")
        InputMail.setAttribute("tabindex", "1")
        InputMail.placeholder = "Email"
        InputMail.autofocus= true
        InputMail.autocomplete = "off"
        InputMail.addEventListener("keyup", this.InputKeyUpLogin.bind(this))
        // Input Pass
        let InputPass = document.createElement("input")
        divbox.appendChild(InputPass)
        InputPass.id = "LoginPswValue"
        InputPass.classList.add("NanoxLoginInput")
        InputPass.classList.add("NanoxText")
        InputPass.setAttribute("type", "password")
        InputPass.setAttribute("tabindex", "2")
        InputPass.placeholder = "Pass"
        InputPass.autocomplete = "off"
        InputPass.addEventListener("keyup", this.InputKeyUpLogin.bind(this))
        // Error Message
        let diverror = document.createElement("div")
        divbox.appendChild(diverror)
        diverror.id= "LoginErrorMsg"
        diverror.classList.add("NanoxErrorText")
        diverror.classList.add("NanoxText")
        diverror.innerText = ""
        // empty space
        divbox.appendChild(this.BuildEmptySpace("2rem"))
        // Button login
        let buttonLogin = document.createElement("button")
        divbox.appendChild(buttonLogin)
        buttonLogin.classList.add("NanoxButton")
        buttonLogin.classList.add("NanoxText")
        buttonLogin.setAttribute("tabindex", "3")
        buttonLogin.innerText = "Login"
        buttonLogin.style.width = "30%"
        buttonLogin.id = "LoginButtonLogin"
        buttonLogin.addEventListener("click", this.ClickLogin.bind(this))
        // empty space
        divbox.appendChild(this.BuildEmptySpace("0.5rem"))

        return divcontent
    }

    BuildEmptySpace(val){
        let div = document.createElement("div")
        div.style.height = val
        return div
    }

    IsInputLoginValide(){
        document.getElementById("LoginErrorMsg").innerHTML =""
        let IsValide = true
        let ErrorMessage = ""
        if (document.getElementById('LoginLoginValue').value.length < 1){
            ErrorMessage += "Login is empty";
            IsValide = false;
        } 
        if (document.getElementById('LoginPswValue').value.length < 1){
            if (ErrorMessage != ""){ErrorMessage += " and "}
            ErrorMessage += "Pass is empty";
            IsValide = false;
        } 
        if(!IsValide){
            this.ShowErrorMessage(ErrorMessage)
        }
        return IsValide;
    }

    ClickLogin(){
        if(this.IsInputLoginValide()){
            document.getElementById('LoginButtonLogin').innerText = "Waiting..."
            // Get Token
            axios({
                method: 'post',
                url: '/nanoxauth',
                data: {
                    User: document.getElementById('LoginLoginValue').value,
                    Pass: document.getElementById('LoginPswValue').value
                }
            })
            .then((response) => {
                document.getElementById("LoginErrorMsg").innerHTML = "";
                document.getElementById('LoginButtonLogin').innerText = "Login"
                this._LogedIn(response.data.Token)
            })
            .catch((error) => {
                if (error.response) {
                    if (error.response.status == 500){
                        this.ShowErrorMessage(error.response.data.ErrorMsg)
                    } else {
                        this.ShowErrorMessage(error.response.data)
                    }
                } else if (error.request) {
                    this.ShowErrorMessage(error.request)
                } else {
                    this.ShowErrorMessage(error.message)
                }
            })
        }
    }

    ShowErrorMessage(Error){
        document.getElementById("LoginErrorMsg").innerHTML = Error;
        document.getElementById('LoginButtonLogin').innerText = "Login"
    }

    InputKeyUpLogin(event){
        if(event.keyCode === 13){
            this.ClickLogin()
        }
    }
}