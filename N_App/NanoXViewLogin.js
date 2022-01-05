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
        divbox.classList.add("NanoxLoginBox")
        divbox.classList.add("NanoXFlexColCenter")
        // empty space
        divbox.appendChild(this.BuildEmptySpace("0.5rem"))
        // Input email
        let InputMail = document.createElement("input")
        divbox.appendChild(InputMail)
        InputMail.id = "LoginLoginValue"
        InputMail.classList.add("NanoxLoginInput")
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
        InputPass.setAttribute("type", "password")
        InputPass.setAttribute("tabindex", "2")
        InputPass.placeholder = "Pass"
        InputPass.autocomplete = "off"
        InputPass.addEventListener("keyup", this.InputKeyUpLogin.bind(this))
        // Error Message
        let diverror = document.createElement("div")
        divbox.appendChild(diverror)
        diverror.id= "LoginErrorMsg"
        diverror.classList.add("NanoxLoginError")
        diverror.innerText = ""
        // empty space
        divbox.appendChild(this.BuildEmptySpace("2rem"))
        // Button login
        let buttonLogin = document.createElement("button")
        divbox.appendChild(buttonLogin)
        buttonLogin.classList.add("NanoxButton")
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
            document.getElementById("LoginErrorMsg").innerHTML = ErrorMessage;
        }
        return IsValide;
    }


    ClickLogin(){
        if(this.IsInputLoginValide()){
            document.getElementById('LoginButtonLogin').innerText = "Waiting..."
            // ToDo
            this._LogedIn()
        }
    }

    InputKeyUpLogin(event){
        if(event.keyCode === 13){
            this.ClickLogin()
        }
    }
}