// Source : 
// Date : 4/06/2019
// Auteur : Christian Doriath
// Dossier : /Python34/MesDEv/Flask/ajax_BASE
// Fichier : AJAX_POSTlask.js
// Description : AJAX avec une requête GET sur localhost 
// qui retourne les data en JSON
// Source video youtube : "Apprendre le JavaScript : Chapitre 17, Ajax"
//source : https://developer.mozilla.org/fr/docs/Web/Guide/AJAX/Premiers_pas

// Mot cles : ajax

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

var httpRequest = false;
//On declare une connexion 'XMLHttpRequest' 
httpRequest = new XMLHttpRequest();

if (!httpRequest) {
    alert('Abandon : Impossible de créer une instance XMLHTTP');
}

// function whenChange() : 
// Voici la liste complète des valeurs de readyState :

//     0 (non initialisée) ou (requête non initialisée)
//     1 (en cours de chargement) ou (connexion établie avec le serveur)
//     2 (chargée) ou (requête reçue)
//     3 (en cours d’interaction) ou (traitement de la requête)
//     4 (terminée) ou (requête est terminée et la réponse est prête)


function whenChange() {
    if (httpRequest.readyState === 1){
        var TEXTresults1 = httpRequest.responseText;
        console.log("httpRequest.readyState === 1 "); 
        console.log(" "); 
    }
    if (httpRequest.readyState === 2){
        var TEXTresults2 = httpRequest.responseText;
        console.log("httpRequest.readyState === 2 "+TEXTresults2); 
        console.log(" "); 
    }
    if (httpRequest.readyState === 3){
        var TEXTresults3 = httpRequest.responseText;
        console.log("httpRequest.readyState === 3 "+TEXTresults3); 
        console.log(" "); 
    }
    if (httpRequest.readyState === 4){
        // alert('Data est disponible ! ');
        //Ici on informe quand les datas sont reçus. 
        //il est maintenant possible d'utiliser la fonction returnListOfMaps
        //pour obtenir en retour une liste de Map. 
        //ou bien la fonction 'returnTextData' pour un format texte.
    }
    var stopHere = 100; // pour point d'arret debuger
    return (100);
}
//Cette fonction sert à convertir la reponse du serveur qui est au format JSON 
//en une liste (array) constituee d'elements Map.
function returnListOfMaps(){
    if (httpRequest.readyState == XMLHttpRequest.DONE) {
        if (httpRequest.status == 200) {
            var ResponseJSON = JSON.parse(httpRequest.responseText);
            // ResponseJSON est un array si plusieurs elements sont renvoyes du serveur
            // ResponseJSON est un 'object' si un seul element est renvoye du serveur

            //Verifier si 'ResponseJSON' contient un ou plusieurs 'object':
            if (Array.isArray(ResponseJSON )){
                //'ResponseJSON' est un array qui contient plusieurs 'object'
                //Dupliquer ResponseJSON vers ResponseJSONMaps
                var ResponseJSONMaps = ResponseJSON;

                //Convertir les 'object' de l'array en Map : 
                ResponseJSON.forEach(function(item, index, array) {    
                ResponseJSONMaps[index] = new Map(Object.entries(item));
                });//Maintenant 'ResponseJSONMaps' est une liste de Map.
                return (ResponseJSONMaps);
            }
            else{
                //'ResponseJSON' contient un seul 'object'
                return (new Map(Object.entries(ResponseJSON)));
                }
        }
        else {
            alert('Un problème est survenu avec la requête. Status : '+httpRequest.status);
        }
    }
    else {
        alert('Les datas ne sont pas encore disponibles. Ré-essayez plus tard.');
        }
}


// On declare a la connexion 'XMLHttpRequest' qu'elle doit executer 
// du code situe dans la fonction whenChange() lorsque sa propriete 'readyState' change de valeur
var aaz = httpRequest.onreadystatechange = whenChange;

//On ouvre une connexion 'XMLHttpRequest' de type GET sur le serveur 'jsonplaceholder.typicode.com'
httpRequest.open('POST',"/ResponseJSON_AJAX_POSTFlaskMany", true); 

//Ici quelques couples clé/valeur sont crees pour verifier s'ils sont bien passes au serveur
var ff = JSON.stringify({id : 1234, nom : 'doriath', prenom: 'claire', poids : 81});

//On envoie la requete avec les donnees à transmettre (comme pour un 'form' )
httpRequest.send(ff);

// httpRequest.send(null);

var stophere = 1; // pour point d'arret debuger

//Pour obtenir la liste qui contient les 'Map' il suffit d'executer 
//dans la console de 'web application' de FireFox ceci : returnListOfMaps();