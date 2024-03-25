// function makeRequest(url) Source : 
// https://developer.mozilla.org/fr/docs/Web/Guide/AJAX/Premiers_pas

var httpRequest = false;

httpRequest = new XMLHttpRequest();

if (!httpRequest) {
    alert('Abandon : Impossible de créer une instance XMLHTTP');
}
// httpRequest.onreadystatechange = function() { alertContents(httpRequest); };


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
        var AATEXTresults4 = httpRequest.responseText;
        var AAJSONresults = JSON.parse(httpRequest.responseText);
        var zz = new Map(Object.entries(AAJSONresults));
        //Conversion des objets en Map :         
        //var AAnew0 = new Map(Object.entries(AAJSONresults[0]));
        //var AAnew1 = new Map(Object.entries(AAJSONresults[1]));
        
        console.log("httpRequest.readyState === 4 "+AATEXTresults4); 
        console.log("httpRequest.readyState === 4 en JSON : "+AAJSONresults); 
        var stophere = 1;
    }
    var stopHere = 100;
    return (100);
}

var aaz = httpRequest.onreadystatechange = whenChange;


// httpRequest.onreadystatechange = function() { 
//     if (httpRequest.readyState === 4){
//         var results = httpRequest.responseText;
//         var JSONresults = JSON.parse(httpRequest.responseText);
//         var stophere = 1;
//     }
//     console.log(httpRequest); };


// httpRequest.open('POST',"/demopost", true);
httpRequest.open('POST',"https://jsonplaceholder.typicode.com/posts", true);

// httpRequest.open('POST',"/demopost", true);
httpRequest.send(null);
// var atext = httpRequest.responseText;
// var aresponse = httpRequest.response;
var stophere = 1;

function alertContents(httpRequest) {

    if (httpRequest.readyState == XMLHttpRequest.DONE) {
        if (httpRequest.status == 200) {
            alert(httpRequest.responseText);
        } else {
            alert('Un problème est survenu avec la requête.');
        }
    }

}

// source : https://stackoverflow.com/questions/38824349
function returnMapOLD(p_obj){
    var result = Object.keys(p_obj).map(function(key) {
        return [Number(key), p_obj[key]];});
    return result;
}
// source : https://stackoverflow.com/questions/38824349
function returnMap(p_obj){
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



var stophere = 1;
