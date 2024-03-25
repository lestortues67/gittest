// function makeRequest(url) Source : 
// https://developer.mozilla.org/fr/docs/Web/Guide/AJAX/Premiers_pas

var httpRequest = false;
var dataHolder = Object.create({});

httpRequest = new XMLHttpRequest();

if (!httpRequest) {
    alert('Abandon : Impossible de créer une instance XMLHTTP');
}

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
        //console.log("httpRequest.readyState === 3 "+TEXTresults3); 
        console.log("httpRequest.readyState === 3 "); 
        console.log(" "); 
    }
    if (httpRequest.readyState === 4){
        if (httpRequest.status === 200) {
            console.log("Je vous indique la valeur de httpRequest.status : "+httpRequest.status.toString()); 
            console.log("httpRequest.readyState === 4 "); 
            var AATEXTresults4 = httpRequest.responseText;
            var AAXMLresults = httpRequest.responseXML;
            var AAJSONresults = JSON.parse(httpRequest.responseText);
            dataHolder = AAJSONresults;
            console.log("Le type de AAJSONresults est "+typeof(AAJSONresults)); 
            console.log("Ses clés sont : "+AAJSONresults.keys()); 
            console.log("Ses valeurs sont : "+AAJSONresults.values()); 
            console.log("Le nombre des dictionnaires : "+AAJSONresults.length); 
            console.log("Voici le contenu des dictionnaires : "); 
            str = JSON.stringify(AAJSONresults, null, 4); 
            console.log(str);

            console.log("=================================="); 
            console.log(" "); 
            console.log(" Les datas se trouvent dans l'object 'AAJSONresults' ! "); 
            console.log(" 'AAJSONresults' est une liste de dictionnaires."); 
            console.log(" "); 
            console.log("=================================="); 


            for (let i = 0; i < AAJSONresults.length; i++) {
                console.log(" "); 
                console.log("Le type de clé : "+typeof(AAJSONresults[i])); 
                console.log("Les clés : "+Object.keys(AAJSONresults[i])); 
                dataHolder[i.toString()] = AAJSONresults[i];
                console.log("L'ID : "+AAJSONresults[i]['id']);             
                console.log("Le nom : "+AAJSONresults[i]['name']);        
                console.log("Les valeurs : "+Object.values(AAJSONresults[i])); 
            }
            var stopHere = 100;

            //Conversion des objets en Map : 
            var AAnew0 = new Map(Object.entries(AAJSONresults[0]));
            var AAnew1 = new Map(Object.entries(AAJSONresults[1]));
            
            console.log("httpRequest.readyState === 4 "+AATEXTresults4); 
            console.log("httpRequest.readyState === 4 en JSON : "+AAJSONresults); 
            var stophere = 1;
            }
        else {
            alert("Le serveur a eu un problème, le code n'est PAS 200...");
            console.log("Le code retourné par le serveur est "+httpRequest.status.toString()); 
        }
    }
    //return (100);
}

var dataRXed = httpRequest.onreadystatechange = whenChange;

httpRequest.open('GET',"https://jsonplaceholder.typicode.com/users", true);
httpRequest.send(null);
var stophere = 1;

// source : https://stackoverflow.com/questions/38824349
function returnMap(p_obj){
    // ex : convertir ceci {"1":5,"2":7,"3":0} en ceci [[1,5],[2,7],[3,0]]
    var result = Object.keys(p_obj).map(function(key) {
        return [key, p_obj[key]];});
    return result;
}

var obj = {"nom":"doriath","prenom":"claire","tel":"03.88.02.09.35"}
var listObj =[ {"nom":"doriath","prenom":"claire","tel":"03.88.02.09.35"} , 
{"nom":"doriath","prenom":"claire","tel":"03.88.02.09.35"} ];

var mapnew = new Map(Object.entries(obj));

var map0 = new Map(returnMap(obj));
var map1 = new Map(returnMap(listObj[0]));
var map2 = new Map(returnMap(listObj[1]));





console.log(" Les datas se trouvent dans l'object 'AAJSONresults' ! "); 

var stophere = 1;