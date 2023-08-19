// Date : 05/08/2023
// Auteur : Christian Doriath
// Dossier : D:\Informatique\Developpement\Javascript\lib_js
// Fichier : lib_fetch.js

// Description : Création de requête HTTPS individuelles ou chainées.

// Mot cles : 

  function fetcher_NOCHAIN(p_url, p_f, p_id){
    // p_url : URL pour y faire la requête
    // p_f : Fonction à exécuter quand les datas seront dispos
    // p_id : id d'une balise à utiliser pour montrer les datas sur la page HTML
    //
    // PAS DE CHAINAGE DE CETTE f_ avec 'fetcherChain()'
    // Cette f_ n'est  destinée à être chainée à l'aide de 
    // la f_ 'fetcherChain()'
    //
    // Elle s'utilise TOUTE SEULE. Par exemple : 
    // fetcher_NOCHAIN(uneUrl, montreData, "selectDossier")
    // 
    fetch(p_url)
    .then(function(response){return response.json();} )
    .then(function(respjson){
      p_f(respjson, p_id)
      console.log("Voici la réponse : ",respjson)} )
    .catch(function(error){
      console.log("Dans fetcher_NOCHAIN() Erreur : " + error);
      console.log("Erreur sur cette URL : ", p_url);
      document.getElementById(p_id).innerHTML = " message d'erreur : " + error
    } )
  }

  function afficheLesDatas(p_dataListe, p_id){
    for (var i = 0; i < p_dataListe.length; i++) {
      document.getElementById(p_id).innerHTML = document.getElementById(p_id).innerHTML + " id : " + p_dataListe[i]['id'] + " nom : " + p_dataListe[i]['name']
    }
  }



  // Montrer l'utilisation de 'async' et 'await' en remplacement des chaines de .then et .catch
  async function fetcherAsync(p_url, p_f, p_id){
    try {
      let response = await fetch(p_url);
      let respjson = await response.json();
      p_f(respjson, p_id)
      return respjson
    }
    catch {
      console.log("Dans fetcherAsync(), erreur avec cette URL: ",p_url)
      console.error("Erreur dans fetcherAsync() : ", error)
      document.getElementById(p_id).innerHTML = " message d'erreur : " + error
    }
  }

  function fetcher(p_url){
    // f_ de CHAINAGE des requêtes avec 'fetcherChain()'
    // Cette f_ est  destinée à être chainée à l'aide de 
    // la f_ 'fetcherChain()'
    // 
    // p_url : URL pour y faire la requête
    return(
    fetch(p_url)
    .then(function(response){
      return response.json();} )
    .then(function(respjson){
      // Ici je n'appelle PAS de fonction car la logique veut que du code 
      // est exécuté dans la f_ 'fetcherChain' quand TOUTES les requêtes sont terminées.
      console.log("Dans 'fetcher(p_url)' voici la réponse : ",respjson)
      return respjson
    } )
    .catch(function(error){
      // p_fError(p_id, error)
      console.log("p_id accessible ? : ",p_id)
      console.log("Erreur avec cette URL: ",p_url)
      console.log("Erreur dans fetcher() : ", error)
      console.error("Erreur dans fetcher() : ", error)
      document.getElementById(p_id).innerHTML = " message d'erreur : " + error
    } )
    )
  }

  function fetcherChain(p_listFetcher, p_f, p_id){
    // CHAINER, faire PLUSIEURS REQUETES fetch en parallèle
    // 'fetcherChain' est une f_ qui accepte une LISTE composée de plusieurs appels à la f_ 'fetcher()'
    // Par exemple pour simultanément 3 requêtes : 
    // p_listFetcher = [fetcher(url2), fetcherAsync(url3) , fetcher(url4)] 
    
    // p_f : Fonction à exécuter quand TOUTES les datas seront dispos
    // p_id : id d'une balise à utiliser pour montrer les datas sur la page HTML
    var p = Promise.all(p_listFetcher)
    .then(function(reponseAll){
      // 'reponseAll' est une liste de toutes les réponses de chaque 'fetch' 
      // de la liste 'p_listFetcher'
      console.log("Dans Promise.all() voici reponseAll : ",reponseAll) 
      // Ici j'appelle une fonction car TOUTES les requêtes sont terminées.
      p_f(reponseAll, p_id)
      // return reponseAll;} )
      } )
    .catch(function(error){
      console.error("Dans Promise.all(), une erreur s'est produite : ",error)
    })

  }

  let url = "https://jsonplaceholder.typicode.com/users" 
  let url2 = "https://jsonplaceholder.typicode.com/users/2" 
  let url3 = "https://jsonplaceholder.typicode.com/users/3" 
  let url4 = "https://jsonplaceholder.typicode.com/users/4" 
  let url5 = "https://dummyjson.com/products/5"

  // Par exemple : fetcherChain([fetcher(url2), fetcher(url3) , fetcher(url4)], afficheLesDatas,"div4result2")