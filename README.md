# NanoX
NanoX est un framework basé sur NodeJs, Express et MongoDb (via Mongoose) permettant de :
- Créer un server d’API REST
- Permettant d'héberger des pages statiques
- Permettant de construire des page ne contenant que du JS et du CSS, et les rendre accessible via une Route de type get
- Sécuriser les transactions REST via la création de token suite à la validation d’un User et d’un Password
- Créer une application frontend modulaire utilisant le server d’API REST
## Usage
First, install the package using npm:
```bash
npm install @gregvanko/nanox --save
```
## Le fichier "Index.js"
```js
async function Start(Port = 1234, Name = « NanoXDev »,  Debug = false, SplashScreenFilePath = null){
    // NonoX Option
    const OptionNanoX = {
        AppName: Name,
        AppColor: "rgb(20, 163, 255)",
        AppPort: Port,
        AppSecret: "TestNonoXSecret",
        MongoUrl: "mongodb://localhost:27017",
        Debug: Debug,
        IconPath:  __dirname + "/Backend/Test-apple-icon-192x192.png",
        ApiServer: true,
        AllowVideo: true,
        AllowSignUp: true,
        AppPath: "",
        NanoXAppOption : {
            SplashScreen : `<div style="font-size: 4vh;">Splash Screen</div><div id="ProgressText" style="font-size: 3vh;">0%</div>`,
            SplashScreenBackgroundColor : "red",
            ShowMenuBar: true,
            MenuBarIstransparent: false,
            ShowNameInMenuBar: true,
            CssClassForName: "TestClassName",
            ColorMenuBar: "black",
            ColorIconMenuBar: "white",
            HeightMenuBar: "3rem",
            AppFolderClient: __dirname + "/Frontend/App",
            AppFolderAdmin: __dirname + "/Frontend/Admin",
            UseAppModule: true
        }
    }

    // Initiation de NanoX
    require(‘@gregvanko/nanox’).NanoXInitiation(OptionNanoX)

     // Code a jouter pour créer les routes de l’application

    // Start NanoX
    await require(‘@gregvanko/nanox').NanoXStart()
}
module.exports.Start = Start
```
## Le fichier "Start.js"
```js
const Option = {
    Port:5000,
    Name:"NanoXDev",
    Debug: true,
    SplashScreenFilePath: __dirname + "/SplashScreen.html"
}
require('./index').Start(Option)
```
## Paramètres d'initiation
|Paramètre      |Descritpion        |
|:--------------|:------------------|
|AppName	|Le nom de l’application basée sur NanoX|
|AppColor	|La couleur générale de l’application|
|AppPort	|Le port du serveur|
|AppSecret	|La phrase utilisée dans l’encodage du token|
|MongoUrl	|L’url vers le serveur Mongo|
|Debug	|Flag permettant d’activer le mode debug|
|IconPath	|Le chemin vers le fichier png représentant l’icône du projet|
|ApiServer	|Flag permettant de démarrer un serveur API|
|AllowVideo	|Flag permettant d’activer l’API video|
|AllowSignUp	|Flag permettant d’activer l’API de création d’un utilisateur|
|AppPath	|Le chemin de l’API qui permet de télécharger l’application NanoX|
|NanoXAppOption	|Le option du frontend NanoX|

Les paramatres de NanoXAppOption:
|Paramètre      |Descritpion        |
|:--------------|:------------------|
|SplashScreen	|Le contenu au format HTML du splash screen du frontend NanoX|
|SplashScreenBackgroundColor	|La couleur du background du splash screen|
|ShowMenuBar	|Flag permettant d’afficher la MenuBar|
|MenuBarIstransparent	|Flag permettant de rendre la MenuBar Transparente et de laisser aller l’application frontend commencer en dessous de la MenuBar|
|ShowNameInMenuBar	|Flag permettant d'afficher le nom de l’application dans le MenuBar|
|CssClassForName	|Nom de la classe CSS a appliquer au nom de l’application dans la MenuBar|
|ColorMenuBar	|Couleur de la MenuBar. Si cette couleur est transparente, la MenuBar sera transparente mais ne laissera pas l’application frontend commencer en dessous de la MenuBar|
|ColorIconMenuBar	|La couleur de l’icône de la MenuBar (User et Icône par défaut)|
|HeightMenuBar	|La hauteur de la MenuBar|
|AppFolderClient	|Le chemin vers le répertoire (et sous répertoire) contenant des fichiers CSS et JS utilisés pour construire le frontend de l’application|
|AppFolderAdmin	|Le chemin vers le répertoire (et sous répertoires) contenant des fichiers CSS et JS utilisés pour construire le frontend Admin de l’application et ajouter aux fichier se trouvant dans AppFolderClient|
|UseAppModule	|Flag permettant d’utiliser le frontend sous forme de module|

Lors de l'intiatiion
- Si un chemin vers une application NanoX est défini (via le paramètre AppPath), un server API est automatiquement activé, et une page initpage.html contenant le code pour loader l’application est créer puis ajoutée sur la route définie par AppPath.
- Si un serveur API est démarré, les routes suivantes seront automatiquement ajoutées:
    - La route « /nanoxauth » qui permet de recevoir un token d’identification en communiquant un « User » et un « Password »
    - La route « /nanoxuser » qui permet de recevoir ou de modifier les informations sur le user accédant à cette route via son token
    - Si on a autorisé un « AllowSignUp », la route « /nanoxSignUp » permet de créer un nouveau user (les paramètres suivants sont obligatoire : User, FirstName, LastName et Password)

## Server side

### Mongoose
Pour utiliser un data base MongoDb, il faut commencer, dans un exemple de gestion d’utilisateur, par créer un nouveau fichier Model_Users.js pour y définir un schéma et un model Mongoose comme ci-dessous.
```js
let Mongoose = require("@gregvanko/nanox").Mongoose

let UsersSchema = new Mongoose.Schema({
    Nom: String,
    Prenom: String
}, { collection:"User"});

module.exports = Mongoose.model("User", UsersSchema)
```
Ajouter le code suivant pour créer un nouveau User:
```js
const Model_Users = require("./Model_Users")
const NewUser = new Model_Users({Nom: "VanKo", Prenom: "Gregory"})
NewUser.save().catch(err => console.log(err))
```

### Log
Pour utiliser le système de log de NanoX, il faut importer les fonction suivantes:
```js
let LogInfo = require("@gregvanko/nanox").NanoXLogInfo
let LogError = require("@gregvanko/nanox").NanoXLogError

this._UserServer = {User: "Server", _id: "ServerId"}

LogInfo("Premier test from app de test", this._UserServer)
LogError("Premier erreur", this._UserServer)
```

### Ajouter une route via un Router Express
```js
let NanoXAddRoute = require("@gregvanko/nanox").NanoXAddRoute
NanoXAddRoute("/test", require("./Backend/Route_Test"))
```
le fichier "Route_Test.js":
```js
const router = require("@gregvanko/nanox").Express.Router()
router.get("/", (req, res) => {
    res.send({Valide: true, Message:"route de test"})
})
module.exports = router
```

### Ajouter une route sécurisée par token via un Router Express
```js
let NanoXAddRoute = require("@gregvanko/nanox").NanoXAddRoute
NanoXAddRoute("/test", require("./Backend/Route_Test"))
```
le fichier "Route_Test.js":
```js
const AuthBasic = require("@gregvanko/nanox").NanoXAuthBasic
const AuthAdmin = require("@gregvanko/nanox").NanoXAuthAdmin
const router = require("@gregvanko/nanox").Express.Router()
router.get("/", AuthBasic, (req, res) => {
    res.send({Valide: true, Message:"route de test"})
})
router.get("/admin", AuthAdmin, (req, res) => {
    res.send({Valide: true, Message:"route de test"})
})
module.exports = router
```

### Construire un page et l’ajouter au serveur web via une route de type get
```js
let NanoXAddPageToBuild = require("@gregvanko/nanox").NanoXAddPageToBuild

NanoXAddPageToBuild("Test.html", "chemin/test.html", "TitrePage", GetCss(), GetJs(), GetBody())

function GetCss(){
    return "html{max-width: 100%;}"
}
function GetJs(){
    return "alert('coucou')"
}
function GetBody(){
    return "<div>coucou</div>"
}
```

### SplashScreen
Lorsque l’application Frontend est occupée à se télécharger il est possible de récupérer la progression (son pourcentage de téléchargement) sur un splachScreen soit via:
- Une valeur communiquée à l’option « Value » d’un d’élément HTML devant avoir l’ID « ProgressBar » (document.getElementById("ProgressBar").value = percentage)
- Une valeur communiquée à l’option « innerText » d’un d’élément HTML devant avoir l’ID « ProgressText » (document.getElementById("ProgressText").innerText = percentage + « % »)

## Frontend

### Ajout d'un nouveau module
Un nouveau module est ajouter comme ceci:
```js
let MyTestApp = new TestApp()
NanoXAddModule("Titre du module", "svgcontentimage", MyTestApp.Start.bind(MyTestApp), false)
```

### Les fonction globale du Frontend
```js
NanoXGetDivApp()
//Cette fonction retourne l’élément HTML Div qui doit être utilisé pour l’application Frontend. Ce Div est un élément Flex Column avec un width de 100%

NanoXGetColorIconMenuBar()
//Cette fonction retourne la couleur des icônes de la bar de menu

NanoXShowMenuBar(Show= true, OnTop= true, Istranslucide= false)
//Cette fonction permet d’afficher ou de cacher la barre de menu.

NanoXSetMenuBarOnTop(OnTop = true)
//Cette fonction permet de mettre la bar de menu au de dessus de l’application et fixe. L’application passe en dessous en scrollant vers le haut, la menu bar est toujours visible.

NanoXSetMenuBarTranslucide(Translucide = true)
//Cette fonction permet de rendre la bar de menu translucide.

NanoXShowNameInMenuBar(Show = true)
//Cette fonction permet d’afficher le nom de l’application à gauche dans la barre de menu

NanoXAddMenuButtonLeft(Id = null, Titre= null, Svg= null, Action= null)
//Cette fonction permet d’ajouter un bouton à gauche dans la barre de menu. Les paramètres sont l’Id du bouton, le titre du bouton (qui sera utilisé dans le vue mobile), le Svg de l’image du bouton, et l’action a effectuer lorsque l’on fait un événement click sur le bouton.

NanoXClearMenuButtonLeft()
//Cette fonction permet de supprimer tous les bouton se trouvant à gauche dans la barre de menu.

NanoXAddMenuButtonRight(Id= null, Titre= null, Svg= null, Action= null)
//Cette fonction permet d’ajouter un bouton à droite dans la barre de menu. Les paramètres sont l’Id du bouton, le titre du bouton (qui sera utilisé dans le vue mobile), le Svg de l’image du bouton, et l’action a effectuer lorsque l’on fait un événement click sur le bouton.

NanoXClearMenuButtonRight()
//Cette fonction permet de supprimer tous les bouton se trouvant à droite dans la barre de menu.

NanoXAddModule(Titre= null, Svg= null, Start= null, StartWithThisModule= false)
//Cette fonction permet d’ajouter un module dans l’application. Les paramètres de cette fonction sont le titre du module, le Svg de l’image de ce module, la fonction start du module, si ce module doit s’afficher au démarrage de l’application. Si ce n’est pas le cas, l’application démarrera sur la vue Home qui reprend toutes les carte identifiant les modules.

NanoXStartHomeModule()
//Cette fonction permet de revenir vers la page Home de l’application.

NanoXLogout()
//Cette fonction fait un LogOut de l’application et efface les variable du browser

NanoXGetToken()
//Cette fonction renvoie les token du user

NanoXApiGet(Url = « / », Params = {}, OnDownloadProgress = null)
//Cette fonction retourne une Promise. Elle fait un appel à la fonction Axios Get. Il est possible de suivre la progression du Download via une fonction distinctes.

NanoXApiDelete(Url = "/")
//Cette fonction retourne une Promise. Elle fait un appel à la fonction Axios Delete

NanoXApiPatch(Url = "/", SendData = {})
//Cette fonction retourne une Promise. Elle fait un appel à la fonction Axios Patch

NanoXApiPost(Url = "/", SendData = {}, OnDownloadProgress = null, OnUploadProgress = null)
//Cette fonction retourne une Promise. Elle fait un appel à la fonction Axios Post. Il est possible de suivre la progression du Download et de Upload via des fonctions distinctes.

NanoXApiPostLog(Log= "")
//Cette fonction permet d’enregistrer un message texte de log sur le serveur
```

## Video
La lecture d'un video MP4 se fait via un alias dans la configuration Nginx. Les fichiers video doivent se trouver sous /var/www pour que nginx puisse y avoir accès.
```bash
location /video/ {
    alias /var/www/Video/Memorx/;
}
```
Pour securiser la lecture video avec le token du user, il faut addapter la configuration de Nginx comme suite:
```bash
location /video/ {
    auth_request /auth;
    alias /var/www/Video/Memorx/;
}

location = /auth {
    internal;
    proxy_pass              http://localhost:5000$request_uri;
    proxy_pass_request_body off;
    proxy_set_header        Content-Length "";
}
```
Lorsque les video sont sécurisée, pour lire une video "testsmall.mov" il faut ajouter dans l'application FrontEnd le lien suivant:
```bash
"/video/testsmall.mov?token=" + NanoXGetToken()
```
Attention, il faut mettre le parametre AllowVideo à true dans les options de Nanox