class NanoXUserData{
    constructor(){}

    GetUserData(){
        this.BuildViewWaitingUserInfo()
        axios({
            method: 'get',
            url: '/nanoxuser',
            headers: {
                'x-auth-token': `${NanoXGetToken()}`,
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            NanoXBuild.PopupDelete()
            this.BuildViewUserInfo(response.data)
        })
        .catch((error) => {
            let DivError = document.getElementById("DivWaitingUserInfo")
            DivError.style.color = "red"
            if (error.response) {
                if ((error.response.status == 500) || (error.response.status == 401)){
                    DivError.innerText = error.response.data.ErrorMsg
                } else {
                    DivError.innerText = error.response.data
                }
            } else if (error.request) {
                DivError.innerText = error.request
            } else {
                DivError.innerText = error.message
            }
        })
    }

    BuildViewWaitingUserInfo(){
        // Div waiting
        let divwaiting = NanoXBuild.DivText("Waiting user data...", "DivWaitingUserInfo", null, "text-align: center;")
        NanoXBuild.PopupCreate(divwaiting)
    }

    BuildViewUserInfo(Data){
        let divcontent = NanoXBuild.Div(null, null, "width:100%;")
        // User
        divcontent.appendChild(NanoXBuild.InputWithLabel("NanoXInputBox", "User", "NanoXInputLabelText", "InputUser", Data.User, "NanoXInput", "text", "", null, true))
        // FirstName
        divcontent.appendChild(NanoXBuild.InputWithLabel("NanoXInputBox", "First Name", "NanoXInputLabelText", "InputFirst-Name", Data.FirstName, "NanoXInput", "text", "", null, true))
        // LastName
        divcontent.appendChild(NanoXBuild.InputWithLabel("NanoXInputBox", "Last Name", "NanoXInputLabelText", "InputLast-Name", Data.LastName, "NanoXInput", "text", "", null, true))
        // Password
        divcontent.appendChild(NanoXBuild.InputWithLabel("NanoXInputBox", "Password", "NanoXInputLabelText", "InputPassword", "", "NanoXInput", "password", "", null, true))
        // Error
        divcontent.appendChild(NanoXBuild.DivText("", "UserInfoErrorMsg", null, " color: red; text-align: center; margin-top: 1rem;"))
        // Empty Space
        divcontent.appendChild(NanoXBuild.Div(null, null, "height:1rem;"))

        NanoXBuild.PopupCreate(divcontent, [{Titre: "Save", Action: this.SaveUserInfo.bind(this), Id: "SaveUser"}, {Titre: "Cancel", Action: NanoXBuild.PopupDelete, Id: "CancelUser"}])
    }
    
    SaveUserInfo(){
        if (this.IsInputUserinfoValide()){
            document.getElementById('SaveUser').innerText = "Waiting..."
            document.getElementById('SaveUser').disabled = true
            document.getElementById('CancelUser').style.display = "none"

            let Pass = document.getElementById('InputPassword').value
            let SendData = null
            if (Pass == ""){
                SendData = {
                    User: document.getElementById('InputUser').value,
                    FirstName: document.getElementById('InputFirst-Name').value,
                    LastName: document.getElementById('InputLast-Name').value,
                }
            } else {
                SendData = {
                    User: document.getElementById('InputUser').value,
                    FirstName: document.getElementById('InputFirst-Name').value,
                    LastName: document.getElementById('InputLast-Name').value,
                    Password: document.getElementById('InputPassword').value
                }
            }
            // Get Token
            axios({
                method: 'patch',
                url: '/nanoxuser',
                headers: {
                    'x-auth-token': `${NanoXGetToken()}`,
                    'Content-Type': 'application/json'
                },
                data: SendData
            })
            .then((response) => {
                NanoXBuild.PopupDelete()
            })
            .catch((error) => {
                if (error.response) {
                    if ((error.response.status == 500) || (error.response.status == 401)){
                        document.getElementById("UserInfoErrorMsg").innerText = error.response.data.ErrorMsg
                    } else {
                        document.getElementById("UserInfoErrorMsg").innerText = error.response.data
                    }
                } else if (error.request) {
                    document.getElementById("UserInfoErrorMsg").innerText = error.request
                } else {
                    document.getElementById("UserInfoErrorMsg").innerText = error.message
                }
            })
        }
    }

    IsInputUserinfoValide(){
        document.getElementById("UserInfoErrorMsg").innerHTML =""
        let ErrorMessage = ""
        let IsValide = true
        if (document.getElementById('InputUser').value.length > 1){
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(! re.test(String(document.getElementById('InputUser').value).toLowerCase())){
                ErrorMessage += "Enter a valid User<br>";
                IsValide = false;
            }
        } else {
            ErrorMessage += "Enter User<br>";
            IsValide = false;
        }
        if (document.getElementById('InputFirst-Name').value.length < 3){
            ErrorMessage += "Enter a longer First Name<br>";
            IsValide = false;
        }
        if (document.getElementById('InputLast-Name').value.length < 3){
            ErrorMessage += "Enter a longer Last Name<br>";
            IsValide = false;
        }
        if (document.getElementById('InputPassword').value.length != ""){
            if (document.getElementById('InputPassword').value.length < 7){
                ErrorMessage += "Enter a longer Password<br>";
                IsValide = false;
            }
        }
        if(!IsValide){
            document.getElementById("UserInfoErrorMsg").innerHTML = ErrorMessage
        }
        return IsValide
    }
}