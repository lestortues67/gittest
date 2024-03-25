// Source : 
// Date : 4/06/2019
// Auteur : Christian Doriath
// Dossier : /Python34/MesDEv/Flask/ajax_BASE
// Fichier : testLib_Ajax01.js
// Description : Tester une requête AJAX/POST en utilisant la lib 'lib_ajax'

// Mot cles : 

var listTest = [{"id":0,"name":"maurice","username":"emile"},
{"id":1,"name":"MoivieStar","username":"coralie"},
{"id":2,"name":"k2000","username":"elandra"}]

// Livre "javascript: the definitive guide" page 500
// Example 18-3. Parsing the HTTP response
// Issue an HTTP GET request for the contents of the specified URL.
// When the response arrives, pass it to the callback function as a
// parsed XML Document object, a JSON-parsed object, or a string.
function get(url, callback) {
    var request = new XMLHttpRequest(); // Create new request
    request.open("GET", url); // Specify URL to fetch
    request.onreadystatechange = function() { // Define event listener
        // If the request is compete and was successful
        if (request.readyState === 4 && request.status === 200) {
            // Get the type of the response
            var type = request.getResponseHeader("Content-Type");
            // Check type so we don't get HTML documents in the future
            if (type.indexOf("xml") !== -1 && request.responseXML)
                callback(request.responseXML); // Document response
            else if (type === "application/json")
                callback(JSON.parse(request.responseText)); // JSON response
        else
            callback(request.responseText); // String response
        }
    };//request.onreadystatechange
    request.send(null); // Send the request now
}//function get(url, callback)

function f_callback(p_RXedData){
    var stophere = 100;
    if (typeof(p_RXedData)=="object"){
        for (var key in p_RXedData) {
            console.log(key+" = "+p_RXedData[key])
        }
    }
    if (typeof(p_RXedData)=="string"){
        console.log("data = "+p_RXedData);
    }
}

//get("/testLib_Ajax01Response", f_callback)







function myAjaxAllJsonWithFormData(p_formId="",p_timeOut=2000,p_headerDataDict={},p_route,p_method) {
    // Les datas sont toutes converties en json pour avant de les TX et
    // depuis json pour RX'd data du serveur en retour de la requête.
    // Ici on utilise 'formData' pour lire directement à partir de ce fichier JS dans le fichier HTML
    // qui contient les éléments input type='text' placés dans un élément 'form'. 
    this.maxTimeOut=p_timeOut;//Durée max de la requête = 2 secondes
    this.route=p_route;//Vers quelle route envoyer ? 
    this.method=p_method;//Méthode POST, GET,... ?
    this.headerDataDict=p_headerDataDict;//p_headerDataDict ets un Dict, Data à placer dans le header
    this.formId=p_formId;// Data à lire dans un FORM (avec FormData ?)

    this.RXData = "";//this.RXData contient les datas renvoyées du serveur

    this.envoyer=function(){// Testé 
        // Envoyer la requête au serveur
        var request = new XMLHttpRequest();
        //Que faire si la durée de la requête est trop longue ? 
        request.ontimeout = function() {
            request.abort();
            alert('Durée requête > 2 secondes !!');
        }
        // Lorsque la propriete 'readyState' change on execute du code situe dans la fonction suivante : 
        request.onreadystatechange = function() {
            if (request.readyState === 1){
                var TEXTresults1 = request.responseText;
                console.log("request.readyState === 1 "); 
                console.log(" "); 
            }
            if (request.readyState === 2){
                var TEXTresults2 = request.responseText;
                console.log("request.readyState === 2 "+TEXTresults2); 
                console.log(" "); 
            }
            if (request.readyState === 3){
                console.log("request.readyState === 3 "+request.responseText); 
            }
            if (request.readyState === 4){
                console.log("request.readyState === 4, résultat de la requête "+ request.status); 
                //La data en retour du serveur est au format json 
                //JSON.parse() sert à convertir la reponse du serveur qui est au format JSON 
                //en une liste (array) constituee d'objets (dictionnaires).
                this.RXData = JSON.parse(request.responseText);
                // 'this.RXData' est maintenant une liste d'objets
            }
        };//request.onreadystatechange
        var formElement = document.getElementById(this.formId);
        formDataHolder = new FormData(formElement);
        //Ajouter une paire clé/valeur aux datas à TX.
        formDataHolder.append("modele", "YZ 250");

        request.open(this.method, this.route, true);
        // Paramétrer une durée max pour la requête
        request.timeout=this.maxTimeOut;
        // Ajouter des datas dans le header à partir du dict passé en p_: 
        if (p_headerDataDict){
            for(var key in p_headerDataDict){
                var data = p_headerDataDict[tt];
                request.setRequestHeader(key,data);
            };
        }
        //request.setRequestHeader("macAddress", "0x6cf049756738");

        //Convert data in the form's fields in the html file accessed with 'formData' to json : 
        //Source : https://stackoverflow.com/questions/41431322/how-to-convert-formdatahtml5-object-to-json
        var object = {};
        formDataHolder.forEach(function(value, key){
            object[key] = value;
            });
        var json = JSON.stringify(object);
        request.setRequestHeader('Content-Type', "application/json");
        request.send(json);
    }//this.envoyer=function()
}//function myAjaxAllJsonWithFormData

function myAjaxAllJson(p_TXDataDict={},p_timeOut=2000,p_headerDataDict={},p_route,p_method,f_callback) {
    // Les datas sont toutes converties en json pour avant de les TX et
    // depuis json pour RX'd data du serveur en retour de la requête.

    // p_TXDataDict : Ici on passe en p_ un dict qui contient les datas à TX.
    // p_headerDataDict est un Dict, Data à placer dans le header
    // p_route : Vers quelle route envoyer ? 
    // p_method : Méthode POST, GET,... ?
    // p_route;//Vers quelle route envoyer ? 
    // f_callback : fonction qui reçoit les datas receptionnées en retour du serveur
    
    // Envoyer la requête au serveur
    var request = new XMLHttpRequest();

    //Que faire si la durée de la requête est trop longue ? 
    request.ontimeout = function() {
        request.abort();
        alert('Durée requête > 2 secondes !!');
    }
    // Lorsque la propriete 'readyState' change on execute du code situe dans la fonction suivante : 
    request.onreadystatechange = function() {
        if (request.readyState === 4 && request.status === 200) {
            // Get the type of the response
            var type = request.getResponseHeader("Content-Type");
            // Check type so we don't get HTML documents in the future
            if (type.indexOf("xml") !== -1 && request.responseXML)
                f_callback(request.responseXML); // Document response
            else if (type === "application/json")
                f_callback(JSON.parse(request.responseText)); // JSON response
        else
            f_callback(request.responseText); // String response
        }
    };

    //p_route = "/testLib_Ajax01Response"
    request.open(p_method, p_route , true);
    // Paramétrer une durée max pour la requête
    request.timeout=p_timeOut;//Durée max de la requête = 2 secondes

    // Ajouter des datas dans le header à partir du dict passé en p_: 
    if (p_headerDataDict){
        for(var key in p_headerDataDict){
            var data = p_headerDataDict[key];
            request.setRequestHeader(key,data);
        };
    }
    
    //request.setRequestHeader("secretAccessCode", "21092019");
    //request.setRequestHeader("macAddress", "0x6cf049756738");

    var json = JSON.stringify(this.TXDataDict);
    request.setRequestHeader('Content-Type', "application/json");
    request.send(json);
    
}//function myAjaxAllJson

function myAjaxAllJsonOLD(p_TXDataDict={},p_timeOut=2000,p_headerDataDict={},p_route,p_method) {
    // Les datas sont toutes converties en json pour avant de les TX et
    // depuis json pour RX'd data du serveur en retour de la requête.

    // Ici on passe en p_ un dict (p_TXDataDict) qui contient les datas à TX.
    this.TXDataDict = p_TXDataDict
    this.maxTimeOut=p_timeOut;//Durée max de la requête = 2 secondes
    this.route=p_route;//Vers quelle route envoyer ? 
    this.method=p_method;//Méthode POST, GET,... ?
    this.headerDataDict=p_headerDataDict;//p_headerDataDict ets un Dict, Data à placer dans le header
    this.RXData = "";//this.RXData contient les datas renvoyées du serveur
    

  this.envoyer=function(){// Testé OK le 11/09/2019 14h24
    // Envoyer la requête au serveur
    var request = new XMLHttpRequest();

    //Que faire si la durée de la requête est trop longue ? 
    request.ontimeout = function() {
        request.abort();
        alert('Durée requête > 2 secondes !!');
    }
    // Lorsque la propriete 'readyState' change on execute du code situe dans la fonction suivante : 
    request.onreadystatechange = function() {
        if (request.readyState === 1){
            var TEXTresults1 = request.responseText;
            console.log("request.readyState === 1 "); 
            console.log(" "); 
        }
        if (request.readyState === 2){
            var TEXTresults2 = request.responseText;
            console.log("request.readyState === 2 "+TEXTresults2); 
            console.log(" "); 
        }
        if (request.readyState === 3){
            console.log("request.readyState === 3 "+request.responseText); 
            //La data en retour du serveur est au format json 
            //JSON.parse() sert à convertir la reponse du serveur qui est au format JSON 
            //en une liste (array) constituee d'objets (dictionnaires).
            // this.RXData = JSON.parse(request.responseText);
            // return (JSON.parse(request.responseText));
            titi = request.responseText;
            // dorade = "dorade";
            var stophere = 100;

            // 'this.RXData' est maintenant une liste d'objets
        }
        if (request.readyState === 4){
                console.log("request.readyState === 4, résultat de la requête "+ request.status); 
                //La data en retour du serveur est au format json 
                //JSON.parse() sert à convertir la reponse du serveur qui est au format JSON 
                //en une liste (array) constituee d'objets (dictionnaires).
                this.RXData = JSON.parse(request.responseText);
                // 'this.RXData' est maintenant une liste d'objets
            }
    };

    
    request.open("POST", "/testLib_Ajax01Response", true);
    // Paramétrer une durée max pour la requête
    request.timeout=this.maxTimeOut;

    // Ajouter des datas dans le header à partir du dict passé en p_: 
    if (p_headerDataDict){
        for(var key in p_headerDataDict){
            var data = p_headerDataDict[key];
            request.setRequestHeader(key,data);
        };
    }
    
    //request.setRequestHeader("secretAccessCode", "21092019");
    //request.setRequestHeader("macAddress", "0x6cf049756738");

    var json = JSON.stringify(this.TXDataDict);
    request.setRequestHeader('Content-Type', "application/json");
    request.send(json);
    }//this.envoyer=function
}//function myAjaxAllJson




//Les p_ à passer à la classe : 
//function myAjaxAllJson(p_TXDataDict={},p_timeOut=2000,p_headerDataDict={},p_route,p_method,f_callback) {

// listTest[0]

// Créer une instance de la classe
myReq = new myAjaxAllJson({id:'123',nom:'doriath'},2000,{secretcode:'123',
macaddress:'123456'},"/testLib_Ajax01Response","POST",f_callback);
var stophere = 100;

function f_btnAjaxSend(){
    // Envoyer la requête, utiliser la méthode 'envoyer' de la classe
    //myReq.envoyer();
}

function f_btnAjaxShow(){
    console.log(myReq );
    // Afficher le contenu de myReq.RXData dans la DIV avec id = "divForData"
    // 'myReq.RXData' est une liste d'objets
    var myDiv = document.getElementById("divForData");
    for (var i =0;  i<=myReq.RXData.length; i++) {
        for(var key in myReq.RXData[i]){
            var data = myReq.RXData[i][key];
            var pp = document.createElement('p');
            pp.innerHTML='clé : '+str(key)+" "+"data : "+str(data);
            myDiv.appendChild(pp);            
        };
    }
}

var stophere = 1; // pour point d'arret debuger

var p2 = document.getElementById("btnAjaxSend");
p2.addEventListener('click', f_btnAjaxSend , false);

var p3 = document.getElementById("btnAjaxShow");
p3.addEventListener('click', f_btnAjaxShow , false);