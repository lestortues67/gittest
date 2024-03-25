// Source : 
// Date : 21/09/2019
// Auteur : Christian Doriath
// Dossier : /Python34/MesDEv/Flask/ajax_BASE
// Fichier : AJAX_GETLocalSetRequestHeader.js
// Description : Mettre de la data dans le header avec XMLHttpRequest()
// et ensuite une requête AJAX avec une requête GET ou POST sur localhost 
// qui retourne les data en JSON et les datas mises dans le header !!
// Mot cles : ajax_DataInHeader

var GdataRxed = "";

//Cette fonction sert à convertir la reponse du serveur qui est au format JSON 
//en une liste (array) constituee d'objets (dictionnaires).
function returnListOfObjects(){
    if (httpRequest.readyState == XMLHttpRequest.DONE) {
        if (httpRequest.status == 200) {
            return JSON.parse(httpRequest.responseText);
            }
        }
        else {
            alert('Un problème est survenu avec la requête. Status : '+httpRequest.status);
            return false;
        }
    {alert('Les datas ne sont pas encore disponibles. Ré-essayez plus tard.');
        return false;
        }
}
// La valeur retournée est un array si plusieurs elements sont renvoyes du serveur
// La valeur retournée est un 'object' si un seul element est renvoye du serveur


function f_btn_showdata(){        
        console.log(Date.now());
        var data = JSON.parse(GdataRxed);
        
        var myDiv = document.getElementById("divForData");
        var aaappp = document.getElementById("ppp");
        var pp = document.createElement('p');
        pp.innerHTML='id : '+data.id;
        myDiv.appendChild(pp);
        var pp = document.createElement('p');
        pp.innerHTML='prix : '+data.prix;
        myDiv.appendChild(pp);
        var pp = document.createElement('p');
        pp.innerHTML='prixn : '+data.prixn;
        myDiv.appendChild(pp);
        var pp = document.createElement('p');
        pp.innerHTML='ref : '+data.ref;
        myDiv.appendChild(pp);
        var pp = document.createElement('p');
        pp.innerHTML='title : '+data.title;
        myDiv.appendChild(pp);

        
        }




function f_brouillon(){
   // console.log("Voir la réponse du serveur Content-Type: %s", httpRequest.getResponseHeader("Content-Type"));
    // console.log("Voir la réponse du serveur pour 'key': %s", httpRequest.getResponseHeader(keyOk));
    // console.log("Voir la réponse du serveur pour 'dateKey': %s", httpRequest.getResponseHeader("dateKey"));
    // console.log(" "); 

}


function f_sendIt(){



    function whenChange() {
    // function whenChange() : 
    // Voici la liste complète des valeurs de readyState :

    //     0 (non initialisée) ou (requête non initialisée)
    //     1 (en cours de chargement) ou (connexion établie avec le serveur)
    //     2 (chargée) ou (requête reçue)
    //     3 (en cours d’interaction) ou (traitement de la requête)
    //     4 (terminée) ou (requête est terminée et la réponse est prête)

        if (httpRequest.readyState === 1){
            var TEXTresults1 = httpRequest.responseText;
            //console.log("httpRequest.readyState === 1 "); 
            console.log(" "); 
        }
        if (httpRequest.readyState === 2){
            var TEXTresults2 = httpRequest.responseText;
            // console.log("httpRequest.readyState === 2 "+TEXTresults2); 
            console.log(" "); 
        }
        if (httpRequest.readyState === 3){
            var TEXTresults3 = httpRequest.responseText;
            console.log("httpRequest.readyState === 3 "+TEXTresults3); 
 
        } 
        if (httpRequest.readyState === 4){
            GdataRxed = httpRequest.responseText;
            // alert('Data est disponible ! ');
            //Ici on informe quand les datas sont reçus. 
            //il est maintenant possible d'utiliser la fonction returnListOfMaps
            //pour obtenir en retour une liste de Map. 
            //ou bien la fonction 'returnTextData' pour un format texte.
            f_btn_showdata();
        }
        var stopHere = 100; // pour point d'arret debuger
        return (100);
    }

    //Effectuer une requête HTTP GET

    //Lire les datas dans les zones de texte : 
    var keyOk = document.getElementById("key4Data").value;
    var dataOk = document.getElementById("dataFromKey").value;

    console.log("La zone input 'key' contenait ceci : "+keyOk); 
    console.log("La zone input 'data' contenait ceci : "+dataOk); 

    var stophere = 1; // pour point d'arret debuger
    //PAramètrer la requête
    var httpRequest = false;
    //On declare une connexion 'XMLHttpRequest' 
    httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
        alert('Abandon : Impossible de créer une instance XMLHTTP');
    }


    // On declare a la connexion 'XMLHttpRequest' qu'elle doit executer 
    // du code situe dans la fonction whenChange() lorsque sa propriete 'readyState' change de valeur
    var aaz = httpRequest.onreadystatechange = whenChange;

    //On ouvre une connexion 'XMLHttpRequest' de type GET sur le serveur 'jsonplaceholder.typicode.com'
    httpRequest.open('GET',"/AJAX_GETLocalSetRequestHeader", true);
    // Ajouter des paires clé/valeur dans le header de la requête. MC : ajax_DataInHeader
    httpRequest.setRequestHeader(keyOk, dataOk);
    httpRequest.setRequestHeader("secretAccessCode", "21092019");
    httpRequest.setRequestHeader("macAddress", "0x6cf049756738");

    //On envoie la requete
    httpRequest.send(null);
}


var fd = document.getElementById('btn_senddata')
fd.addEventListener('click',f_sendIt,false);


var fdd = document.getElementById('btn_showdata')
fdd.addEventListener('click',f_btn_showdata,false);


