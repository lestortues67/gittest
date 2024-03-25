// Source : 
// Date : 23/09/2019
// Auteur : Christian Doriath
// Dossier : /Python34/MesDEv/Flask/ajax_BASE
// Fichier : testLib_Ajax01.js
// Description : Tester une requête AJAX/POST en utilisant la lib 'lib_ajax'
// sans 'FormData'

// Mot cles : js_ajax js_viderDIV

var listTest = [{"id":0,"name":"maurice","username":"emile"},
{"id":1,"name":"MoivieStar","username":"coralie"},
{"id":2,"name":"k2000","username":"elandra"}]


function f_callback(p_RXedData){
    if (typeof(p_RXedData)=="object"){
        var myDiv = document.getElementById("divForData");
        //Clear the data in the DIV : js_viderDIV
        while (myDiv.firstChild) {
            myDiv.removeChild(myDiv.firstChild);
        }
        var pp = document.createElement('p');
        pp.innerHTML="Voici les datas envoyées par le serveur ";
        
            myDiv.appendChild(pp);
        for (var key in p_RXedData) {        
            console.log("Clé : "+key+" || Data : "+p_RXedData[key])
            var pp = document.createElement('p');
            pp.innerHTML="Clé : "+key+" || Data : "+p_RXedData[key];
        
            myDiv.appendChild(pp);
        }
    }
    if (typeof(p_RXedData)=="objectOLD"){
        for (var key in p_RXedData) {
            console.log(key+" = "+p_RXedData[key])
        }
    }
    if (typeof(p_RXedData)=="string"){
        console.log("data = "+p_RXedData);
    }
}

function f_btnAjaxSend(){
    // Créer une instance de la classe
    //Les p_ à passer à la classe :  
    //function ClassAjaxAllJson(p_headerDataDict={},p_TXDataDict={},p_timeOut=2000,p_route,p_method,f_callback)    
    myReq = new ClassAjaxAllJson ({secretcode:'123',macaddress:'123456'},
    {id:'123',nom:'doriath'},2000,"/testLib_Ajax01Response","POST",f_callback);
}

var p2 = document.getElementById("btnAjaxSend");
p2.addEventListener('click', f_btnAjaxSend , false);
