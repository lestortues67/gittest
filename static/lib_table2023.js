// Date : 24/08/2022
// Auteur : Christian Doriath
// Dossier : c:/javascript/
// Fichier : lib_table.js
// Principe : Chaque 'table' destinée à afficher des datas est OBLIGATOIREMENT liée
// à une liste (Array. ) d'objets (Object. ) de datas (dictionnaire).
// Màj sur : checkHealth
// ajout : 2 méthodes exportSortedCleReservoir, exportSortedCategReservoir



// Description : Création, à partir de 'réservoir' (un array de code JS), d'élèments HTML en code JS.

// Mot cles : cHER


// 19/05/2023 
// A renseigner (dans un/plusieurs petit(s) film(s) ) pour une meilleure compréhension de cette librairie : 

// 1) Comment et où est choisie la largeur d'une colonne de la table ? 

// colspan (pour indiquer le nombre de colonnes de la TABLE à utiliser : si la table est constituée de 3 colonnes
// date, nom, prénom alors sur une ligne de data <td> alors si pour 'nom' colspan="2" le nom est afficher sur les deux colonnes
// nom et prénom) 
// ou plutot col-x (avec x= 1 à 12) pour fixer la largeur de la colonne de la table à un nombre de colonnes
// du système des 12 colonnes en largeur de l'écran de Bootstrap ? 

// 2) Expliquer le concept de clé de structure et de clé de data. 

function classHtmlElementsReservoir() {
    var reservoirMustHaveKeys = ['table','thead','tbody','tfoot','tr','th',
    'td','defaultTheadDataKey','defaultTbodyDataKey','defaultTfootDataKey'];
    var defaultTheadDataKey = 'defaultTheadDataKey';
    var defaultTbodyDataKey = 'defaultTbodyDataKey';
    var defaultTfootDataKey = 'defaultTfootDataKey';
    var reservoir = [ 
        {cle:'defaultTheadDataKey',
        categorie:"defaultDataKey",
        comment:"Dans 'thead' si la clé de data n'existe pas dans l'array 'reservoir' on utilise cette clé par défaut",
        code://thead veut une balise 'th'
            function (p_key,p_data,p_index,p_dict,p_array){
                var monTh = document.createElement('th')
                monTh.classList.add("text-center");
                monTh.innerHTML = p_data;       
                return monTh;
            }
        },
        {cle:'defaultTbodyDataKey',
        categorie:"defaultDataKey",
        comment:"Dans 'tbody' si la clé de data n'existe pas dans l'array 'reservoir' on utilise cette clé par défaut",
        code://tbody veut une balise 'td'
            function (p_key,p_data,p_index,p_dict,p_array){
                var monTd = document.createElement('td')
                monTd.classList.add("text-center");
                monTd.innerHTML = p_data;       
                return monTd;
            }
        },
        {cle:'leftText',
        categorie:"text",
        comment:"Aligner le texte à gauche",
        code://tbody veut une balise 'td'
            function (p_key,p_data,p_index,p_dict,p_array){
                var monTd = document.createElement('td')
                monTd.classList.add("text-left");
                monTd.innerHTML = p_data;       
                return monTd;
            }
        },
        {cle:'rightText',
        categorie:"text",
        comment:"Aligner le texte à droite",
        code://tbody veut une balise 'td'
            function (p_key,p_data,p_index,p_dict,p_array){
                var monTd = document.createElement('td')
                monTd.classList.add("text-right");
                monTd.innerHTML = p_data;       
                return monTd;
            }
        },
        {cle:'boldText',
        categorie:"text",
        comment:"Le texte en gras",
        code://tbody veut une balise 'td'
            function (p_key,p_data,p_index,p_dict,p_array){
                var monTd = document.createElement('td')
                monTd.classList.add("font-weight-bold");
                monTd.classList.add("text-center");
                monTd.innerHTML = p_data;       
                return monTd;
            }
        },
        {cle:'dataKey_colspan6',
        categorie:"text",
        comment:"La data sur 6 colonnes de la table",
        code://tbody veut une balise 'td'
        function (p_key,p_data,p_index,p_dict,p_array){
            var monTd = document.createElement('td')
            monTd.classList.add("text-center");
            monTd.innerHTML = p_data;       
            monTd.colSpan = 6
            return monTd;
            }
        },
        {cle:'dataKey_6colonne',
        categorie:"text",
        comment:"La data sur 6 colonnes du système des 12 colonnes BS",
        code://tbody veut une balise 'td'
        function (p_key,p_data,p_index,p_dict,p_array){
            var monTd = document.createElement('td')
            monTd.classList.add("text-center");
            monTd.classList.add("col-6");
            monTd.innerHTML = p_data;       
            monTd.colSpan = 6
            return monTd;
            }
        },
        {cle:'dataKey_col_1',
        categorie:"text",
        comment:"La data utilise la classe BS 'col-1'",
        code://tbody veut une balise 'td'
        function (p_key,p_data,p_index,p_dict,p_array){
            var monTd = document.createElement('td')
            monTd.classList.add("text-center");
            monTd.classList.add("col-1");
            monTd.innerHTML = p_data;       
            return monTd;
            }
        },
        {cle:'titre_colspan_4',
        categorie:"text",
        comment:"La data utilise colSpan=4 ",
        code://tbody veut une balise 'td'
        function (p_key,p_data,p_index,p_dict,p_array){
            var monTd = document.createElement('td')
            monTd.classList.add("text-center");
            monTd.colSpan = 4;
            monTd.innerHTML = p_data;       
            return monTd;
            }
        },
        {cle:'italicTextBS5_3',
        categorie:"text",
        comment:"Le texte en italique pour bootstrap V5.3",
        code://tbody veut une balise 'td'
            function (p_key,p_data,p_index,p_dict,p_array){
                var monTd = document.createElement('td')
                monTd.classList.add("fst-italic");
                monTd.classList.add("text-center");
                // monTd.classList.add("text-danger");
                monTd.innerHTML = p_data;       
                return monTd;
            }
        },
        {cle:'italicText',
        categorie:"text",
        comment:"Le texte en italique",
        code://tbody veut une balise 'td'
            function (p_key,p_data,p_index,p_dict,p_array){
                var monTd = document.createElement('td')
                monTd.classList.add("font-italic");
                monTd.classList.add("text-center");
                monTd.classList.add("fst-italic");
                // monTd.classList.add("text-danger");
                monTd.innerHTML = p_data;       
                return monTd;
            }
        },
        {cle:'upperText',
        categorie:"text",
        comment:"1ère lettre en majuscule",
        code://tbody veut une balise 'td'
            function (p_key,p_data,p_index,p_dict,p_array){
                var monTd = document.createElement('td')
                monTd.classList.add("text-uppercase");
                monTd.classList.add("text-center");
                monTd.innerHTML = p_data;       
                return monTd;
            }
        },
        {cle:'capitalizeText',
        categorie:"text",
        comment:"Toutes les lettres en majuscule",
        code://tbody veut une balise 'td'
            function (p_key,p_data,p_index,p_dict,p_array){
                var monTd = document.createElement('td')
                monTd.classList.add("text-capitalize");
                monTd.classList.add("text-center");
                monTd.innerHTML = p_data;       
                return monTd;
            }
        },
        {cle:'primaryText',
        categorie:"text",
        comment:"En couleur primary",
        code://tbody veut une balise 'td'
            function (p_key,p_data,p_index,p_dict,p_array){
                var monTd = document.createElement('td')
                monTd.classList.add("text-primary");
                monTd.classList.add("text-center");
                monTd.innerHTML = p_data;       
                return monTd;
            }
        },
        {cle:'secondaryText',
        categorie:"text",
        comment:"En couleur secondary",
        code://tbody veut une balise 'td'
            function (p_key,p_data,p_index,p_dict,p_array){
                var monTd = document.createElement('td')
                monTd.classList.add("text-secondary");
                monTd.classList.add("text-center");
                monTd.innerHTML = p_data;       
                return monTd;
            }
        },
        {cle:'successText',
        categorie:"text",
        comment:"En couleur success",
        code://tbody veut une balise 'td'
            function (p_key,p_data,p_index,p_dict,p_array){
                var monTd = document.createElement('td')
                monTd.classList.add("text-success");
                monTd.classList.add("text-center");
                monTd.innerHTML = p_data;       
                return monTd;
            }
        },
        {cle:'dangerText',
        categorie:"text",
        comment:"En couleur danger",
        code://tbody veut une balise 'td'
            function (p_key,p_data,p_index,p_dict,p_array){
                var monTd = document.createElement('td')
                monTd.classList.add("text-danger");
                monTd.classList.add("text-center");
                monTd.innerHTML = p_data;       
                return monTd;
            }
        },
        {cle:'warningText',
        categorie:"text",
        comment:"En couleur warning",
        code://tbody veut une balise 'td'
            function (p_key,p_data,p_index,p_dict,p_array){
                var monTd = document.createElement('td')
                monTd.classList.add("text-warning");
                monTd.classList.add("text-center");
                monTd.innerHTML = p_data;       
                return monTd;
            }
        },
        {cle:'infoText',
        categorie:"text",
        comment:"En couleur info",
        code://tbody veut une balise 'td'
            function (p_key,p_data,p_index,p_dict,p_array){
                var monTd = document.createElement('td')
                monTd.classList.add("text-info");
                monTd.classList.add("text-center");
                monTd.innerHTML = p_data;       
                return monTd;
            }
        },
        {cle:'defaultTfootDataKey',
        categorie:"defaultDataKey",
        comment:"Dans 'tfoot' si la clé de data n'existe pas dans l'array 'reservoir' on utilise cette clé par défaut",
        code://tfoot veut une balise 'td'
            function (p_key,p_data,p_index,p_dict,p_array){
                var monTd = document.createElement('td')
                monTd.classList.add("text-center");
                monTd.innerHTML = p_data;       
                return monTd;
            }
        },
        {cle:'tableW25',
        categorie:"table",
        comment:"Retourne un 'table' d'une largeur de 25% de son parent (classe bootstrap w-25)",
        code:// Une balise 'table' en 'bootstrap' d'une largeur de 25%
            function (){    
                table = document.createElement('table');        
                table.classList.add('table');
                table.classList.add('table-bordered');
                table.classList.add('w-25');

                thead = document.createElement('thead');        
                tbody = document.createElement('tbody');        
                tfoot = document.createElement('tfoot');        
                
                table.appendChild(thead);
                table.appendChild(tbody);
                table.appendChild(tfoot);
                return table;
            }
        },
        {cle:'tableW50',
        categorie:"table",
        comment:"Retourne un 'table' d'une largeur de 50% de son parent (classe bootstrap w-50)",
        code:// Une balise 'table' en 'bootstrap' d'une largeur de 50%
            function (){    
                table = document.createElement('table');        
                table.classList.add('table');
                table.classList.add('table-bordered');
                table.classList.add('w-50');

                thead = document.createElement('thead');        
                tbody = document.createElement('tbody');        
                tfoot = document.createElement('tfoot');        
                
                table.appendChild(thead);
                table.appendChild(tbody);
                table.appendChild(tfoot);
                return table;
            }
        },
        {cle:'tableW75',
        categorie:"table",
        comment:"Retourne un 'table' d'une largeur de 75% de son parent (classe bootstrap w-75)",
        code:// Une balise 'table' en 'bootstrap' d'une largeur de 75%
            function (){    
                table = document.createElement('table');        
                table.classList.add('table');
                table.classList.add('table-bordered');
                table.classList.add('w-75');

                thead = document.createElement('thead');        
                tbody = document.createElement('tbody');        
                tfoot = document.createElement('tfoot');        
                
                table.appendChild(thead);
                table.appendChild(tbody);
                table.appendChild(tfoot);
                return table;
            }
        },
        {cle:'table',
        categorie:"table",
        comment:"Retourne une balise 'table' standard",
        code:// Une balise 'table' en 'bootstrap'
            function (){    
                table = document.createElement('table');        
                table.classList.add('table');
                table.classList.add('table-bordered');

                thead = document.createElement('thead');        
                tbody = document.createElement('tbody');        
                tfoot = document.createElement('tfoot');  

                // Ajouter un commentaire au bas de 'table'
                // tcaption = document.createElement('caption');        
                // tcaption.innerHTML = "Je un 'caption' ! "
                
                table.appendChild(thead);
                table.appendChild(tbody);
                table.appendChild(tfoot);
                // table.appendChild(tcaption);
                return table;
            }
        },
        {cle:'tableSmall',
        categorie:"table",
        comment:"Retourne une balise 'table' de petite taille en HAUTEUR",
        code:
            function (){    
                table = document.createElement('table');        
                table.classList.add('table');
                table.classList.add('table-sm');

                thead = document.createElement('thead');        
                tbody = document.createElement('tbody');        
                tfoot = document.createElement('tfoot');        
                
                table.appendChild(thead);
                table.appendChild(tbody);
                table.appendChild(tfoot);
                return table;
            }
        },
        {cle:'tableDark',
        categorie:"table",
        comment:"Retourne une balise 'table' avec un fond sombre",
        code:// Une balise 'table' en 'bootstrap' couleur 'noir'
            function (){    
                table = document.createElement('table');        
                table.classList.add('table');
                table.classList.add('table-dark');

                thead = document.createElement('thead');        
                tbody = document.createElement('tbody');        
                tfoot = document.createElement('tfoot');        
                
                table.appendChild(thead);
                table.appendChild(tbody);
                table.appendChild(tfoot);
                return table;
            }
        },
        {cle:'tablePrimary',
        categorie:"table",
        comment:"Retourne une balise 'table' avec un fond de couleur 'primary'",
        code:// Une balise 'table' en 'bootstrap' couleur 'noir'
            function (){    
                table = document.createElement('table');        
                table.classList.add('table');
                table.classList.add('bg-primary');

                thead = document.createElement('thead');        
                tbody = document.createElement('tbody');        
                tfoot = document.createElement('tfoot');        
                
                table.appendChild(thead);
                table.appendChild(tbody);
                table.appendChild(tfoot);
                return table;
            }
        },
        {cle:'tableSuccess',
        categorie:"table",
        comment:"Retourne une balise 'table' avec un fond de couleur 'success'",
        code:
            function (){    
                table = document.createElement('table');        
                table.classList.add('table');
                table.classList.add('bg-success');

                thead = document.createElement('thead');        
                tbody = document.createElement('tbody');        
                tfoot = document.createElement('tfoot');        
                
                table.appendChild(thead);
                table.appendChild(tbody);
                table.appendChild(tfoot);
                return table;
            }
        },
        {cle:'tableInfo',
        categorie:"table",
        comment:"Retourne une balise 'table' avec un fond de couleur 'info'",
        code:
            function (){    
                table = document.createElement('table');        
                table.classList.add('table');
                table.classList.add('bg-info');

                thead = document.createElement('thead');        
                tbody = document.createElement('tbody');        
                tfoot = document.createElement('tfoot');        
                
                table.appendChild(thead);
                table.appendChild(tbody);
                table.appendChild(tfoot);
                return table;
            }
        },
        {cle:'tableDanger',
        categorie:"table",
        comment:"Retourne une balise 'table' avec un fond de couleur 'danger'",
        code:
            function (){    
                table = document.createElement('table');        
                table.classList.add('table');
                table.classList.add('bg-danger');

                thead = document.createElement('thead');        
                tbody = document.createElement('tbody');        
                tfoot = document.createElement('tfoot');        
                
                table.appendChild(thead);
                table.appendChild(tbody);
                table.appendChild(tfoot);
                return table;
            }
        },
        {cle:'thead',
        categorie:"thead",
        comment:"Retourne une balise 'thead' standard",
        code:
            function (){
                return document.createElement('thead');
            }
        },
        {cle:'tbody',
        categorie:"tbody",
        comment:"Retourne une balise 'tbody' standard",
        code:
            function (){
                return document.createElement('tbody');
            }
        },
        {cle:'tfoot',
        categorie:"tfoot",
        comment:"Retourne une balise 'tfoot' standard",
        code:
            function (){
                return document.createElement('tfoot');
            }
        },

        {cle:'tr',
        categorie:"tr",
        comment:"Retourne une balise 'tr' standard",
        code:
            function (){
                var t = document.createElement('tr') 
                // Avec 'tabIndex=0' <tr> peut avoir le focus
                t.tabIndex=0;
                return t;
            }
        },
        {cle:'trBan',
        categorie:"tr",
        comment:"Retourne une balise 'tr' bg=jaune",
        code:
            function (){
                var t = document.createElement('tr') 
                t.classList.add("bg");
                t.classList.add("bg-warning");
                // Avec 'tabIndex=0' <tr> peut avoir le focus
                t.tabIndex=0;
                return t;
            }
        },
        {cle:'th',
        categorie:"th",
        comment:"Retourne une balise 'th' standard",
        code:
            function (){
                var monTh = document.createElement('th')
                monTh.classList.add("text-center");
                return monTh;
            }
        },
        {cle:'td',
        categorie:"td",
        comment:"Retourne une balise 'td' standard",
        code:
            function (){
                var monTd = document.createElement('td')
                monTd.classList.add("text-center");
                return monTd;
            }
        },
        {cle:"dataTag_selection",
        categorie:"input",
        comment:"Retourne une balise 'input' type='checkbox' dans un td",
        code:
            function (p_key,p_data,p_index,p_dict,p_array){
                var monTd = document.createElement('td')
                monTd.classList.add("text-center");
                var cac0 = document.createElement('input')
                cac0.type='checkbox';
                if(p_data){// <= DATA goes here !  
                    cac0.checked = true;    
                }
                else{
                    cac0.checked = false;
                }
                cac0.dataset.nom=p_dict['nom'] ; // L'ID dans le dict
                // cac0.addEventListener('click',eventManager,false);
                monTd.appendChild(cac0)
                return monTd;
            }
        },
        {cle:"dataTag_flag",
        categorie:"flag",
        comment:"Afficher un état ex : oui/non par une couleur vert/rouge dans un td",
        code:
            function (p_key,p_data,p_index,p_dict,p_array){
                var monTd = document.createElement('td');
                monTd.classList.add("align-middle");
                monTd.classList.add("text-center");
                monTd.colSpan = 1
                var button0 = document.createElement('button')
                button0.innerHTML="     ";// <= Quelques espaces pour la taille
                button0.classList.add("btn");
                button0.classList.add("btn-lg");// Size large
                if(p_data){
                    button0.classList.add("btn-success");// Color    
                }
                else{
                    button0.classList.add("btn-danger");// Color    
                }
                    button0.dataset.id = p_dict['id'];
                    button0.dataset.nom = p_dict['nom'];

                if (p_dict['tel']==456){
                    monTd.classList.add("text-right");
                }
                monTd.appendChild(button0)       
                return monTd;
            }
        },

        {cle:"prix",
        categorie:"dataKey",
        comment:"Une balise spéciale pour la clé 'prix'",
        code:
            function (p_key,p_data,p_index,p_dict,p_array){
                var monTd = document.createElement('td')
                // monTd.classList.add("text-center");
                monTd.classList.add("text-right");
                monTd.innerHTML = p_data;       
                if(p_data == 16){
                    monTd.classList.add("font-weight-bold");
                    monTd.classList.add("bg-light");
                }
                // Si le code = 31 on formatte
                if(p_dict['code'] == 31){
                    monTd.classList.add("font-weight-bold");
                    monTd.classList.add("bg-light");
                }
                return monTd;
            }
        },
        {cle:'theadColSpan2',
        categorie:"thead",
        comment:"Personnalisation à 2 colonnes colSpan",
        code:
            function (p_key,p_data,p_index,p_dict,p_array){
                var monTh = document.createElement('th');
                monTh.classList.add("align-middle");
                monTh.classList.add("text-center");
                monTh.colSpan = 2
                monTh.innerHTML = p_data;       
                return monTh;
            }
        },
        {cle:'theadKey0',
        categorie:"thead",
        comment:"Personnalisation de la 1ère colonne ('theadKey0') de toutes les lignes de 'thead'. "+
        "8 colonnes bootstrap (colSpan) sur ligne 0 (p_index==0) de la 1ère colonne (theadKey0) de 'thead'",
        code:
            function (p_key,p_data,p_index,p_dict,p_array){
                var monTh = document.createElement('th');
                monTh.classList.add("align-middle");
                monTh.classList.add("text-center");
                if (p_index==0){
                    monTh.colSpan = 8
                }
                monTh.innerHTML = p_data;       
                return monTh;
            }
        },
        {cle:"theadKey6",
        categorie:"thead",
        comment:"Formattage  de la 7em colonne (theadKey6) de 'thead' dont 2 colonnes bootstrap (colSpan)",
        code:
        // Spécialisation : 2 colonnes
            function (p_key,p_data,p_index,p_dict,p_array){
                var monTh = document.createElement('th');
                monTh.classList.add("align-middle");
                monTh.classList.add("text-center");
                monTh.colSpan = 2
                monTh.innerHTML = p_data;       
                return monTh;
            }
        },
        {cle:"theadKeyColspan2",
        categorie:"thead",
        comment:"Formattage  d'une colonne de 'thead' avec colspan = 2",
        code:
        // Spécialisation : 2 colonnes
            function (p_key,p_data,p_index,p_dict,p_array){
                var monTh = document.createElement('th');
                monTh.classList.add("align-middle");
                monTh.classList.add("text-center");
                monTh.colSpan = 2
                monTh.innerHTML = p_data;       
                return monTh;
            }
        },
        {cle:"theadKeyColspan6",
        categorie:"thead",
        comment:"Formattage  d'une colonne de 'thead' avec colspan = 6",
        code:
        // Spécialisation : 2 colonnes
            function (p_key,p_data,p_index,p_dict,p_array){
                var monTh = document.createElement('th');
                monTh.classList.add("align-middle");
                monTh.classList.add("text-center");
                monTh.colSpan = 6
                monTh.innerHTML = p_data;       
                return monTh;
            }
        },
        {cle:"theadKeyColspan7",
        categorie:"thead",
        comment:"Formattage  d'une colonne de 'thead' avec colspan = 7",
        code:
        // Spécialisation : 2 colonnes
            function (p_key,p_data,p_index,p_dict,p_array){
                var monTh = document.createElement('th');
                monTh.classList.add("align-middle");
                monTh.classList.add("text-center");
                monTh.colSpan = 7
                monTh.innerHTML = p_data;       
                return monTh;
            }
        },
        {cle:'foot0',
        categorie:"tfoot",
            comment:"Formattage  de la 1ère colonne (foot0) de 'tfoot' sur toutes les lignes"+
            " formattage particulier pour les conditions : p_data == Mon footer pour cette table 1,"+
            "p_index==0,p_index==1,p_index==2",
            code:
            // Spécialisation : nbr de colonnes variables suivant 'p_index' (numéro de ligne)
            function (p_key,p_data,p_index,p_dict,p_array){
                var monTd = document.createElement('td');
                monTd.classList.add("align-middle");
                monTd.classList.add("text-center");
                monTd.colSpan = 1

                if(p_data == "Mon footer pour cette 'table 1'"){
                    monTd.classList.add('bg-warning')
                }

                if (p_index==0){
                    monTd.colSpan = 8
                }
                if (p_index==1){
                    monTd.colSpan = 5
                }
                if (p_index==2){
                    monTd.colSpan = 8
                }
                
                monTd.innerHTML = p_data;       
                return monTd;
            }
        },
        {cle:"theadKey1",
            categorie:"thead",
            comment:"Formattage  de la 2em colonne (theadKey1) de 'thead' sur toutes les lignes"+
            " formattage particulier si p_data==btnInfo alors un button est retourné",
            code:  
            function (p_key,p_data,p_index,p_dict,p_array){
                var monTh = document.createElement('th');
                monTh.classList.add("align-middle");
                monTh.classList.add("text-center");
                monTh.colSpan = 1
                if (p_data=="btnInfo"){
                    var button0 = document.createElement('button')
                    button0.innerHTML=p_data;// <= DATA goes here !  
                    button0.classList.add("btn");
                    button0.classList.add("btn-warning");// Color    
                    monTh.appendChild(button0)           
                }
                else{
                    monTh.innerHTML=p_data;    
                }
                return monTh;
            }
        },
        {cle:'dataTag_btnValid',
            categorie:"btn",
            comment:"Button 'del' avec copie dans dataset des valeurs des clés 'id' et 'nom' "+
            " formattage particulier si la clé ['tel']==456 "+
            " Le libellé du bouton est passé dans p_data !",
            code:
            function (p_key,p_data,p_index,p_dict,p_array){
                var monTd = document.createElement('td');
                monTd.classList.add("align-middle");
                monTd.classList.add("text-center");
                monTd.colSpan = 1
                var button0 = document.createElement('button')
                button0.innerHTML=p_data;// <= Le libellé du bouton est passé dans p_data !  
                button0.classList.add("btn");

                    button0.classList.add("btn-warning");// Color    
                    // button0.dataset.id = p_array[p_index]['id'];
                    // button0.dataset.nom = p_array[p_index]['nom'];
                    button0.dataset.id = p_dict['id'];
                    button0.dataset.nom = p_dict['nom'];

                // button0.classList.add("align-middle");
                // button0.classList.add("align-right");

                if (p_dict['tel']==456){
                    monTd.classList.add("text-right");
                }
                monTd.appendChild(button0)       
                return monTd;
            }
        },
        {cle:'dataTag_btnDel',
            categorie:"btn",
            comment:"Button 'del' avec copie dans dataset des valeurs des clés 'id' et 'nom' "+
            " formattage particulier si la clé ['tel']==456 "+
            " Le libellé du bouton est passé dans p_data !",
            code:
            function (p_key,p_data,p_index,p_dict,p_array){
                var monTd = document.createElement('td');
                monTd.classList.add("align-middle");
                monTd.classList.add("text-center");
                monTd.colSpan = 1
                var button0 = document.createElement('button')
                button0.innerHTML=p_data;// <= Le libellé du bouton est passé dans p_data !  
                button0.classList.add("btn");

                    button0.classList.add("btn-danger");// Color    
                    // button0.dataset.id = p_array[p_index]['id'];
                    // button0.dataset.nom = p_array[p_index]['nom'];
                    button0.dataset.id = p_dict['id'];
                    button0.dataset.nom = p_dict['nom'];

                // button0.classList.add("align-middle");
                // button0.classList.add("align-right");

                if (p_dict['tel']==456){
                    monTd.classList.add("text-right");
                }
                monTd.appendChild(button0)       
                return monTd;
            }
        },
        {cle:'dataTag_btnEdit',
            categorie:"btn",
            comment:"Button 'edit' avec copie dans dataset des valeurs des clés 'id' et 'nom' "+
            " formattage particulier si la clé ['tel']==456 "+
            " Le libellé du bouton est passé dans p_data !",
            code:
            function (p_key,p_data,p_index,p_dict,p_array){
                var monTd = document.createElement('td');
                monTd.classList.add("align-middle");
                monTd.classList.add("text-center");
                monTd.colSpan = 1
                var button0 = document.createElement('button')
                button0.innerHTML=p_data;// <= Le libellé du bouton est passé dans p_data !  
                button0.classList.add("btn");

                    button0.classList.add("btn-success");// Color    
                    button0.dataset.id = p_array[p_index]['id'];
                    button0.dataset.nom = p_array[p_index]['nom'];
                // button0.classList.add("align-middle");
                // button0.classList.add("align-right");

                if (p_dict['tel']==456){
                    monTd.classList.add("text-right");
                }
                monTd.appendChild(button0)       
                return monTd;
            }
        },
        {cle:'dataTag_btnOpen',
            categorie:"btn",
            comment:"Button 'open' avec copie dans dataset des valeurs de la clé 'id', class ='col-1' "+
            " formattage particulier si la clé ['tel']==456 "+
            " Le libellé du bouton est passé dans p_data !",
            code:
            function (p_key,p_data,p_index,p_dict,p_array){
                var monTd = document.createElement('td');
                monTd.classList.add("align-middle");
                monTd.classList.add("text-center");
                monTd.classList.add("col-1");
                var button0 = document.createElement('button')
                button0.innerHTML=p_data;// <= Le libellé du bouton est passé dans p_data !  
                button0.classList.add("btn");
                button0.classList.add("btn-success");// Color    
                button0.dataset.id = p_array[p_index]['id'];
                button0.dataset.fileName = p_array[p_index]['fileName'];            
                // button0.dataset.nom = p_array[p_index]['nom'];
                // button0.classList.add("align-middle");
                // button0.classList.add("align-right");

                if (p_dict['tel']==456){
                    monTd.classList.add("text-right");
                }
                monTd.appendChild(button0)       
                return monTd;
            }
        }
        ];

    var keys = []
    if ( typeof classHtmlElementsReservoir.initialized == "undefined" ) {
        // Tout l'array 'reservoir' est retourné
        classHtmlElementsReservoir.prototype.returnReservoir = function() {
            // comment
            return reservoir
        }
        // De l'array 'reservoir' seules les valeurs de la clé 'cle' sont retournées triées
        classHtmlElementsReservoir.prototype.exportSortedCleReservoir = function() {
            reservoir.sort(function (p_a, p_b) {
                return  (p_a['cle'] > p_b['cle']);
                }) 
            var rr=[]
            for (var i = 0; i < reservoir.length; i++) {
                rr.push({cle:reservoir[i]['cle'],categorie:reservoir[i]['categorie'],comment:reservoir[i]['comment']});
            }
            return rr;
        }
        // De l'array 'reservoir' seules les valeurs de la clé 'cle' sont retournées triées
        classHtmlElementsReservoir.prototype.exportSortedCategReservoir = function() {
            reservoir.sort(function (p_a, p_b) {
                return  (p_a['categorie'] > p_b['categorie']);
                }) 
            var rr=[]
            for (var i = 0; i < reservoir.length; i++) {
                rr.push({categorie:reservoir[i]['categorie'],cle:reservoir[i]['cle'],comment:reservoir[i]['comment']});
            }
            return rr;
        }
        // Pour 'reservoir' vérification des doublons pour la clé 'cle'
        classHtmlElementsReservoir.prototype.hasDuplicateKey = function() {
            keys = [];
            for (var i = 0; i < reservoir.length; i++) {
                keys.push(reservoir[i]['cle'])
            }
            var findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) != index)
            var dResult = findDuplicates(keys)
            if (dResult.length){
                return dResult[0];
            }
            else{
                return false;
            }
        }
        // Renseigner si 'reservoir' contient la clé 'p_key'
        classHtmlElementsReservoir.prototype.keyIsPresent = function(p_key) {
            if (reservoir.find(element => element['cle'] == p_key)) {
                return true
            }
            else{
                return false
            }
        }
        // Méthode lancée AUTOMATIQUEMENT de vérifications du bon état du système (doublons & clés indispensables)
        classHtmlElementsReservoir.prototype.checkHealth = function() {
            // Cette méthode est lancée AUTOMATIQUEMENT grâce aux parenthèses à la fin ()
            // Vérifier que les conditions indispensables au bon fonctionnement 
            // de l'ensemble de création/gestion de 'table' sont réunies
            keys = [];
            for (var i = 0; i < reservoir.length; i++) {
                keys.push(reservoir[i]['cle'])
            }
            // Les doublons sur 'cle' sont interdits : 
            var findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) != index)
            var dResult = findDuplicates(keys)
            if (dResult.length){
                alert("Présence de DOUBLON(S) dans l'array 'reservoir' : "+dResult.toString())
                // return false;
            }
            
            // 'reservoir' DOIT contenir les dict suivants avec ces clés : 
            // 'table','thead','tbody','tfoot','tr','th','td'
            
            var temp = [];
            for (var i = 0; i < reservoirMustHaveKeys.length; i++) {
                if (! (classHtmlElementsReservoir.prototype.keyIsPresent(reservoirMustHaveKeys[i])) ){
                    temp.push(reservoirMustHaveKeys[i])
                }
                
            }
            if (temp.length){
                //Convert array 'temp' to string
                alert("Dans l'array 'reservoir' il manque cette clé(s) : "+temp.toString())
            }
            console.log("J'ai vérifié l'état de l'array 'reservoir' en passant dans 'checkHealth'\n et tout va bien :)");
        }()
        // Retourne le conteneur entier (dict) pour une clé donnée (p_key)
        classHtmlElementsReservoir.prototype.retrieveDict = function(p_key) {
            // Comment
            return reservoir.find(element => element['cle'] == p_key);
        }
        // Ajouter un conteneur (dict) à 'reservoir'
        classHtmlElementsReservoir.prototype.appendDict = function(p_dict) {
            // Ajouter un 'dict' à l'array 'reservoir'
            // On s'assure qu'il n'existe PAS un élément avec la même déjà présent dans 'reservoir'
            if (reservoir.find(function(element){return (element['cle']==p_dict['cle'])})){
                alert('Impossible, ajout en double !')
            }
            else{
                reservoir.push(p_dict)
            }
        }
        // Supprimer un conteneur (dict) à 'reservoir'
        classHtmlElementsReservoir.prototype.delDict = function(p_key) {
            // On s'assure que la clé existe dans 'reservoir'
            var found = reservoir.findIndex(function(element){return (element['cle']==p_key)});
            if (found>-1){
                reservoir.splice(found)
            }
            else{
                alert('Element NON présent !!')
            }
        }
        // Modification de la clé par défaut pour 'thead' quand la clé demandée est introuvable
        classHtmlElementsReservoir.prototype.setDefaultTheadFormatKey = function(p_key) {
            // Enregistrer la clé par défaut à utiliser pour formatter la data
            defaultTheadDataKey = p_key;
        }
        // =================== à modifier ============
        // Retourner la clé par défaut pour 'tbody' quand la clé demandée est introuvable
        classHtmlElementsReservoir.prototype.returnDefaultTheadFormatKey = function(p_key) {
            // Retourner la clé par défaut à utiliser pour formatter la data
            return defaultTheadDataKey;
        }
        // Modification de la clé par défaut pour 'tbody' quand la clé demandée est introuvable
        classHtmlElementsReservoir.prototype.setDefaultTbodyFormatKey = function(p_key) {
            // Enregistrer la clé par défaut à utiliser pour formatter la data
            defaultTbodyDataKey = p_key;
        }
        // Retourner la clé par défaut pour 'tbody' quand la clé demandée est introuvable
        classHtmlElementsReservoir.prototype.returnTbodyDefaultFormatKey = function(p_key) {
            // Retourner la clé par défaut à utiliser pour formatter la data
            return defaultTbodyDataKey;
        }
        // Modification de la clé par défaut pour 'tfoot' quand la clé demandée est introuvable
        classHtmlElementsReservoir.prototype.setDefaultTfootFormatKey = function(p_key) {
            // Enregistrer la clé par défaut à utiliser pour formatter la data
            defaultTfootDataKey = p_key;
        }
        // Retourner la clé par défaut pour 'tfoot' quand la clé demandée est introuvable
        classHtmlElementsReservoir.prototype.returnTfootDefaultFormatKey = function(p_key) {
            // Retourner la clé par défaut à utiliser pour formatter la data
            return defaultTfootDataKey;
        }
        // ==================== à modifier FIN ====================
        // Retourner la data formattée (clé absente) ou encapsulée dans un élément HTML (clé présente)
        classHtmlElementsReservoir.prototype.returnData = function(p_key,p_data,p_index,p_dict,p_array) {
            // retourne un élément Html en fonction des p_
            // On s'assure que la clé existe dans 'reservoir'
            if (classHtmlElementsReservoir.prototype.keyIsPresent (p_key)){
                var element = reservoir.find(function(element){return (element['cle']==p_key)});
                return element.code(p_key,p_data,p_index,p_dict,p_array);
                }
            else{
                // l'array 'reservoir' ne contient pas de paire (cle = p_key)
                // Ce qui veux dire qu'aucun code spécifique pour 'p_key' est dispo
                return false;
                // On utilise le code de formattage défini par défaut. 
                // Sa clé est définie dans la variable 'defaultFormatKey' dans le dict avec cle=''
                // p_data est simplement passé par la fonction 'onlyData' qui lui applique 
                // une petite mise en forme.
            }
        }
        classHtmlElementsReservoir.initialized = true;
    }
}

// ============================ les DATA pour la classe 'classTable2020'

// var myHeadersOrder0 = [ // 7 entêtes de colonne
// 'theadKey0','theadKey1','theadKey2','theadKey3','theadKey4','theadKey5',
// 'theadKey6']; 

// var myHeaders0 = [ // 2 lignes d'entête sur 7 colonnes à afficher
// // 1 ère ligne d'entête : 
// {theadKey0:"Je suis un 'table0' sans personnalisation : 'standard'"},// colspan sur TOUTES les colonnes
// // 2 em ligne d'entête : 
// {theadKey0:"Accepté ? ",theadKey1:"Le nom",theadKey2:'Le prénom',theadKey3:"Le téléphone",
// theadKey5:"Le prix",theadKey4:"Le code",theadKey6:'Les boutons'}
// ];

// var myBodysOrder0 = [// 8 clés de data
// 'dataTag_flag','nom','prenom','tel','code','prix','dataTag_btnEdit','dataTag_btnDel'];

// var myBodys0 =[ // 3 lignes de 8 colonnes 
// // ('id' n'est PAS affiché) donc 7 colonnes sont à afficher
// {id:0,nom:'dor',prenom:'chr',tel:123,prix:10,code:2,dataTag_btnEdit:'Editer',dataTag_btnDel:'Supprimer',dataTag_flag:1},
// {id:1,nom:'kin',prenom:'elise',tel:456,prix:14,code:0,dataTag_btnEdit:'Editer',dataTag_btnDel:'Supprimer',dataTag_flag:0},
// {id:2,nom:'lep',prenom:'oliv',tel:789,prix:16,code:3,dataTag_btnEdit:'Editer',dataTag_btnDel:'Supprimer',dataTag_flag:1}];

// var myFootsOrder0 = [ // 2 clés de colonne pour 'footer'
// 'foot0','foot1']

// var myFoots0 = [ // 3 lignes de 2 colonnes à afficher
// {foot0:"Mon footer pour cette 'table 0'"},
// {foot0:"Total 0 de votre commande ",foot1:"30€00"},
// {foot0:"Bon appétit 0 !"},
// ];
// ============================ les DATA == FIN 


// Mot cles : table2020JS
function classTable2020(p_classInstance) {
    // returnData : retourne un élément Html en fonction des p_
    // 'p_classInstance' est une instance de la classe 'classHtmlElementsReservoir()'
    var returnElementFunction = p_classInstance.returnData;

    // keyIsPresent : renvoie true si la la clé p_key est présente dans l'array 'reservoir' sinon retourne false
    var keyIsPresent = p_classInstance.keyIsPresent;


    this.table = "";
    this.div = "";
    this.numeroTa = 0;

    var myDiv,myTable,thead,tbody,tfoot

    myTable = returnElementFunction('table')

    if ( typeof classTable2020.initialized == "undefined" ) {
        classTable2020.prototype.documentation = function() {
            // 20/05/2020 : 
            // Ici la technique oo de 'composition' est utilisée pour 
            // permettre la modification du code aisée dans le futur. 
            // Le passage en paramètre d'une instance de classe par p_classInstance
            // est appelé technique de 'composition'. 
            // 'p_classInstance' est une instance de la classe 'classHtmlElementsReservoir()'
            // Sa fonction 'returnData' formate/encapsule les datas

            // Utilisation 


            // 1) Création d'une instance de la classe classHtmlElementsReservoir() (le gestionnaire 
            // de la liste 'reservoir', elle contient les lignes de code pour créer les balises HTML souhaitées)
            // var c = new classHtmlElementsReservoir();

            // 2) Création d'une instance de la classe « classTable2020 »
            // var t = new classTable2020(c);

            // 3) Création AUTOMATIQUE ( dans la 1ère div libre) d'une balise 'table' avec ses 3 enfants : 
            // thead,tbody,tfoot 
            // t.createTableAutoSearch();


            // 4) La balise <table> existe déjà mais ses éléments (thead,tbody,tfoot) sont vides

            // 4.1) remplacement du thead existant par un nouveau à partir des listes fournies en p_
            // t.updateThead (myHeadersOrder0,myHeaders0,p_structKeys={},p_dataKeys={});
            // myHeadersOrder0 : ordre d'affiche des datas dans myHeaders0
            // myHeaders0 : les valeurs a afficher
            // p_structKeys={} les clés de structure
            // p_dataKeys={} les clés de data

            // 4.2) remplacement du tbody existant par un nouveau à partir des listes fournies en p_
            // t.updateTbody (myBodysOrder0,myBodys0,{'tr':'trBan'},{'prenom':'upperText','tel':'italicText','code':'infoText'}) 
            // {'tr':'trBan'} une clé de structure est fournie pour 'tr' 
            // Cela indique que la balise <tr> est modifié selon 'trBan' : le BG est jaune. 

            // {'prenom':'upperText','tel':'italicText','code':'infoText'} des clés de data sont fournies
            // la colonne 'prenom':'upperText' les caractères seront en majuscule
            // la colonne 'tel':'italicText' les caractères seront en italique
            // la colonne 'code':'infoText' les caractères seront en couleur 'info' (bootstrap)


            // 4.3) remplacement du tfoot existant par un nouveau à partir des listes fournies en p_
            // t.updateTfoot (myFootsOrder0,myFoots0,{},{})

            // 5) Afficher la balise <table>
            // t.send2ScreenTable();










            // Création AUTOMATIQUE dans la 1ère div libre.
            // table0.createTableAutoSearch();

            // thead placement des datas
            // var monNewThead = table0.updateThead (myHeadersOrder0,myHeaders0,p_structKeys={},p_dataKeys={})
            // thead placement des datas
            // var monNewTbody = table0.updateTbody (myBodysOrder0,myBodys0,{'tr':'trBan'},{'prenom':'upperText',
            //     'tel':'italicText','code':'infoText'}) 
            // thead placement des datas
            // var monNewTfoot = table0.updateTfoot (myFootsOrder0,myFoots0,{},{})
            // Montrer la table sur la page html
            // table0.send2ScreenTable();
            // _endComment ~
        }
        classTable2020.prototype.exempleRegex = function() {
            // Ce proto est simplement placé ici pour montrer le formattage OBLIGATOIRE. 
            // Ceci afin de pouvoir extraire avec ctrl+f et une regex le proto et 
            // le commentaire qui doit le suivre. 
            // Le mot '_ooewwwnd' suivi de 'Comment' signale la fin de la zone à sélectionner. 
            // Voici la regex : classTable2020.prototype.[^ symbole virgule espagnole ]*\_endComment
            // _endComment ~
            var regexVar = 0;
        }



        // ============================= TABLE ================
        //SC type:this.table, placer dans la variable 'this.table' 
        // une balise HTML 'table' et ses 3 enfants thead,tbody & tfoot
        // en version automatisée createTableAutoSearch
        classTable2020.prototype.createTableAutoSearch = function(p_tableKey="table") {//QCOK 
            // identifie la table en cours de création ici.    
            // Rechercher sur la page html le er ID (au format tableX) d'une balise 'table' libre. 
            // Chaque 'table' présent sur la page html porte un ID avec un préfixe 'table' suivi d'un numéro d'ordre
            // Une div au format 'divForTableX' DOIT exister sur la page html. 
            // _endComment ~
            this.numeroTa=0;
            var search =true;
            var tableId = "";
            // En partant de 0 rechercher le 1er ID 'tableX' libre (non présent sur la page html) 
            while(search){
                tableId = 'table'+this.numeroTa;
                if (document.getElementById(tableId)==null){
                    console.log("L'ID "+tableId+" pour 'table' est libre, alors on peut l'utiliser");  
                    //Cet this.numeroTa est libre, on arrête de chercher
                    search=false;
                }
                else{
                    console.log("Cet ID "+tableId+" est utilisé !!");  
                    //Cet this.numeroTa n'est pas libre, on cherche le suivant
                    this.numeroTa++;
                }
            }
            //Une DIV correspondante (ID avec préfixe "divForTable" + 'this.numeroTa') existe sur la page HTML?
            this.div = document.getElementById("divForTable"+this.numeroTa);
            if (this.div === null) {
                // Aucune DIV n'est trouvée on arrête tout.
                alert('Elément DIV (id=divForTable) manquant : '+("divForTable"+this.numeroTa))
                return
            }
            if(p_tableKey){
                //Rechercher si la clé passée est présente dans l'array 'reservoir'
                if (keyIsPresent(p_tableKey)){
                    this.table = returnElementFunction(p_tableKey);
                }
                else{
                    alert("classTable2020 createTableAutoSearch : 'p_tableKey' est introuvable ! ")
                }
            }
            for (var i = 0; i < this.table.children.length; i++) {
                // Modifier/ajouter les ID
                if (this.table.children[i].nodeName == 'THEAD'){
                    this.table.children[i].id = 'thead'+this.numeroTa;
                }
                if (this.table.children[i].nodeName == 'TBODY'){
                    this.table.children[i].id = 'tbody'+this.numeroTa;
                }
                if (this.table.children[i].nodeName == 'TFOOT'){
                    this.table.children[i].id = 'tfoot'+this.numeroTa;
                }
            }

            this.table.id = 'table'+this.numeroTa;// Modifier/ajouter son ID à 'p_table'
        }// classTable2020... createTableAutoSearch

        classTable2020.prototype.createTable = function(p_tableNumero,p_divId,p_tableKey="table") {//QCOK 
            //Placer dans la variable 'this.table' une balise HTML 'table' et ses 3 enfants thead,tbody & tfoot
            // à partir de paramètres         
            // _endComment ~ 
            //La div dont l'ID est fourni dans p_divId existe sur la page HTML?
            this.div = document.getElementById(p_divId);
            if (this.div === null) {
                // La div n'existe PAS on arrête tout ! 
                alert("Elément DIV "+p_divId+" manquant ");
                return
            }
            if ( ! (typeof(p_tableNumero) === "number")) {
                // p_tableNumero n'est PAS une valeur numérique, on arrête tout ! 
                alert('p_tableNumero NON valeur numérique');
                return
            }
            var foundTa = document.getElementById('table'+p_tableNumero);
            if (foundTa) {
                // L'ID 'table'+p_tableNumero n'est PAS libre, on ne peux PAS l'utiliser, on arrête tout ! 
                alert("ERROR : Ce numéro de table "+p_tableNumero+" est déjà utilisé ! ");
                return
            }
            this.numeroTa = p_tableNumero;
            if(p_tableKey){
                //Rechercher si la clé passée est présente dans l'array 'reservoir'
                if (keyIsPresent(p_tableKey)){
                    this.table = returnElementFunction(p_tableKey);
                    this.table.id = 'table'+this.numeroTa;// Modifier/ajouter son ID à 'table'
                }
                else{
                    alert("classTable2020. createTable : l'array 'reservoir' ne contient pas cette clé : "+p_tableKey)
                }
            }
            else{
                alert('p_tableKey manquant');
                return
            }            
            for (var i = 0; i < this.table.children.length; i++) {
            // Modifier/ajouter les ID
                if (this.table.children[i].nodeName == 'THEAD'){
                    this.table.children[i].id = 'thead'+this.numeroTa;
                }
                if (this.table.children[i].nodeName == 'TBODY'){
                    this.table.children[i].id = 'tbody'+this.numeroTa;
                }
                if (this.table.children[i].nodeName == 'TFOOT'){
                    this.table.children[i].id = 'tfoot'+this.numeroTa;
                }
            }
        }// classTable2020...createTable 

        
        classTable2020.prototype.retrieveTable = function() {//QCOK 
            // Retourner this.table.    
            // _endComment ~
            return this.table;
        }// classTable2020...retrieveTable
        classTable2020.prototype.updateWithTagTable = function(p_table) {
            //Remplacer this.table par le p_ fourni. 
            // _endComment ~
            // utiliser 'send2ScreenTable' pour afficher les modifs à l'écran !
            p_table.id = "table"+this.numeroTa
            // Renumeroter dans p_table toutes les balises enfant : 
                for (var i = 0; i < p_table.children.length; i++) {
                    if (p_table.children[i].nodeName == 'THEAD'){
                        p_table.children[i].id = 'thead'+this.numeroTa;
                    }
                    if (p_table.children[i].nodeName == 'TBODY'){
                        p_table.children[i].id = 'tbody'+this.numeroTa;
                    }
                    if (p_table.children[i].nodeName == 'TFOOT'){
                        p_table.children[i].id = 'tfoot'+this.numeroTa;
                    }
                }
            this.table = p_table;
        }// classTable2020... updateWithTagTable
        //SC type:this.table, Effacer this.table
        classTable2020.prototype.deleteTable = function() {//QCOK 
            // utiliser 'send2ScreenTable' pour afficher les modifs à l'écran !
            // _endComment ~
            this.table="";
        }// classTable2020...deleteTable
        
        classTable2020.prototype.send2ScreenTable = function() {//QC
            //Effacer la balise HTML avec ID = "table+numeroTa" puis remplacement par this.table
            // _endComment ~
            // Est déjà affiché ? 
            if (document.getElementById("table"+this.numeroTa)){
                // Cette balise 'table' est déjà présente à l'écran
                var myElement = document.getElementById("table"+this.numeroTa)

                var myElementParentNode = myElement.parentNode
                // Supprimer cette balise 'table'
                myElement.parentNode.removeChild(myElement)
                // Remplacer la balise supprimée par la variable 'this.table'
                myElementParentNode.appendChild(this.table)
            }
            else{// Cette balise 'table' n'est PAS présente sur l'écran
                if (document.getElementById(this.div.id)){
                    // Ajouter à la div associée à cette instance la variable 'this.table'
                    document.getElementById(this.div.id).appendChild(this.table)
                }
                else{
                    alert("classTable2020...send2ScreenTable : DIV non présente ! ")
                }
            }
        }// classTable2020...send2ScreenTable

        classTable2020.prototype.hideOnScreenTable = function(p_trueFalse) {//QC
            //Cacher/Afficher : Ajouter la class 'd-none' ou "invisible" 
            // à l'objet avec ID = "table+numeroTa" pour le cacher
            // appendChild() et removeChild() conviennent aussi
            // _endComment ~
            var myTable = document.getElementById("table"+this.numeroTa)
            // La classe bootstrap "invisible" supprime la balise mais PAS 
            // l'emplacement (espace/surface utilisée) à l'écran 
            // La classe 'd-none' supprime la balise et l'emplacement (espace/surface utilisée) à l'écran 
            if (p_trueFalse == true){
                myTable.classList.add('d-none')
            }
            if (p_trueFalse == false){
                myTable.classList.remove('d-none')
            }
        }// classTable2020...hideOnScreenTable

        classTable2020.prototype.copyTable = function() {//QC
            //Fournir une copie de this.table    
            // _endComment ~
            return this.table.cloneNode(true);
        }// classTable2020...copyTable 
        // ============================= FIN TABLE =================

        // ============================= THEAD =====================
        
        classTable2020.prototype.retrieveNewThead = function() {
            //Retourner une nouvelle balise 'thead'     
            // _endComment ~
            var monThead = document.createElement('thead');
            monThead.id = "thead"+this.numeroTa
            return monThead;
        }// classTable2020...retrieveNewThead

        
        classTable2020.prototype.retrieveThead = function() {//QC
            //SC type:data, Fournir la balise 'Thead' qui est l'enfant de this.table
            // Attention ici c'est la référence et NON la valeur de 'thead' qui est retourné
            // Ecrire sur la valeur retournée REMPLACE donc 'thead'.
            // Pour utiliser 'thead' comme une copie utiliser la méthode 'copyThead'    
            // _endComment ~
            for (var i = 0; i < this.table.children.length; i++) {
                if (this.table.children[i].nodeName == 'THEAD'){
                    return this.table.children[i];
                }
            }
        }// classTable2020...retrieveThead

        
        classTable2020.prototype.updateThead = function(p_order,p_data,p_structKeys={},p_dataKeys={}) {
            // Remplacement de 'thead', l'enfant de this.table 
            // par un nouveau 'thead' conçu avec les datas fournies    
            // p_order : une liste qui indique l'ordre d'affichage des datas dans 'p_data'
            // p_data : 
            // p_structKeys={}
            // p_dataKeys={}
            // La balise <table> est constitué des 6 éléments suivants : 
            // <thead>,<tr>,<th>,<tbody>,<td>,<tfoot>
            // Exemple : 
            // <table>
            //      <thead>
            //          <tr>
            //              <th colspan="2">The table header</th>
            //          </tr>
            //      </thead>
            //      <tbody>
            //          <tr>
            //              <td>The table body</td>
            //              <td>with two columns</td>
            //          </tr>
            //      </tbody>
            //      <tfoot>
            //          <tr>
            //              <td>The table foot</td>
            //              <td>with two columns</td>
            //          </tr>
            //      </tfoot>
            // </table>

            // les clés de structure pour <tr> et <thead> peuvent être remplacées
            //      var trStructKey = 'tr';
            //      var theadStructKey = "thead";

            // _endComment ~
            if( !(p_order)) {
                // On vérifie la présence des datas indispensables p_order et p_data.
                alert("Il manque p_order")
            }
            if(!(p_data)){
                // ihlo
                alert("Il manque p_data")
            }
            // Création des variables qui contiennent les clés de structure pour <tr> et <thead>
            var trStructKey ="tr";
                // On tente de passer une clé de structure pour <tr> ? 
                if(p_structKeys['tr']){// une clé de structure en remplacement de 'tr' est passée
                    // 'trStructKey' est modifié par la valeur en p_ pour créer la balise <tr>
                    trStructKey = p_structKeys['tr'];
                }
                if ( ! (keyIsPresent(trStructKey) ) ){
                    alert("classTable2020...updateThead : ERROR trStructKey introuvable")
                    return;
                }

            var theadStructKey = "thead";
                // On tente de passer une clé de structure pour <thead> ? 
                if(p_structKeys['thead']){// une clé de structure en remplacement de 'thead' est passée
                    // 'theadStructKey' est modifié par la valeur en p_ pour créer la balise <thead>
                    theadStructKey = p_structKeys['thead'];
                }
                if ( ! (keyIsPresent(theadStructKey) ) ){
                    alert("classTable2020...updateThead : ERROR theadKey introuvable")
                    return;
                }

            // Création de la balise 'thead'
            var thead = returnElementFunction(theadStructKey);        

            // Une boucle sur TOUTES les lignes de data. 
            for (var line = 0; line < p_data.length; line++) {

                // Création de la liste 'dataKeys' des clés de DATA dans la ligne 'p_data' en cours
                var dataKeys =  Object.keys(p_data[line]); // A faire pour chaque LIGNE !!
            
                // Création d'une nouvelle ligne
                // var newRow = returnElementFunction(trStructKey,p_data);   
                var newRow = returnElementFunction(trStructKey);   
                newRow.id=this.table.id+"theadTr"+line;
                
                // Une boucle sur TOUTES les valeurs de la liste de l'ORDRE passée dans p_order. 
                // Elle est utilisée pour l'ORDRE d'affichage dans 'table'
                for (var key = 0; key < p_order.length; key++) {
                    // Il est possible de ne pas toujours fournir de la data pour toutes les clés dans p_data
                    // Il faut donc vérifier que la clé existe bien dans p_data avant de lancer la création d'une <td> pour elle.
                    // La clé (p_order[key]) est-elle présente dans la liste (p_data) des DATA  ? 

                    if (dataKeys.indexOf(p_order[key])>-1){// Oui, cette clé existe, créer une <td>


                        // Vérifier si une clé de data ALTERNATIVE est fournie dans 'p_dataKeys' pour la clé en cours p_order[key]
                        if (p_dataKeys[p_order[key]]){// Oui, une clé alternative est fournie
                            // On relève la nouvelle valeur de clé de DATA à utiliser dans la variable 'dataKey'
                            dataKey = p_dataKeys[p_order[key]]
                        }
                        // Aucune clé de data ALTERNATIVE n'est fournie dans 'p_dataKeys'
                        // Alors vérifier que la clé 'p_order[key]' existe bien dans la liste 'reservoir'
                        else if (keyIsPresent(p_order[key])){
                            // On relève la nouvelle valeur de clé de DATA à utiliser dans la variable 'dataKey'
                            var dataKey = p_order[key]; 
                        }
                        else {// Non, aucune clé alternative n'est fournie et la clé est INTROUVABLE dans 'reservoir'
                            // alors on se rabat sur la clé de data par défaut pour thead : 
                            dataKey = 'defaultTheadDataKey';
                        }
                        // Vérifier que la clé de data est présente dans 'reservoir' (OPTION)
                        if  (!(keyIsPresent(dataKey))) {
                            alert("classTable2020...updateThead : dataKey missing in Reservoir");
                            return;
                        }
                        // Placer la valeur (la data) dans 'myData'
                        var myData = p_data[line][p_order[key]]

                        // Création d'une nouvelle cellule 'td' avec sa DATA
                        var tdWithData = returnElementFunction(dataKey,myData,line,p_data[line],p_data);

                        // Ajouter la cellule <td> à la ligne en cours de création
                        newRow.appendChild(tdWithData);        
                    }// Oui, cette clé de DATA existe : if (dataKeys.indexOf(p_order[key])>-1)
                }//Boucle sur ORDER : for (var key = 0; key < p_order.length; key++)
                // Ajouter la ligne à thead
                thead.appendChild(newRow);            
            }//BOUCLE sur DATA : for (var line = 0; line < p_data.length; line++)        
            
            // Copier ce 'thead' vers 'table' pour en remplacer son 'thead'
            var yy = this.table.children.length    
            for (var i = 0; i < this.table.children.length; i++) {
                // Modifier/ajouter les ID
                if (this.table.children[i].nodeName == 'THEAD'){
                    //  remplacer son 'thead' par 'thead'
                    this.table.children[i].replaceWith(thead)
                    this.table.children[i].id = 'thead'+this.numeroTa;
                }
            }// for (var i = 0; i < this.table.children.length; i++)
        }// classTable2020...updateThead

        classTable2020.prototype.updateWithTagThead = function(p_tag) {//QC
            // Remplacer thead par une nouvelle balise thead fournie en p_
            // Je rappelle que JS utilise la REFERENCE d'une variable et non sa valeur. 
            // Ici, avec 'cloneNode' je copie le paramètre p_tag. Sans cette copie p_tag n'est pas
            // copié mais DEPLACé !! La référence de la variable est déplacée. 
            // Illustration du déplacement : 
            // exemple : 
            // table0.writeDataWithTagThead(thead2) //thead2 est déplacé vers la balise thead de l'instance table0
            // table1.writeDataWithTagThead(thead2) //thead2 est déplacé vers la balise thead de l'instance table1
            // Pour éviter ceci je duplique le paramètre avant son utilisation.
            // _endComment ~
            var copyTag = p_tag.cloneNode(true);
            if (copyTag){// Remplacer la balise thead par 'copyTag'
                // Rechercher dans 'this.table' la balise 'thead'
                for (var i = 0; i < this.table.children.length; i++) {
                    if (this.table.children[i].nodeName == 'THEAD'){
                        this.table.children[i].replaceWith(copyTag);
                        this.table.children[i].id = 'thead'+this.numeroTa;
                    }
                }
            }
            else{
                alert("classTable2020...writeDataWithTagThead : No tag ! ")
            }
        }// classTable2020...updateWithTagThead
        classTable2020.prototype.deleteThead = function() {//QC
            // Vider de son contenu 'thead' l'enfant de 'this.table'
            // _endComment ~
            for (var i = 0; i < this.table.children.length; i++) {
                if (this.table.children[i].nodeName == 'THEAD'){
                    this.table.children[i].innerHTML="";
                }
            }
        }// classTable2020...deleteThead
        
        classTable2020.prototype.hideOnScreenThead = function(p_trueFalse) {//QC
            var myThead = document.getElementById("thead"+this.numeroTa)
            //Ajouter la class 'd-none' ou "invisible" 
            // à l'objet avec ID = "table+numeroTa" 
            // appendChild() et removeChild() conviennent aussi
            // La classe bootstrap "invisible" supprime la balise mais PAS 
            // l'emplacement (espace/surface utilisée) à l'écran 
            // La classe 'd-none' supprime la balise et l'emplacement (espace/surface utilisée) à l'écran 
            // _endComment ~
            if (p_trueFalse == true){
                myThead.classList.add('d-none')
            }
            if (p_trueFalse == false){
                myThead.classList.remove('d-none')
            }
        }// classTable2020...hideOnScreenThead
        classTable2020.prototype.copyThead = function() {//QC
            // Fournir la balise 'Thead' qui est l'enfant de this.table
            // _endComment ~
            for (var i = 0; i < this.table.children.length; i++) {
                if (this.table.children[i].nodeName == 'THEAD'){
                    return this.table.children[i].cloneNode(true);
                }
            }
        }// classTable2020...copyThead
        // ============================= fin THEAD =========================
        // ============================= TBODY =============================
        classTable2020.prototype.retrieveNewTbody = function() {
            // Retourner une nouvelle balise 'tbody' 
            // _endComment ~
            var monTbody = document.createElement('tbody');
            monTbody.id = "tbody"+this.numeroTa
            return monTbody;
        }// classTable2020...retrieveNewTbody
        classTable2020.prototype.retrieveTbody = function() {//QC
            // Fournir la balise 'Tbody' qui est l'enfant de this.table
            // Attention ici c'est la référence et NON la valeur de 'tbody' qui est retourné
            // Ecrire sur la valeur retournée REMPLACE donc 'tbody'.
            // Pour utiliser 'tbody' comme une copie utiliser la méthode 'copyTbody'
            // _endComment ~
            for (var i = 0; i < this.table.children.length; i++) {
                if (this.table.children[i].nodeName == 'TBODY'){
                    return this.table.children[i];
                }
            }
        }// classTable2020...retrieveTbody

        classTable2020.prototype.updateTbody = function(p_order,p_data,p_structKeys={},p_dataKeys={}) {
            // Création d'un nouveau 'tbody' avec les datas fournies. 
            // Puis remplacement de l'enfant 'tbody' de this.table 
            // par ce nouveau tbody.
            // _endComment ~
            if(!(p_order)){
            // On vérifie la présence des datas indispensables p_order et p_data.
                alert("Il manque p_order")
            }
            if(!(p_data)){
                alert("Il manque p_data")
            }
            // Création des variables qui contiennent les clés de structure pour <tr> et <thead>
            var trStructKey ="tr";
                // On tente de passer une clé de structure pour <tr> ? 
                if(p_structKeys['tr']){// une clé de structure en remplacement de 'tr' est passée
                    // 'trStructKey' est modifié par la valeur en p_ pour créer la balise <tr>
                    trStructKey = p_structKeys['tr'];
                }
                if ( ! (keyIsPresent(trStructKey) ) ){
                    alert("classTable2020...updateTbody : ERROR trStructKey introuvable")
                    return;
                }

            var tbodyStructKey = "tbody";
                // On tente de passer une clé de structure pour <tbody> ? 
                if(p_structKeys['tbody']){// une clé de structure en remplacement de 'tbody' est passée
                    // 'tbodyStructKey' est modifié par la valeur en p_ pour créer la balise <tbody>
                    tbodyStructKey = p_structKeys['tbody'];
                }
                if ( ! (keyIsPresent(tbodyStructKey) ) ){
                    alert("classTable2020...updatetbody : ERROR tbodyKey introuvable")
                    return;
                }

            // Création de la balise 'tbody'
            var tbody = returnElementFunction(tbodyStructKey);        

            // Une boucle sur TOUTES les lignes de data dans les dict de la liste 'p_data'. 
            for (var line = 0; line < p_data.length; line++) {

                // Création de la liste 'dataKeys' des clés de DATA dans la ligne 'p_data' en cours
                var dataKeys =  Object.keys(p_data[line]); // A faire pour chaque LIGNE !!
            
                // Création d'une nouvelle ligne
                // var newRow = returnElementFunction(trStructKey,p_data);   
                var newRow = returnElementFunction(trStructKey);   
                newRow.id=this.table.id+"tbodyTr"+line;
                
                // Une boucle sur TOUTES les valeurs de la liste de l'ORDRE passée dans p_order. 
                // Elle est utilisée pour l'ORDRE d'affichage dans 'table'
                for (var key = 0; key < p_order.length; key++) {
                    // Il est possible de ne pas toujours fournir de la data pour toutes les clés dans p_data
                    // Il faut donc vérifier que la clé existe bien dans p_data avant de lancer la création d'une <td> pour elle.
                    // La clé (p_order[key]) est-elle présente dans la liste (p_data) des DATA  ? 

                    if (dataKeys.indexOf(p_order[key])>-1){// Oui, cette clé existe, créer une <td>

                        // Vérifier si une clé de data ALTERNATIVE est fournie dans 'p_dataKeys' pour la clé en cours p_order[key]
                        if (p_dataKeys[p_order[key]]){// Oui, une clé alternative est fournie
                            // On relève la nouvelle valeur de clé de DATA à utiliser dans la variable 'dataKey'
                            dataKey = p_dataKeys[p_order[key]]
                        }
                        // Aucune clé de data ALTERNATIVE n'est fournie dans 'p_dataKeys'
                        // Alors vérifier que la clé 'p_order[key]' existe bien dans la liste 'reservoir'
                        else if (keyIsPresent(p_order[key])){
                            // On relève la nouvelle valeur de clé de DATA à utiliser dans la variable 'dataKey'
                            var dataKey = p_order[key]; 
                        }
                        else {// Non, aucune clé alternative n'est fournie et la clé est INTROUVABLE dans 'reservoir'
                            // alors on se rabat sur la clé de data par défaut pour tbody : 
                            dataKey = 'defaultTbodyDataKey';
                        }
                        // Vérifier que la clé de data est présente dans 'reservoir' (OPTION)
                        if  (!(keyIsPresent(dataKey))) {
                            alert("classTable2020...updatetbody : dataKey missing in Reservoir");
                            return;
                        }
                        // Placer la valeur (la data) dans 'myData'
                        var myData = p_data[line][p_order[key]]

                        // Création d'une nouvelle cellule 'td' avec sa DATA
                        var tdWithData = returnElementFunction(dataKey,myData,line,p_data[line],p_data);

                        // Ajouter la cellule <td> à la ligne en cours de création
                        newRow.appendChild(tdWithData);        
                    }// Oui, cette clé de DATA existe : if (dataKeys.indexOf(p_order[key])>-1)
                }//Boucle sur ORDER : for (var key = 0; key < p_order.length; key++)
                // Ajouter la ligne à tbody
                tbody.appendChild(newRow);            
            }//BOUCLE sur DATA : for (var line = 0; line < p_data.length; line++)        
            
            // Copier ce 'thead' vers 'table' pour en remplacer son 'thead'
            var yy = this.table.children.length    
            for (var i = 0; i < this.table.children.length; i++) {
                // Modifier/ajouter les ID
                if (this.table.children[i].nodeName == 'TBODY'){
                    //  remplacer son 'tbody' par 'tbody'
                    this.table.children[i].replaceWith(tbody)
                    this.table.children[i].id = 'tbody'+this.numeroTa;
                }//if (this.table.children[i].nodeName == 'TBODY')
            }// for (var i = 0; i < this.table.children.length; i++)
        }//classTable2020...updateTbody

        classTable2020.prototype.updateWithTagTbody = function(p_tag) {//QC
            // Remplacer tbody par une nouvelle balise tbody
            // Je rappelle que JS utilise la REFERENCE d'une variable et non sa valeur. 
            // Ici, avec 'cloneNode' je copie le paramètre p_tag. Sans cette copie p_tag n'est pas
            // copié mais DEPLACé !! La référence de la variable est déplacée. 
            // Illustration du déplacement : 
            // exemple : 
            // table0.writeDataWithTagTbody(tbody2) //tbody2 est déplacé vers la balise tbody de l'instance table0
            // table1.writeDataWithTagTbody(tbody2) //tbody2 est déplacé vers la balise tbody de l'instance table1
            // Pour éviter ceci je duplique le paramètre avant son utilisation.
            // _endComment ~
            var copyTag = p_tag.cloneNode(true);
            if (copyTag){// Remplacer la balise tbody par 'copyTag'
                // Rechercher dans 'this.table' la balise 'tbody'
                for (var i = 0; i < this.table.children.length; i++) {
                    if (this.table.children[i].nodeName == 'TBODY'){
                        this.table.children[i].replaceWith(copyTag);
                        this.table.children[i].id = 'tbody'+this.numeroTa;
                    }
                }
            }
            else{
                alert("classTable2020...writeDataWithTagTbody : No tag ! ")
            }
        }
        
        classTable2020.prototype.deleteTbody = function() {//QC
            // Vider de son contenu 'tbody' l'enfant de 'this.table'
            // _endComment ~
            for (var i = 0; i < this.table.children.length; i++) {
                if (this.table.children[i].nodeName == 'TBODY'){
                    this.table.children[i].innerHTML="";
                }
            }
        }//classTable2020...deleteTbody
        
        classTable2020.prototype.hideOnScreenTbody = function(p_trueFalse) {//QC
            //SC type:affichage, Ajouter la class 'd-none' ou "invisible" 
            // à l'objet avec ID = "table+numeroTa" 
            // appendChild() et removeChild() conviennent aussi    
            // _endComment ~
            var myTbody = document.getElementById("tbody"+this.numeroTa)
            // La classe bootstrap "invisible" supprime la balise mais PAS 
            // l'emplacement (espace/surface utilisée) à l'écran 
            // La classe 'd-none' supprime la balise et l'emplacement (espace/surface utilisée) à l'écran 
            if (p_trueFalse == true){
                myTbody.classList.add('d-none')
            }
            if (p_trueFalse == false){
                myTbody.classList.remove('d-none')
            }
        }
        
        classTable2020.prototype.copyTbody = function() {//QC
            // Fournir la balise 'Tbody' qui est l'enfant de this.table
            // _endComment ~
            for (var i = 0; i < this.table.children.length; i++) {
                if (this.table.children[i].nodeName == 'TBODY'){
                    return this.table.children[i].cloneNode(true);
                }
            }
        }
        // ============================= fin Tbody ===================
        // ============================= TFOOT ===============================
        
        classTable2020.prototype.retrieveNewTfoot = function() {
            // Retourner une nouvelle balise 'tfoot' 
            // _endComment ~
            var monTfoot = document.createElement('tfoot');
            monTfoot.id = "tfoot"+this.numeroTa
            return monTfoot;
        }
        classTable2020.prototype.retrieveTfoot = function() {//QC
            //SC type:data, Fournir la balise 'Tfoot' qui est l'enfant de this.table
            // Attention ici c'est la référence et NON la valeur de 'tfoot' qui est retourné
            // Ecrire sur la valeur retournée REMPLACE donc 'tfoot'.
            // Pour utiliser 'tfoot' comme une copie utiliser la méthode 'copyTfoot'
            // _endComment ~
            for (var i = 0; i < this.table.children.length; i++) {
                if (this.table.children[i].nodeName == 'TFOOT'){
                    return this.table.children[i];
                }
            }
        }
        
        classTable2020.prototype.updateTfoot = function(p_order,p_data,p_structKeys={},p_dataKeys={}) {//QC
            //SC type:création, 
            // Création d'un nouveau 'tfoot' avec les datas fournies. 
            // Puis remplacement de l'enfant 'tfoot' de this.table 
            // par ce nouveau tfoot.
            // _endComment ~
            // On vérifie la présence des datas indispensables p_order et p_data.
            if(!(p_order)){
                alert("Il manque p_order")
            }
            if(!(p_data)){
                alert("Il manque p_data")
            }
            // Création des variables qui contiennent les clés de structure pour <tr> et <thead>
            var trStructKey ="tr";
                // On tente de passer une clé de structure pour <tr> ? 
                if(p_structKeys['tr']){// une clé de structure en remplacement de 'tr' est passée
                    // 'trStructKey' est modifié par la valeur en p_ pour créer la balise <tr>
                    trStructKey = p_structKeys['tr'];
                }
                if ( ! (keyIsPresent(trStructKey) ) ){
                    alert("classTable2020...updateTfoot : ERROR trStructKey introuvable")
                    return;
                }

            var tfootStructKey = "tfoot";
                // On tente de passer une clé de structure pour <tfoot> ? 
                if(p_structKeys['tfoot']){// une clé de structure en remplacement de 'tfoot' est passée
                    // 'tfootStructKey' est modifié par la valeur en p_ pour créer la balise <tfoot>
                    tfootStructKey = p_structKeys['tfoot'];
                }
                if ( ! (keyIsPresent(tfootStructKey) ) ){
                    alert("classTable2020...updatetfoot : ERROR tfootKey introuvable")
                    return;
                }

            // Création de la balise 'tfoot'
            var tfoot = returnElementFunction(tfootStructKey);        

            // Une boucle sur TOUTES les lignes de data. 
            for (var line = 0; line < p_data.length; line++) {

                // Création de la liste 'dataKeys' des clés de DATA dans la ligne 'p_data' en cours
                var dataKeys =  Object.keys(p_data[line]); // A faire pour chaque LIGNE !!
            
                // Création d'une nouvelle ligne
                // var newRow = returnElementFunction(trStructKey,p_data);   
                var newRow = returnElementFunction(trStructKey);   
                newRow.id=this.table.id+"tfootTr"+line;
                
                // Une boucle sur TOUTES les valeurs de la liste de l'ORDRE passée dans p_order. 
                // Elle est utilisée pour l'ORDRE d'affichage dans 'table'
                for (var key = 0; key < p_order.length; key++) {
                    // Il est possible de ne pas toujours fournir de la data pour toutes les clés dans p_data
                    // Il faut donc vérifier que la clé existe bien dans p_data avant de lancer la création d'une <td> pour elle.
                    // La clé (p_order[key]) est-elle présente dans la liste (p_data) des DATA  ? 

                    if (dataKeys.indexOf(p_order[key])>-1){// Oui, cette clé existe, créer une <td>


                        // Vérifier si une clé de data ALTERNATIVE est fournie dans 'p_dataKeys' pour la clé en cours p_order[key]
                        if (p_dataKeys[p_order[key]]){// Oui, une clé alternative est fournie
                            // On relève la nouvelle valeur de clé de DATA à utiliser dans la variable 'dataKey'
                            dataKey = p_dataKeys[p_order[key]]
                        }
                        // Aucune clé de data ALTERNATIVE n'est fournie dans 'p_dataKeys'
                        // Alors vérifier que la clé 'p_order[key]' existe bien dans la liste 'reservoir'
                        else if (keyIsPresent(p_order[key])){
                            // On relève la nouvelle valeur de clé de DATA à utiliser dans la variable 'dataKey'
                            var dataKey = p_order[key]; 
                        }
                        else {// Non, aucune clé alternative n'est fournie et la clé est INTROUVABLE dans 'reservoir'
                            // alors on se rabat sur la clé de data par défaut pour tfoot : 
                            dataKey = 'defaultTfootDataKey';
                        }
                        // Vérifier que la clé de data est présente dans 'reservoir' (OPTION)
                        if  (!(keyIsPresent(dataKey))) {
                            alert("classTable2020...updatetfoot : dataKey missing in Reservoir");
                            return;
                        }
                        // Placer la valeur (la data) dans 'myData'
                        var myData = p_data[line][p_order[key]]

                        // Création d'une nouvelle cellule 'td' avec sa DATA
                        var tdWithData = returnElementFunction(dataKey,myData,line,p_data[line],p_data);

                        // Ajouter la cellule <td> à la ligne en cours de création
                        newRow.appendChild(tdWithData);        
                    }// Oui, cette clé de DATA existe : if (dataKeys.indexOf(p_order[key])>-1)
                }//Boucle sur ORDER : for (var key = 0; key < p_order.length; key++)
                // Ajouter la ligne à tfoot
                tfoot.appendChild(newRow);            
            }//BOUCLE sur DATA : for (var line = 0; line < p_data.length; line++)        
            
            // Copier ce 'thead' vers 'table' pour en remplacer son 'thead'
            var yy = this.table.children.length    
            for (var i = 0; i < this.table.children.length; i++) {
                // Modifier/ajouter les ID
                if (this.table.children[i].nodeName == 'TFOOT'){
                    //  remplacer son 'tfoot' par 'tfoot'
                    this.table.children[i].replaceWith(tfoot)
                    this.table.children[i].id = 'tfoot'+this.numeroTa;
                }
            }// for (var i = 0; i < this.table.children.length; i++)
    }        
        //SC type:création, Remplacer tfoot par une nouvelle balise tfoot
        classTable2020.prototype.updateWithTagTfoot = function(p_tag) {//QC
            // Je rappelle que JS utilise la REFERENCE d'une variable et non sa valeur. 
            // Ici, avec 'cloneNode' je copie le paramètre p_tag. Sans cette copie p_tag n'est pas
            // copié mais DEPLACé !! La référence de la variable est déplacée. 
            // Illustration du déplacement : 
            // exemple : 
            // table0.writeDataWithTagTfoot(tfoot2) //tfoot2 est déplacé vers la balise tfoot de l'instance table0
            // table1.writeDataWithTagTfoot(tfoot2) //tfoot2 est déplacé vers la balise tfoot de l'instance table1
            // Pour éviter ceci je duplique le paramètre avant son utilisation.
            // _endComment ~
            var copyTag = p_tag.cloneNode(true);
            if (copyTag){// Remplacer la balise tfoot par 'copyTag'
                // Rechercher dans 'this.table' la balise 'tfoot'
                for (var i = 0; i < this.table.children.length; i++) {
                    if (this.table.children[i].nodeName == 'TFOOT'){
                        this.table.children[i].replaceWith(copyTag);
                        this.table.children[i].id = 'tfoot'+this.numeroTa;
                    }
                }
            }
            else{
                alert("classTable2020...writeDataWithTagTfoot : No tag ! ")
            }
        }
        classTable2020.prototype.deleteTfoot = function() {//QC
            // Vider de son contenu 'tfoot' l'enfant de 'this.table'
            // _endComment ~
            for (var i = 0; i < this.table.children.length; i++) {
                if (this.table.children[i].nodeName == 'TFOOT'){
                    this.table.children[i].innerHTML="";
                }
            }
        }
        
        classTable2020.prototype.hideOnScreenTfoot = function(p_trueFalse) {//QC
            //SC type:affichage,Cacher/Montrer : 
            // Ajouter la class 'd-none' ou "invisible" à l'objet avec ID = "table+numeroTa" 
            // appendChild() et removeChild() conviennent aussi    
            // _endComment ~
            var myTfoot = document.getElementById("tfoot"+this.numeroTa)
            // La classe bootstrap "invisible" supprime la balise mais PAS 
            // l'emplacement (espace/surface utilisée) à l'écran 
            // La classe 'd-none' supprime la balise et l'emplacement (espace/surface utilisée) à l'écran 
            if (p_trueFalse == true){
                myTfoot.classList.add('d-none')
            }
            if (p_trueFalse == false){
                myTfoot.classList.remove('d-none')
            }
        }
        
        classTable2020.prototype.copyTfoot = function() {//QC
            // Fournir la balise 'Tfoot' qui est l'enfant de this.table
            // _endComment ~
            for (var i = 0; i < this.table.children.length; i++) {
                if (this.table.children[i].nodeName == 'TFOOT'){
                    return this.table.children[i].cloneNode(true);
                }
            }
        }
        // ============================= fin Tfoot ============
        classTable2020.initialized = true;
    }// if ( typeof classTable2020.initialized == "undefined" ) 
}// function classTable2020(p_classInstance)
