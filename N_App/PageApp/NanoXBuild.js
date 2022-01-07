class NonoXBuild{
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
    static DivFlexColumn(Id = null, Style= null){
        let element = document.createElement("div")
        if (Id){element.setAttribute("id", Id)}
        element.setAttribute("style","display: -webkit-flex; display: flex; flex-direction: column; justify-content:space-around; align-content:center; align-items: center; flex-wrap: wrap;")
        if (Style){element.setAttribute("Style", Style)}
        return element
    }

    /**
     * Creation d'un element HTML div flex row space-around
     * @param {String} Id id du div
     * @param {String} Style style du div
     * @returns HTMLElement div flex row space-around
     */
    static DivFlexRowSpaceAround(Id = null, Style= null){
        let element = document.createElement("div")
        if (Id){element.setAttribute("id", Id)}
        element.setAttribute("style","display: -webkit-flex; display: flex; flex-direction: row; justify-content:space-around; align-content:center; align-items: center; flex-wrap: wrap;")
        if (Style){element.setAttribute("Style", Style)}
        return element
    }

    /**
     * Creation d'un element HTML div flex row space-between
     * @param {String} Id id du div
     * @param {String} Style style du div
     * @returns HTMLElement div flex row space-between
     */
    static DivFlexRowSpaceBetween(Id = null, Style= null){
        let element = document.createElement("div")
        if (Id){element.setAttribute("id", Id)}
        element.setAttribute("style","display: -webkit-flex; display: flex; flex-direction: row; justify-content:space-between; align-content:center; align-items: center; flex-wrap: wrap;")
        if (Style){element.setAttribute("Style", Style)}
        return element
    }

    /**
     * Creation d'un element HTML div flex row start
     * @param {String} Id id du div
     * @param {String} Style style du div
     * @returns HTMLElement div flex row start
     */
    static DivFlexRowStart(Id= null, Style= null){
        let element = document.createElement("div")
        if (Id){element.setAttribute("id", Id)}
        element.setAttribute("style","width: 100%; display: -webkit-flex; display: flex; flex-direction: row; justify-content:start; align-content:center; align-items: center; flex-wrap: wrap;")
        if (Style){element.setAttribute("Style", Style)}
        return element
    }

    /**
     * Creation d'un element HTML div flex row end
     * @param {String} Id id du div
     * @param {String} Style style du div
     * @returns HTMLElement div flex row end
     */
    static DivFlexRowEnd(Id= null, Style= null){
        let element = document.createElement("div")
        if (Id){element.setAttribute("id", Id)}
        element.setAttribute("style","width: 100%; display: -webkit-flex; display: flex; flex-direction: row; justify-content:end; align-content:center; align-items: center; flex-wrap: wrap;")
        if (Style){element.setAttribute("Style", Style)}
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
    static DivTexte(Texte= "", Id= null, Class= null, Style= null){
        let element = document.createElement("div")
        if (Id){element.setAttribute("id", Id)}
        if (Class){element.setAttribute("Class", Class)}
        if (Style){element.setAttribute("Style", Style)}
        element.innerText = Texte
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