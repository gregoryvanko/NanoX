class NanoXViewSignUp {
    constructor(SignedUp){
        this._SignedUp = SignedUp
    }

    GetLink(){
        let buttonSignup = document.createElement("button")
        buttonSignup.setAttribute("style", "background:none;border:none; color:blue; cursor: pointer; outline: none; font-size:1rem; margin-top: 2rem;")
        buttonSignup.innerHTML = "<U>Sign Up</U>"
        buttonSignup.addEventListener("click", this.ClickSignUp.bind(this))
        return buttonSignup
    }

    BuildEmptySpace(val){
        let div = document.createElement("div")
        div.style.height = val
        return div
    }

    ClickSignUp(){
        document.body.innerHTML = ""
        // ConteneurForm
        let ConteneurForm = document.createElement("div")
        ConteneurForm.id = "Conteneur"
        ConteneurForm.classList.add("NanoXFlexColCenter")
        ConteneurForm.style.width = "100%"
        document.body.appendChild(ConteneurForm)
        // empty space
        ConteneurForm.appendChild(this.BuildEmptySpace("1rem"))
        // Titre
        let Titre = document.createElement("div")
        ConteneurForm.appendChild(Titre)
        Titre.classList.add("NanoxTitre")
        Titre.classList.add("NanoXAppColor")
        Titre.innerText = document.title
        // empty space
        ConteneurForm.appendChild(this.BuildEmptySpace("4rem"))
        // Box
        let SignUpBox = document.createElement("div")
        ConteneurForm.appendChild(SignUpBox)
        SignUpBox.classList.add("NanoxBoxShadow")
        SignUpBox.classList.add("NanoXFlexColCenter")
        SignUpBox.style.padding = "1rem"
        // empty space
        SignUpBox.appendChild(this.BuildEmptySpace("1rem"))
        // Sous titre Sign Up
        let SousTitre = document.createElement("div")
        SignUpBox.appendChild(SousTitre)
        SousTitre.style.fontSize = "1.5rem"
        SousTitre.innerText = "Sign Up"
        // empty space
        ConteneurForm.appendChild(this.BuildEmptySpace("1rem"))
        // Email
        SignUpBox.appendChild(this.BuildUserDataview("Email", "text"))
        // Frist Name
        SignUpBox.appendChild(this.BuildUserDataview("First-Name", "text"))
        // Last Name
        SignUpBox.appendChild(this.BuildUserDataview("Last-Name", "text"))
        // PAssword
        SignUpBox.appendChild(this.BuildUserDataview("Password", "password"))
        // Error Message
        let diverror = document.createElement("div")
        SignUpBox.appendChild(diverror)
        diverror.id= "AccountErrorMsg"
        diverror.classList.add("NanoxErrorText")
        diverror.classList.add("NanoxText")
        diverror.innerText = ""
        // empty space
        SignUpBox.appendChild(this.BuildEmptySpace("1rem"))
        // Button Signup
        let buttonSignup = document.createElement("button")
        SignUpBox.appendChild(buttonSignup)
        buttonSignup.classList.add("NanoxButton")
        buttonSignup.classList.add("NanoxText")
        buttonSignup.innerText = "Create an Account"
        buttonSignup.id = "AccountButton"
        buttonSignup.addEventListener("click", this.ClickSendSignup.bind(this))
        // empty space
        SignUpBox.appendChild(this.BuildEmptySpace("0.5rem"))
    }

    BuildUserDataview(Key, Type){
        let element = document.createElement("div")
        element.setAttribute("style", "width: 100%; margin-top: 1rem;")
        // Texte
        let Text = document.createElement("div")
        element.appendChild(Text)
        Text.classList.add("NanoxText")
        Text.style.width = "100%"
        Text.style.marginBottom = "0.5rem"
        Text.innerText = Key.replace("-", " ")

        let inputStyle="box-sizing: border-box; outline: none; margin: 0; background: white; -webkit-box-shadow: inset 0 1px 3px 0 rgba(0,0,0,.08); -moz-box-shadow: inset 0 1px 3px 0 rgba(0,0,0,.08); box-shadow: inset 0 1px 3px 0 rgba(0,0,0,.08); -webkit-border-radius: 5px; -moz-border-radius: 5px; border-radius: 5px; color: #666; margin-bottom: 1rem; border: solid 1px rgba(0,0,0,.1); padding: 0.5rem; width: 100%;"
        let InputData = document.createElement("input")
        element.appendChild(InputData)
        InputData.setAttribute("id", Key)
        InputData.classList.add("NanoxText")
        InputData.classList.add("NanoxLoginInput")
        InputData.setAttribute("Style", inputStyle)
        InputData.setAttribute("type", Type)
        InputData.setAttribute("name", Key)
        InputData.autocomplete = "off"
        return element
    }

    ClickSendSignup(){
        if (this.InputUserAccountDataValide()){
            document.getElementById('AccountButton').innerText = "Waiting..."
            // Get Token
            axios({
                method: 'post',
                url: '/nanoxsignup',
                data: {
                    User: document.getElementById('Email').value,
                    FirstName: document.getElementById('First-Name').value,
                    LastName: document.getElementById('Last-Name').value,
                    Password: document.getElementById('Password').value
                }
            })
            .then((response) => {
                document.getElementById("AccountErrorMsg").innerHTML = "";
                document.getElementById('AccountButton').innerText = "Done"
                this._SignedUp(response.data.Token)
            })
            .catch((error) => {
                if (error.response) {
                    if (error.response.status == 500){
                        this.ShowErrorMessage(error.response.data)
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

    InputUserAccountDataValide(){
        document.getElementById("AccountErrorMsg").innerHTML =""
        let ErrorMessage = ""
        let IsValide = true
        if (document.getElementById('Email').value.length > 1){
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(! re.test(String(document.getElementById('Email').value).toLowerCase())){
                ErrorMessage += "Enter a valid Email<br>";
                IsValide = false;
            }
        } else {
            ErrorMessage += "Enter Email<br>";
            IsValide = false;
        }
        if (document.getElementById('First-Name').value.length < 3){
            ErrorMessage += "Enter a longer First Name<br>";
            IsValide = false;
        }
        if (document.getElementById('Last-Name').value.length < 3){
            ErrorMessage += "Enter a longer Last Name<br>";
            IsValide = false;
        }
        if (document.getElementById('Password').value.length < 7){
            ErrorMessage += "Enter a longer Password<br>";
            IsValide = false;
        }
        if(!IsValide){
            this.ShowErrorMessage(ErrorMessage)
        }
        return IsValide
    }

    ShowErrorMessage(Error){
        document.getElementById("AccountErrorMsg").innerHTML = Error;
        document.getElementById('AccountButton').innerText = "Create an Account"
    }
}