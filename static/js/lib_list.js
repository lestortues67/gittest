// Source : 
// Date : 27/09/2019
// Auteur : Christian Doriath
// Dossier : c:/javascript
// Fichier : lib_list.js
// Description : Une classe JS pour la 
// gestion des éléments d'une LISTE (array).

// Mot cles : JSClasse_LIST myJsDictF_

function class_dict() {
    this.Dict={};
    // CRUD 
    // Ajouter/Màj d'une paire au dict 'this.Dict'.
    // Si p_key existe c'est Update sinon c'est append
    this.appendUpdatePAIR=function(p_key,p_value){// 
      Object.defineProperty(this.Dict, p_key, {  value: p_value, configurable: true,  writable: true, enumerable: true});
    }
    this.retrievePAIR=function(p_key){// 
      return (this.Dict[p_key]);
    }
    this.deletePAIR=function(p_key){// 
      delete this.Dict[p_key];
    }
    this.ClassLoopPAIR=function(p_fCondition, p_fAction, p_listArgs){
      for (key in this.Dict) {
        if (p_fCondition(this.Dict[key])){
          p_fAction.call(this,p_listArgs);
        }
      }
    }
    this.withExternalDataPAIR=function(p_data,p_function){
      if ( (typeof(p_data)=="object") && (!(Array.isArray(p_data))) ) {
          for (key in p_data) {
              p_function.call(this, key, p_data[key] ) ;
          }
      }
      if (Array.isArray(p_data))  {
          for (var i =0; i<p_data.length; i++) {
              p_function.call(this,p_data[i]);
          }
      }
    }
}

function class_list() {
    this.Liste=[];
    // CRUD 
    // Ajouter un élément à 'this.Liste'.
    this.appendELEMENT=function(p_element){// 
      this.Liste.push(p_element);
    }
    // Retourner un élément de 'this.Liste'.
    this.retrieveELEMENT=function(p_index){// 
      return (this.Liste[p_index]);
    }
    // Màj d'un élément de 'this.Liste'.
    this.updateELEMENT=function(p_index,p_element){// 
        this.Liste[p_index]=p_element;
    }
    // Supprimer un élément de 'this.Liste'.
    this.deleteELEMENT=function(p_index){// 
      this.Liste.splice(p_index,1);
    }
    // Executer du code sur TOUS les éléments dans this.Liste.
    // La fonction externe 'p_fCondition' reçoit l'élément à éxaminer et
    // retourne true ou false suivant le résultat de l'examen.
    // Si la fonction externe 'p_fCondition' retourne true alors
    // le code de la fonction externe 'p_fAction' est exécuté. 
    // Le mot clé 'this' lui fournit un accès à toutes les propriétés et méthodes
    // de l'instance de la classe 'class_list'.  
    // Une liste (array) 'p_listArgs' permet de lui passer des paramètres.
    this.ClassLoopELEMENT=function(p_fCondition, p_fAction, p_listArgs){
        for (var i = 0;i<this.Liste.length; i++) {
              if (p_fCondition(this.Liste[i])){
                p_fAction.call(this,p_listArgs);
                }
        }
    }
    // Une boucle exécute la fonction externe 'p_function' sur CHAQUE
    // élément dans 'p_data'. 
    // La data dans 'p_data' peut être de deux types : dictionnaire (object) ou
    // liste (array). 
    // La fonction externe 'p_fCondition' reçoit l'élément à éxaminer et
    
    this.withExternalDataELEMENT=function(p_data,p_function){
      if ( (typeof(p_data)=="object") && (!(Array.isArray(p_data))) ) {
          for (key in p_data) {
              p_function.call(this, key, p_data[key] ) ;
          }
      }
      if (Array.isArray(p_data))  {
          for (var i =0; i<p_data.length; i++) {
              p_function.call(this,p_data[i]);
          }
      }
    }
}
