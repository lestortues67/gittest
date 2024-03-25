"""
Source : 
Date : 25/03/2024
Auteur : Christian Doriath
Dossier : 
Fichier : app.py
Description : Divers tests avec ajax, inspiration video youtube  
"Apprendre le JavaScript : Chapitre 17, Ajax"

Mot cles : ajax 
"""


import subprocess
import gitLibrary

from datetime import datetime, date
from werkzeug.local import Local, LocalManager
from flask import Flask, render_template, jsonify, request
from random import randint
import pdb
import uuid
app = Flask(__name__)

app.config["TEMPLATES_AUTO_RELOAD"] = True
app.config["DEBUG"] = True


#Bonjour lundi il est midi

@app.route('/')
def index():
    return render_template('index.html')

# 25/03/2024 à 9h45
# Sur github on utilise le repo "gittest" : 
# git@github.com:lestortues67/gittest.git
@app.route('/git_update', methods=['POST'])
def my_git_update():
    print("une requete POST arrive ici ...")

    # récupérer les datas POST 
    j = request.get_json()
    branchToPull = j['ref'][11:]
    print("Les datas POST  : ",j)
    print(" ")
    print(" ")
    print("La branche qui a fait GIT PUSH est : ")
    print(branchToPull)

    repo = gitLibrary.makeRepo('./')

    print("repo : ",repo)
    print('repo working DIR : ',repo.working_dir)

    brancheExiste = gitLibrary.localBranchIsPresent(repo, branchToPull)
    print("Cette branche existe sur LOCAL ? ")
    print(brancheExiste)
    print(" ")

    if not(brancheExiste):
        # La branche n'existe PAS en LOCAL il faut la créer
        gitLibrary.createBranch(repo, branchToPull)
        print("Création d'une NOUVELLE branche ")

    gitLibrary.pullABranch(repo, branchToPull)
    # re-load the app 

    # Commande Bash à exécuter
    #touch est un mot important pour que cela fonctionne 
    commande = "touch /var/www/gittest_eu_pythonanywhere_com_wsgi.py"

    # Exécution de la commande Bash
    resultat = subprocess.run(commande, shell=True, capture_output=True, text=True)

    # Affichage du résultat
    print("Infos sur re-load :", resultat.stdout)    
    return 'ok', 200 


@app.route('/papa01', methods=['GET'])
def my_papa01():
    #la fonction papa01()
    return render_template('papa01.html')




@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404


@app.errorhandler(500)
def internal_server_error(e):
    return render_template('500.html'), 500