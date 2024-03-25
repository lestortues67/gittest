// Date : 15/06/2019
// Auteur : Christian Doriath
// Dossier : c:/javascript
// Fichier : lib_divers.js
// Description : Quelques classes pour diverses fonctions



// Cette classe permet de se déplacer dans des valeurs 
//numériques mini=0 et maxi=p_LimiteHaut.  
class plusMoins {
// 'LAvaleur' et 'haut' sont initialisés grace 
// aux paramètres passés (p_valeur,p_LimiteHaut)
	constructor(p_valeur,p_LimiteHaut){
		//sont crées à partir d'un paramètre : 
		this.LAvaleur = p_valeur;
		this.haut = p_LimiteHaut;
		//n'est PAS crée à partir d'un paramètre
		this.bas = 0;
	}	
	Inc(){
		if (this.LAvaleur < this.haut){
			this.LAvaleur++;
		}
	}
	Dec(){
	if (this.LAvaleur > this.bas){
			this.LAvaleur--;
		}
	}
}

//Se déplacer dans une liste. 
//Cette classe est au départ destinée à gérer le 
//déplacement du curseur parmi les éléments html d'une page web.
class deplaceur {
	constructor(p_list,p_verifyOnPage=true){
//si p_verifyOnPage=False il est possible d'utiliser cette classe
//sans vérifier la présence des éléments de la liste sur une
//page web.
//C'est alors uniquement une gestion d'un pointeur dans une liste
//qui est fait par l'instance de cette classe.
		this.list = p_list;//Liste parcourue
		this.lastPointer = p_list.length-1;//Dernier élément de la liste
		this.listPointer = 0;//Index courant dans la liste
		this.focusElement = "";//Valeur dans la liste pointée par l'index courant 
		this.verifyOnPage = p_verifyOnPage;
	}	
	gotoStart(){//15/06/19 OK
		if (this.verifier(this.list[0])){
			this.listPointer = 0;
			this.focusElement = this.list[0];
			if (this.verifyOnPage){
				document.getElementById(this.focusElement).focus();
			}
		}
	}
	gotoEnd(){//15/06/19 OK
		if (this.verifier(this.list[this.lastPointer])){
			this.listPointer = this.lastPointer;
			this.focusElement = this.list[this.lastPointer];
			if (this.verifyOnPage){
				document.getElementById(this.focusElement).focus();
			}
		}
	}
	next(){//15/06/19 OK
		if (this.listPointer < this.lastPointer){
			this.listPointer++;
			if (this.verifier(this.list[this.listPointer])){
				this.focusElement = this.list[this.listPointer];
				if (this.verifyOnPage){
					document.getElementById(this.focusElement).focus();
				}
			}
		}
	}
	prior(){//15/06/19 OK
		if (this.listPointer > 0){
			this.listPointer--;
			if (this.verifier(this.list[this.listPointer])){
				this.focusElement = this.list[this.listPointer];
				if (this.verifyOnPage){
					document.getElementById(this.focusElement).focus();
				}
			}
		}
	}
	gotoElement(p_elementId){//15/06/19 OK
		//La valeur passée existe dans la liste
		if (this.verifier(p_elementId)){
			this.listPointer = this.list.indexOf(p_elementId);
			this.focusElement = p_elementId;
			if (this.verifyOnPage){
				document.getElementById(this.focusElement).focus();
			}
		}
	}
	verifier(p_elementId){//15/06/19 OK
	//Vérifier si 'p_elementId' existe bien dans la liste
	// ET AUSSI (si p_verifyOnPage == true) sur la page 
	//html un élément porte bien cet ID
		if(this.list.indexOf(p_elementId)>= 0) {//La valeur passée existe dans la liste
			if (this.verifyOnPage){
				if(!(document.getElementById(this.list[this.list.indexOf(p_elementId)] )==null)){
					//L'id a été trouvé dans liste et sur la page web
					return true;
				}
				else{//Afficher pas d'élément avec cet id sur la page
					window.alert("Pas d'élément avec cet id sur la page !" )
				}
			}
			else{//if (p_verifyOnPage)
				return true;
			}	
		}
		else {//Afficher message Pas cet id dans la liste
			window.alert("Pas cet id dans la liste !" )
		}
	}
	verifierInListe(p_elementId){//27/06/19
	//Vérifier si 'p_elementId' existe bien dans la liste
		if(this.list.indexOf(p_elementId)>= 0) {//La valeur passée existe dans la liste
			return true;
		}
		else{
			return false;
		}
	}
	indexInListe(p_elementId){//27/06/19
	//Retourne l'index de 'p_elementId' s'il existe bien dans la liste
	// sinon -9 est retourné
		if(this.list.indexOf(p_elementId)>= 0) {//La valeur passée existe dans la liste
			return this.list.indexOf(p_elementId);
		}
		else{
			return -9;
		}
	}
	verifierOnPage(p_elementId){//27/06/19 
	//Vérifier si 'p_elementId' existe bien sur la page 
	//html; un élément porte bien cet ID
		if(document.getElementById(this.list[this.list.indexOf(p_elementId)] )==null) {
			return false;
		}
		else{
			return true;
		}
	}
	verifierOLD(p_elementId){//15/06/19 OK
	//Vérifier si 'p_elementId' existe bien dans la liste
	// ET AUSSI sur la page html un élément porte bien cet ID.
		if(this.list.indexOf(p_elementId)>= 0) {
			//La valeur passée existe dans la liste
			if(!(document.getElementById(this.list[this.list.indexOf(p_elementId)] )==null)){
				//L'id a été trouvé dans liste et sur la page web
				return true;
			}
			else{//Afficher pas d'élément avec cet id sur la page
				window.alert("Pas d'élément avec cet id sur la page !" )
			}
			
			}
		else {//Afficher message Pas cet id dans la liste
			window.alert("Pas cet id dans la liste !" )
			}
	}
	iHaveFocus(p_elementId){//27/06/19 
		//p_elementId (l'ID d'un élément html sur la page) 
		//permet de signifier à la classe 
		//qu'un élément possède le curseur ( a le focus).
		//Cette méthode permet le déplacement du curseur avec 
		//la souris (et non les méthodes next() ou prior() )
		//qui déplacent le curseur vers un autre élément
		
		//La valeur passée existe dans la liste
		if (this.verifierInListe(p_elementId)){
			this.listPointer = this.indexInListe(p_elementId);
			this.focusElement = p_elementId;
		}
	}
}

// ===========================================================================
// Mot cles : string2List
function string2List(p_string,p_separator){// 14/06/19
  	// convertir un string d'une liste avec un caractère utilisé en séparateur 
  	// par exemple une liste de garnitures o = "to/fr/jb/ch" 
  	// ( ici le caractère utilisé en séparateur est : / ) 
  	// en une liste = ['to','fr','jb','ch'] 
  		return p_string.split(p_separator);
  	}
// ===========================================================================
// Mot cles : js_sound1
// Description : classe pour générer un son dans le haut parleur
// source : https://www.javascripture.com/OscillatorNode
class createSound {
	constructor(p_freq) {
		// Temporary workaround until AudioContext is standardized 
		window.AudioContext = window.AudioContext || window.webkitAudioContext;
		this.context = new AudioContext();
		this.freq = p_freq;
	}
	startSound(){
		this.osc = this.context.createOscillator();
  		this.osc.frequency.value = this.freq;
		this.osc.start(0);
      	this.osc.connect(this.context.destination);
      	}					
	stopSound(){
		this.osc.stop();
      	this.osc.disconnect();
      	}
}
// créer une instance de cette classe : 
// var ss = new createSound(500);

// émettre un son f=500 Hz : 
// ss.startSound();

// stopper le son : 
// ss.stopSound();

// ===========================================================================
// Mot cles : JS_GlobalVar JS_debugger
// définitions de la variable globale : 
var bluredElement_id = 0;

function f_bbb( p_event ) {
	//Appel vers la variable globale. 
	window.bluredElement_id = this.id;
	console.log("in f_blur, window.bluredElement_id, leaving : "+window.bluredElement_id);
	//Appel inconditionnel du debugger.
	debugger;	
    }
// ===========================================================================
// Description : Ajouter une méthode à une classe de base JS; ici 'STRING'.
// Mot cles : myPrototypeJs
String.prototype.toBytes = function() {
	var arr = []
	for (var i=0; i < this.length; i++) {
		arr.push(this[i].charCodeAt(0))
	}
	return arr
}
// Exemple toBytes() : 
// var data = "hello world".toBytes().concat([0x01B, 0x64, 10]);
// console.log("voici data :"+data);
// mytext = "Voici le résultat de la conversion du texte 'hello world' en bytes : "+data


// ===========================================================================
// Description : classe pour gérer les événements. Une fonction
// est éxecutée lorsqu'un événement se produit. 
// Mot cles : js_events1

// La liste des événements du genre 'keypress' se trouve ici : 
// https://developer.mozilla.org/fr/docs/Web/Events
// Les plus communs pour moi sont : 
// click : Un bouton d'un dispositif de pointage a été appuyé ou relaché sur un élément.
// change : Un élément perd le focus et sa valeur a changé depuis l'acquisition du focus.
// blur : Un élément perd le focus (ne se propage pas).
// keypress : Une touche est pressée et cette touche produit normalement un caractère (utilisez input à la place).

// quelques touches : ArrowUp ArrowDown ArrowLeft ArrowRight Enter F5 F10

// A exécuter quand n'importe quelle touche est appuyée. 
function evt_Any(){
	const nomTouche = event.key;
  	alert('Évènement keypress\n\n' + 'touche : ' + nomTouche);
	}	

// A exécuter quand la touche F10 est appuyée. 
function evt_F10(){
	if (event.key=="F10") {
		// action à effectuer ici 
		// ex : placer curseur dans un élément (donner focus)
		// document.getElementById("qte1b").focus();
		alert('F10 a été pressé !');
		}
	}	

//Cette classe a pour rôle d'associer une fonction à un événement. 

class myEvents {
	constructor(p_event,p_function) {
		this.evt = p_event;
		this.fonction = p_function;
	}
	associateTo(){
		document.addEventListener(this.evt, this.fonction);
	}
}


// créer une instance de cette classe : 
// var evt1 = new myEvents('keypress',evt_F10);

// Note : Les définitions des fonctions comme par exemple : 'evt_F10' 
// se trouvent en général dans le fichier js du projet; 
// et non ici dans la définition de la classe. 

// ===========================================================================
// Mot cles : MoneyJavascript
// Format monétaire en JS.
//Source : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Number/toLocaleString
// nombre est de type 'number'
var nombre = 35.50;

console.log(typeof(nombre));

nombre.toLocaleString('fr-FR', {
    style: 'currency', 
    currency: 'EUR', 
    minimumFractionDigits: 2 
});


console.log('nombre a été formatté en €uros : '+nombre)

// le nombre est affiché sur la console ainsi : "35,50 €"
// ===========================================================================
// Mot cles :  myJsDictF_

var ll = [{'no':100,'desc':'le chat botté'},
    {'no':101,'desc':'le chien noir'},
    {'no':102,'desc':'le poisson rouge'},
    {'no':103,'desc':'Bidon MOTUL'},
    {'no':104,'desc':'Arthur Roi'}]

console.log('==========================');
// 'dictKeys' contiendra la liste des clés du dictionnaire : 
var dictKeys = Object.keys(ll[0]);
// La performance de la boucle FOR ...IN est un peu meilleure que Object.keys ...

// Compter le nombre de clés dans le DICT : 
Object.keys(ll[0]).length;

console.log('==========================');



var string1 = "";
var object1 = {a: 1, b: 2, c: 3};

// Parcourir un dict, lecture de toutes les valeurs
for (var ppp0 in object1) {
  string1 += object1[ppp0];
}

console.log(string1);
console.log('==========================');

ll.forEach(function(element) {
    var dictElement = element;
    for (var ppp0 in element) {
        console.log('valeur pour la clé : '+ppp0+"   ==>  "+element[ppp0]);
    }
});
// ===========================================================================
// Mot cles : JS_keypress


function f_allKeys(p_event){
		const nomTouche = p_event.key;
		//Afficher quelle touche a été pressée : 
		alert('Évènement keypress\n\n' + 'touche : ' + nomTouche);

		//Code si la touche flèche du haut est pressée : 
		if (nomTouche=="ArrowUp") {
			document.getElementById("qte1b").focus();
			alert('Évènement keypress\n\n' + 'touche : ' + nomTouche);
			}
		//Code si la touche F10 est pressée : 
		if (nomTouche=="F10") {
			document.getElementById('scode').focus();
			}
}


// Quand l'objet html avec id="ekey" est sélectionné 
// et n'importe QUELLE une touche est appuyée 
// on éxecute la fonction f_ekey
// exemple : 
// var ekeydown = document.getElementById("ekey");
// ekeydown.addEventListener('keydown', f_ekey , false);

// Quand n'importe QUELLE une touche est appuyée 
// alors on éxecute la fonction f_allKeys
// exemple : 
// document.addEventListener('keydown', f_allKeys , false);

// ===========================================================================
// Description : Utiliser une classe JS où une méthode en appele une autre
// au sein de la classe. 

// Mot cles : JS_Class_Call
class tester{
	constructor(p_a) {
		this.bbu = 100;
		this.pp = p_a;//Rendre dispo un paramètre passé lors de l'init (p_a)
		//grâce au préfixe 'this' -> this.pp
	}
//La méthode 'calca' utilise une autre méthode la classe 'add_10'
	calca(p_key){
		return (this.add_10(p_key))+this.bbu;
	}
	calcb(p_key){
		return (this.sub_5(p_key));
	}
//La méthode 'calcc' utilise le paramètre 'p_a' passé 
//lors de l'instanciation de la classe qui est devennu 'this.pp'. 
	calcc(p_key){
		return (p_key+this.bbu+this.pp);
	}
	add_10(p_key){
		return (p_key+10+this.bbu);
	}
	sub_5(p_key){
		return (p_key-5);
	}

}

// ===========================================================================
// Description : Exécuter une fonction JS au start up de la page html.  

// Mot cles : JSF_Startup JS_canvas

// const canvas= document.querySelector("canvas");
// const ctx= canvas.getContext("2d");


function draw()
 {
 ctx.fillStyle = "#BADA55"; 
 ctx.fillRect(100,100,50,50);
}
 
function drawCircle()
 {
 ctx.fillStyle = "red"; 
 ctx.beginPath();
 ctx.arc(100,100,25,0,Math.PI*2,false);
 ctx.fill();
}
//Exécuter cette fonction au démarrage : 
 (function drawRedCircle()
 {
 ctx.fillStyle = "red"; 
 ctx.beginPath();
 ctx.arc(100,100,25,0,Math.PI*2,false);
 ctx.fill();
})();
// ===========================================================================
// Description : vider la 'div' de tous ses éléments
// Mot cles : JSF_removeElements
function removeDivElements(p_divId="divHid"){
    //vider la 'div' de tous ses éléments
    var mmDiv = document.getElementById(p_divId);
    var child = mmDiv.lastElementChild;  
        while (child) { 
            mmDiv.removeChild(child); 
            child = mmDiv.lastElementChild; 
        }
}

// ===========================================================================
// Description : retourner un string aléatoire; 'p_length' nbr de lettres
// Mot cles : JS_randomString

function randomString(p_length){
  var st = "";
  var min = Math.ceil(65);
  var max = Math.floor(90);
  for (var i = 0; i < p_length; i++) {
    var al= Math.floor(Math.random() * (max - min)) + min;
    st = st.concat(String.fromCharCode(al));
  }
  return st;
}

// ===========================================================================
// Description : un chrono un compteur qui utilise la technique de closure.
// Mot cles : JS_closureChrono

// Un compteur à l'aide d'une 'closure' :
function counter() {
    var n = 0;
    return {
        count: function() { return n++; },
        reset: function() { n = 0; }
        };
}
// Création de deux compteurs : 
// var c0 = counter();
// var c1 = counter();
// utilisation : 
// c0.count(); => 1
// c0.count(); => 2
// c0.count(); => 3
// c1.count(); => 1

// Un chrono à l'aide d'une 'closure' :
function chrono() {
    var n = 0;
    var interval = 0;
    return {
        count: function() { interval = setInterval(function() { 
            console.log("Valeur du chrono : "+" "+n+" "+Date.now());
            return n++; },1000)  },
        pause: function(){clearInterval(interval);},
        stop: function(){
            clearInterval(interval);
            n = 0;
            }
        };
}
// Création de deux chronos : 
// var ch0 = chrono();
// var ch1 = chrono();
// utilisation : 
// ch0.count();
// ch1.count();
// ch0.pause();
// ch1.pause();
// ch0.stop();
// ch1.stop();
// ===========================================================================
// Description : Gestion d'une touche appuyée. Passer le curseur vers le prochain 
// élément input type=text quand 'enter' est pressé.
// Mot cles : js_keyEvent

// Source : https://stackoverflow.com/questions/1009808/enter-key-press-behaves-like-a-tab-in-javascript
// Tous les éléments html de type 'input' se trouvent OBLIGATOIREMENT dans un élément 'form'
// Déplacement vers l'élément suivant en appuyant sur la touche 'enter'
function enterKeyEventTest0(){
  document.addEventListener('keydown', function (event) {
    if (event.keyCode === 13 && event.target.nodeName === 'INPUT') {
      // Voici notamment ce que contient 'event' : 
      // keydown { target: <input>, key: "Enter", charCode: 0, keyCode: 13 }
      var form = event.target.form;
      // form.length indique le nbr d'éléments dans 'form'
      var formLength = form.length-1;
      var index = Array.prototype.indexOf.call(form, event.target);
      if (index < formLength){
        form.elements[index + 1].focus();
      }
      else { 
        form.elements[0].focus();
      }
      event.preventDefault();
    }
  });  
}

// ===========================================================================
// Description : 
// 
// Mot cles : 



