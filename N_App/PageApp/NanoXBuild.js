class NanoXBuild{
    constructor(){}

    /**
     * Creation d'un element HTML div
     * @param {String} Id id du div
     * @param {String} Class classe du div
     * @param {String} Style style du div
     * @returns HTMLElement div
     */
    static Div(Id = null, Class = null, Style= null){
        let element = document.createElement("div")
        if (Id){element.setAttribute("id", Id)}
        if (Class){element.setAttribute("Class", Class)}
        if (Style){element.setAttribute("Style", Style)}
        return element
    }

    /**
     * Creation d'un element HTML div flex column
     * @param {String} Id id du div
     * @param {String} Style style du div
     * @returns HTMLElement div flex column
     */
    static DivFlexColumn(Id = null, Class = null, Style= null){
        let element = document.createElement("div")
        if (Id){element.setAttribute("id", Id)}
        if (Class){element.setAttribute("Class", Class)}
        let StyleAdd = ""
        if (Style){StyleAdd = Style}
        element.setAttribute("style",`display: -webkit-flex; display: flex; flex-direction: column; justify-content:space-around; align-content:center; align-items: center; flex-wrap: wrap; ${StyleAdd}`)
        return element
    }

    /**
     * Creation d'un element HTML div flex row space-around
     * @param {String} Id id du div
     * @param {String} Style style du div
     * @returns HTMLElement div flex row space-around
     */
    static DivFlexRowSpaceAround(Id = null, Class = null, Style= null){
        let element = document.createElement("div")
        if (Id){element.setAttribute("id", Id)}
        if (Class){element.setAttribute("Class", Class)}
        let StyleAdd = ""
        if (Style){StyleAdd = Style}
        element.setAttribute("style",`display: -webkit-flex; display: flex; flex-direction: row; justify-content:space-around; align-content:center; align-items: center; flex-wrap: wrap; ${StyleAdd}`)
        return element
    }

    /**
     * Creation d'un element HTML div flex row space-between
     * @param {String} Id id du div
     * @param {String} Style style du div
     * @returns HTMLElement div flex row space-between
     */
    static DivFlexRowSpaceBetween(Id = null, Class = null, Style= null){
        let element = document.createElement("div")
        if (Id){element.setAttribute("id", Id)}
        if (Class){element.setAttribute("Class", Class)}
        let StyleAdd = ""
        if (Style){StyleAdd = Style}
        element.setAttribute("style",`display: -webkit-flex; display: flex; flex-direction: row; justify-content:space-between; align-content:center; align-items: center; flex-wrap: wrap; ${StyleAdd}`)
        return element
    }

    /**
     * Creation d'un element HTML div flex row space-evenly
     * @param {String} Id id du div
     * @param {String} Style style du div
     * @returns HTMLElement div flex row space-between
     */
    static DivFlexRowSpaceEvenly(Id = null, Class = null, Style= null){
        let element = document.createElement("div")
        if (Id){element.setAttribute("id", Id)}
        if (Class){element.setAttribute("Class", Class)}
        let StyleAdd = ""
        if (Style){StyleAdd = Style}
        element.setAttribute("style",`display: -webkit-flex; display: flex; flex-direction: row; justify-content:space-evenly; align-content:center; align-items: center; flex-wrap: wrap; ${StyleAdd}`)
        return element
    }

    /**
     * Creation d'un element HTML div flex row start
     * @param {String} Id id du div
     * @param {String} Style style du div
     * @returns HTMLElement div flex row start
     */
    static DivFlexRowStart(Id= null, Class = null, Style= null){
        let element = document.createElement("div")
        if (Id){element.setAttribute("id", Id)}
        if (Class){element.setAttribute("Class", Class)}
        let StyleAdd = ""
        if (Style){StyleAdd = Style}
        element.setAttribute("style",`display: -webkit-flex; display: flex; flex-direction: row; justify-content:start; align-content:center; align-items: center; flex-wrap: wrap; ${StyleAdd}`)
        return element
    }

    /**
     * Creation d'un element HTML div flex row end
     * @param {String} Id id du div
     * @param {String} Style style du div
     * @returns HTMLElement div flex row end
     */
    static DivFlexRowEnd(Id= null, Class = null, Style= null){
        let element = document.createElement("div")
        if (Id){element.setAttribute("id", Id)}
        if (Class){element.setAttribute("Class", Class)}
        let StyleAdd = ""
        if (Style){StyleAdd = Style}
        element.setAttribute("style",`display: -webkit-flex; display: flex; flex-direction: row; justify-content:end; align-content:center; align-items: center; flex-wrap: wrap; ${StyleAdd}`)
        return element
    }

    /**
     * Creation d'un element HTML div avec du texte
     * @param {String} Texte Texte
     * @param {String} Id id du div
     * @param {String} Class Class du div
     * @param {String} Style style du div
     * @returns HTMLElement div
     */
    static DivText(Texte= "", Id= null, Class= null, Style= null){
        let element = document.createElement("div")
        if (Id){element.setAttribute("id", Id)}
        if (Class){element.setAttribute("Class", Class)}
        if (Style){element.setAttribute("Style", Style)}
        element.innerText = Texte
        return element
    }

    /**
     * Creation d'un bouton html
     * @param {String} Titre Titre du bouton
     * @param {Function} OnClick Fonction executée par le bouton
     * @param {String} Id Id du bouton
     * @param {String} Class Class value
     * @param {String} Style Style value
     * @returns Html element button
     */
    static Button (Titre="No Titre", OnClick= null, Id=null, Class= null, Style= null){
        let element = document.createElement("button")
        if (Class){element.setAttribute("Class", Class)}
        if (Id){element.setAttribute("id", Id)}
        if (Style){element.setAttribute("Style", Style)}
        element.innerHTML = Titre
        element.onclick = OnClick
        return element
    }

    /**
     * Creation d'une ligne
     * @param {String} Width largeur de la ligne
     * @param {String} height epaisseur de la ligne
     * @param {String} color couleur de la ligne
     * @returns Html element Hr
     */
    static Line (Width = "100%", height= "1px", color= "var(--NanoX-appcolor)"){
        let element = document.createElement("hr")
        element.setAttribute("Style", `width: ${Width}; border: 0px solid transparent; border-top: ${height} solid ${color}; margin:0;`)
        return element
    }

    static PopupCreate(HTMLElement = null, ListOfButton = [{Titre: "Close", Action: NanoXBuild.PopupDelete, Id: null}]){
        let Div1 = document.createElement("div")
        Div1.setAttribute("id", "NonoXPopup")
        Div1.setAttribute("style", "display: block; position: fixed; top: 0px; left: 0px; background-color: rgb(230,230,230, 0.8); width: 100vw; height: 100vh; z-index: 1000;")
        let Div2 = document.createElement("div")
        Div2.setAttribute("id", "NonoXPopupScreen")
        Div2.setAttribute("style","top: 10vh; max-height: 60vh; display: block; position: fixed; max-width: 90%; width: 45rem; margin-left: auto; margin-right: auto; z-index: 1000; background-color: white; padding: 1rem; border-radius: 10px; border: 2px solid var(--NanoX-appcolor); overflow-y: auto; left:0; right:0")
        Div1.appendChild(Div2)
        if(HTMLElement != null){
            Div2.appendChild(HTMLElement)
        }

        let DivButton = document.createElement("div")
        DivButton.setAttribute("style","display: -webkit-flex; display: flex; flex-direction: row; justify-content:space-around; align-content:center; align-items: center; flex-wrap: wrap;")

        let WidthButton = "20"
        if (ListOfButton.length > 1){
            let calcwidth = 90 / ListOfButton.length
            WidthButton = calcwidth.toString()
        }
        ListOfButton.forEach(element => {
            let mybutton = NanoXBuild.Button(element.Titre, element.Action, element.Id, null, `margin: 1rem 1rem 0 1rem; padding: 0.4rem; cursor: pointer; border: 1px solid var(--NanoX-appcolor); border-radius: 1rem; text-align: center; display: inline-block; font-size: 1rem; box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.7); color: rgb(44,1,21); outline: none; background-color:white; width: ${WidthButton}%; max-width : 30%;`)
            DivButton.appendChild(mybutton)
        });

        Div2.appendChild(DivButton)

        document.body.appendChild(Div1)
    }

    static PopupDelete(){
        document.getElementById("NonoXPopup").parentNode.removeChild(document.getElementById("NonoXPopup"))
    }

    static Image64(Base64, Id, Class, Style){
        let element = document.createElement("img")
        element.setAttribute("src", Base64)
        if (Id){element.setAttribute("id", Id)}
        if (Class){element.setAttribute("Class", Class)}
        if (Style){element.setAttribute("Style", Style)}
        return element
    }

    static Input(Value, Type, Name, Placeholder, Id , Class, Style){
        let element = document.createElement("input")
        if (Id){element.setAttribute("id", Id)}
        if (Class){element.setAttribute("Class", Class)}
        if (Style){element.setAttribute("Style", Style)}
        if (Value){element.setAttribute("value", Value)}
        if (Type){element.setAttribute("type", Type)}
        if (Name){element.setAttribute("name", Name)}
        if (Placeholder){element.setAttribute("placeholder", Placeholder)}
        return element
    }

    static InputWithLabel(BoxClass=null, Label=null, LabelClass=null, Id="Input", InputValue="", InputClass="", InputType="text", InputPlaceholder="", OnBlur=null, StopAutoComplete = false){
        let element = document.createElement("div")
        if ((BoxClass!=null)&&(BoxClass!="")){element.setAttribute("Class", BoxClass)}
        if ((Label!=null)&&(Label!="")){
            if ((LabelClass!=null)&&(LabelClass!="")){
                element.appendChild(NanoXBuild.DivText(Label,"",LabelClass,"width: 100%;"))
            } else {
                element.appendChild(NanoXBuild.DivText(Label,"","","width: 100%;"))
            }
        }
        let inputStyle="box-sizing: border-box; outline: none; margin: 0; -webkit-box-shadow: inset 0 1px 3px 0 rgba(0,0,0,.08); -moz-box-shadow: inset 0 1px 3px 0 rgba(0,0,0,.08); box-shadow: inset 0 1px 3px 0 rgba(0,0,0,.08); -webkit-border-radius: 5px; -moz-border-radius: 5px; border-radius: 5px; color: #666;"
        let InputProgramName = NanoXBuild.Input(InputValue, InputType, Id, InputPlaceholder, Id, InputClass,inputStyle)
        InputProgramName.onfocus = function(){InputProgramName.placeholder = ""}
        if (OnBlur!=null){
            InputProgramName.onblur = OnBlur
        }
        if (StopAutoComplete){InputProgramName.setAttribute("autocomplete", "off")}
        element.appendChild(InputProgramName)
        return element
    }

    static Textarea(Placeholder, Id, Class, Style){
        let element = document.createElement("textarea")
        element.setAttribute("wrap", "off")
        if (Id){element.setAttribute("id", Id)}
        if (Placeholder){element.setAttribute("placeholder", Placeholder)}
        if (Class){element.setAttribute("Class", Class)}
        if (Style){element.setAttribute("Style", Style)}
        return element
    }

    static Video (Src,Id, Class,Style){
        let element = document.createElement("div")
        element.setAttribute("style","display: -webkit-flex; display: flex; flex-direction: column; justify-content:space-around; align-content:center; align-items: center; flex-wrap: wrap;")
        if (Style){element.setAttribute("Style", Style)}
        if (Class){element.setAttribute("Class", Class)}
        let video = document.createElement("video")
        if (Id){video.setAttribute("id", Id)}
        video.style.width = "100%"
        video.controls = true
        video.setAttribute("playsinline", "")
        var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)
        if (!isChrome){
            video.setAttribute("autoplay", "false")
        }
        video.onerror = ()=>{element.innerHTML = `Video Error: ErrorCode= ${video.error.code} details= ${video.error.message}`}
        video.src = Src
        element.appendChild(video)
        return element
    }

    static ProgressRing({Id=null, ProgressColor= "#51c5cf", FillColor = "black", TextColor = "#51c5cf", TextFontSize = "1rem", Progress = 0, Progressheight = 8, ProgressheightMobile = null, Radius = 80, RadiusMobile = null}={}){
        if(RadiusMobile == null){RadiusMobile = Radius}
        if(ProgressheightMobile == null){ProgressheightMobile = Progressheight}
        if(window.innerWidth < 700){
            // Mobile device
            Radius = RadiusMobile
            Progressheight = ProgressheightMobile
        }

        let element = document.createElement("progress-ring")
        if (Id){element.setAttribute("id", Id)}
        element.setAttribute("stroke", Progressheight)
        element.setAttribute("progressColor", ProgressColor)
        element.setAttribute("fillColor", FillColor)
        element.setAttribute("radius", Radius)
        element.setAttribute("progress", Progress)
        element.setAttribute("textcolor", TextColor)
        element.setAttribute("textfontsize", TextFontSize)

        //element.innerHTML = `<progress-ring ${IdText} stroke="${Progressheight}" progressColor="${ProgressColor}" fillColor="${FillColor}" radius="${Radius}" progress="${Progress}" textcolor="${TextColor}" textfontsize="${TextFontSize}"></progress-ring>`
        return element
    }

    static ToggleSwitch({Id = null, Checked = false, OnChange=null, HeightRem = 1}={}){
        let element = document.createElement("toggle-switch")
        if (Id){element.setAttribute("id", Id)}
        if(Checked){element.setAttribute("checked", "")}
        element.setAttribute("heightRem", HeightRem)
        if (OnChange){
            element.onchange = OnChange
        }
        return element
    }

    /**
     * Converti une date en un string Date Time yyyy-mm-dd h:m:s
     * @param {Date} DateString Date
     * @returns String Date et Time
     */
    static GetDateTimeString(DateString){
        var Now = new Date(DateString)
        var dd = Now.getDate()
        var mm = Now.getMonth()+1
        var yyyy = Now.getFullYear()
        var heure = Now.getHours()
        var minute = Now.getMinutes()
        var seconde = Now.getSeconds()
        if(dd<10) {dd='0'+dd} 
        if(mm<10) {mm='0'+mm}
        if(heure<10) {heure='0'+heure}
        if(minute<10) {minute='0'+minute}
        if(seconde<10) {seconde='0'+seconde}
        return yyyy + "-" + mm + "-" + dd + " " + heure + ":" + minute + ":" + seconde
    }

    /**
     * Converti une date en un string date yyyy-mm-dd
     * @param {Date} DateString Date
     * @returns String Date
     */
    static GetDateString(DateString){
        var Now = new Date(DateString)
        var dd = Now.getDate()
        var mm = Now.getMonth()+1
        var yyyy = Now.getFullYear()
        if(dd<10) {dd='0'+dd} 
        if(mm<10) {mm='0'+mm}
        return yyyy + "-" + mm + "-" + dd
    } 
}

/**Custome element build by CoreXBuild*/
class ProgressRing extends HTMLElement {
    constructor() {
        super();
        this._IsConnected = false
        // create shadow dom root
        this._root = this.attachShadow({mode: 'open'})
    }
    connectedCallback() {
        // get config from attributes
        const textcolor = this.getAttribute('textcolor');
        const textfontsize = this.getAttribute('textfontsize');
        const progressColor = this.getAttribute('progressColor');
        const fillColor = this.getAttribute('fillColor');
        const stroke = parseInt(this.getAttribute('stroke'), 10);
        const radius = parseInt(this.getAttribute('radius'), 10);
        this._circumference = radius * 2 * Math.PI;
        // create shadow dom root
        this._root.innerHTML = `
          <svg
            height="${(radius * 2) + (stroke)}"
            width="${(radius * 2) + (stroke)}"
           >
             <circle
               stroke="${progressColor}"
               stroke-dasharray="${this._circumference} ${this._circumference}"
               style="stroke-dashoffset:${this._circumference}"
               stroke-width="${stroke}"
               fill="${fillColor}"
               r="${radius}"
               cx="${radius + (stroke / 2)}"
               cy="${radius + (stroke / 2)}"
            />
            <text text-anchor="middle" dominant-baseline="middle" x="52%" y="50%" fill="${textcolor}" font-size="${textfontsize}">
                <tspan id="number">0</tspan><tspan dy="-0.25em" font-size="0.6em">%</tspan>
            </text>
          </svg>
      
          <style>
            circle {
              transition: stroke-dashoffset 0.35s;
              transform: rotate(-90deg);
              transform-origin: 50% 50%;
            }
          </style>
        `;
        this._IsConnected = true
        this.setProgress(parseInt(this.getAttribute('progress'), 10))
    }
    setProgress(percent) {
        if(this._IsConnected){
            const offset = this._circumference - (percent / 100 * this._circumference);
            const circle = this._root.querySelector('circle');
            circle.style.strokeDashoffset = offset; 
            const Txt = this._root.getElementById('number');
            Txt.innerHTML = percent
        }
    }
    static get observedAttributes() {
        return [ 'progress' ];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'progress') {
          this.setProgress(newValue);
        }
    }
}
window.customElements.define('progress-ring', ProgressRing);

class ToggleSwitch extends HTMLElement{
    constructor() {
        super();
        this._IsConnected = false
        // create shadow dom root
        this._root = this.attachShadow({mode: 'open'})
    }

    get checked() {
        return this._root.getElementById("CustomInput").checked
    }

    connectedCallback() {
        const checked = this.getAttribute('checked')
        let HeightLable = this.getAttribute('heightRem')
        let Border = 0.1
        let HeigtSlider = HeightLable - (2 * Border)
        let WidthLable = (1.5 * HeightLable)  + Border
        let translate = (HeightLable / 2)  + Border
        let CheckedData = ""
        if(checked == "") {CheckedData = "checked"}
        this._root.innerHTML = `
        <style>
            .slider {
                position: absolute;
                cursor: pointer;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: #ccc;
                -webkit-transition: .4s;
                transition: .4s;
                border-radius: `+HeightLable+`rem;
            }
            .slider:before {
                position: absolute;
                content: "";
                height: `+HeigtSlider+`rem;
                width: `+HeigtSlider+`rem;
                left: `+Border+`rem;
                bottom: `+Border+`rem;
                background-color: white;
                -webkit-transition: .4s;
                transition: .4s;
                border-radius: 50%;
            }
            input:checked + .slider {
                background-color: #2196F3;
            }
            input:checked + .slider:before {
                -webkit-transform: translateX(`+translate+`rem);
                -ms-transform: translateX(`+translate+`rem);
                transform: translateX(`+translate+`rem);
            }
        </style>
        <label style="position: relative; display: inline-block; width: `+WidthLable+`rem; height: `+HeightLable+`rem;">
            <input id= "CustomInput" type="checkbox" `+CheckedData+` style="opacity: 0; width: 0; height: 0;">
            <span class="slider"></span>
        </label>
        `;
        this._root.getElementById("CustomInput").addEventListener('change', (event) => {
            if (event.target.checked) {
                this.setAttribute('checked', '')
            } else {
                this.removeAttribute('checked')
            }
            this.dispatchEvent(new CustomEvent('change', {
                target:{
                    checked: event.target.checked,
                },
                bubbles: true,
            }));
        })
        this._IsConnected = true
    }
}
window.customElements.define('toggle-switch', ToggleSwitch);