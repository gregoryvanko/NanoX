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

    ClickSignUp(){
        // ToDo
        this._SignedUp()
    }
}