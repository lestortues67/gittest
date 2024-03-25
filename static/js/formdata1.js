// Source : 
// Date : 23/09/2019
// Auteur : Christian Doriath
// Dossier : /Python34/MesDEv/Flask/ajax_BASE
// Fichier : formdata1.js
// Description : Tester une requête AJAX/POST en utilisant la lib 'lib_ajax'
// AVEC 'FormData'
// Mot cles : js_formdata js_ajax

//Commentaires : AJAX établi une communication de type asynchrone. 
// Ce qui veut dire : 
// - la requete est faite au serveur à l'heure 'h'. 
// - sa reponse n'est pas synchronisee avec la demande. 
//
// Il n'est pas possible d'obtenir immédiatement, 
// dans ce meme fichier js, la reponse du serveur. 
// L'execution de ce fichier js prend quelques millisecondes 
// mais la réponse du serveur est asynchrone et bien plus longue.

//Pour obtenir la liste qui contient les 'Map' il suffit d'executer 
//dans la console de 'web application' de FireFox ceci : returnListOfMaps();


function f_callback(p_RXedData){
    if (typeof(p_RXedData)=="object"){
        var myDiv = document.getElementById("divForData");
        //Clear the data in the DIV : 
        while (myDiv.firstChild) {
            myDiv.removeChild(myDiv.firstChild);
        }

        var pp = document.createElement('p');
        pp.innerHTML="Voici les datas envoyées par le serveur ";
        // [key]+p_RXedData[key];
            myDiv.appendChild(pp);
        for (var key in p_RXedData) {        
            console.log("Clé : "+key+" || Data : "+p_RXedData[key])
            var pp = document.createElement('p');
            pp.innerHTML="Clé : "+key+" || Data : "+p_RXedData[key];
            // [key]+p_RXedData[key];
            myDiv.appendChild(pp);
        }
    }
    if (typeof(p_RXedData)=="string"){
        console.log("data = "+p_RXedData);
    }
}

function f_btnAjaxShow(){
// function ClassAjaxAllJsonWithFormData(p_headerDataDict={},p_timeOut=2000,p_formId,p_route,p_method,p_f_callback) 
    myReq = new ClassAjaxAllJsonWithFormData ({secretcode:'123',macaddress:'123456'},
    2000,"formD2","/formdata1Response1","POST",f_callback);
}
var p3 = document.getElementById("btnAjaxShow");
p3.addEventListener('click', f_btnAjaxShow , false);


