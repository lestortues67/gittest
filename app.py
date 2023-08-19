# -*- coding: utf-8 -*-
import datetime
import string
from flask import Flask, request, render_template, session, redirect, url_for, flash, jsonify
from flask_bootstrap import Bootstrap
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, PasswordField, IntegerField, DateTimeField
from wtforms.validators import DataRequired,Regexp,IPAddress,Length,Required,InputRequired
from wtforms.validators import Email ,Regexp, EqualTo, NumberRange, NoneOf, URL, AnyOf 
#List of available validators : http://wtforms.simplecodes.com/docs/0.6.1/validators.html
from flask_sqlalchemy import SQLAlchemy
from random import choice
import locale
import time
import pdb
import json 
import os 
import uuid
import pytz
from socket import gethostname # déterminer le nom du serveur pour différencier 'localhost' de paw
from socket import getfqdn
from flask_migrate import Migrate

# locale.setlocale(locale.LC_TIME, 'fr_FR.UTF-8')
locale.setlocale(locale.LC_TIME, 'fr_FR') # sur Windows
    
app = Flask(__name__)


from packages.mysql import * 
from packages.machine import * 


if machine == 'local':
    print("machine sur LOCALHOST")
    chemin_notrecode = "static\\notrecode"
    username_mysql = connection_data['local']['username_mysql']
    password_mysql = connection_data['local']['password_mysql']
    hostname_mysql = connection_data['local']['hostname_mysql']
    databasename_mysql = connection_data['local']['databasename_mysql']

if machine == 'PAW':
    print("machine sur PAW") 
    chemin_notrecode = "codebase/static/notrecode"
    username_mysql = connection_data['paw']['username_mysql']
    password_mysql = connection_data['paw']['password_mysql']
    hostname_mysql = connection_data['paw']['hostname_mysql']
    databasename_mysql = connection_data['paw']['databasename_mysql']
    

# Le code important est dans 'Main' : 
# m = Main(app.config['UPLOAD_FOLDER'])
# m.run() 

print("username_mysql : ",username_mysql ,"\n")
print("password_mysql : ",password_mysql ,"\n")
print("hostname_mysql : ",hostname_mysql ,"\n")
print("databasename_mysql : ",databasename_mysql ,"\n")

app.debug = True
# set a 'SECRET_KEY' to enable the Flask session cookies
app.config['SECRET_KEY'] = 'replace with a SUPERsecretKEY '
# source : https://blog.pythonanywhere.com/121
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+mysqlconnector://{username}:{password}@{hostname}/{databasename}".format(
    username=username_mysql,
    password=password_mysql,
    hostname=hostname_mysql,
    databasename=databasename_mysql,
)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_RECORD_QUERIES'] = True
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

bootstrap = Bootstrap(app)
db = SQLAlchemy(app)
migrate = Migrate(app, db)

if not app.debug:
    file_handler = FileHandler('errorlog.txt')
    file_handler.setLevel(WARNING)
    app.logger.addHandler(file_handler)


def dbConnected():
    try:
        dd = Langage.query.filter_by().all()
        return {'tf':True,'data':'TOUT va bien'}
    except Exception as exception:
        print("Exception : ",exception)
        return {'tf':False,'data':exception}




def dateProvider():
    # Fournir immédiatement l'heure et la date de Paris en plusieurs formats : 
    # - en texte long dateLongueTexte. 
    # - un integer pour epoch
    # - un datetime 
    # Utiliser le fuseau horaire local (Paris)
    fuseau_horaire_local = pytz.timezone('Europe/Paris')

    # Obtenir l'heure locale dans le fuseau horaire défini
    heure_locale = datetime.datetime.now(fuseau_horaire_local)

    dateLongueTexte = heure_locale.strftime("%A, %d %B %Y %H:%M:%S")

    epoch = int(heure_locale.timestamp())
    
    return{'date':heure_locale,'texte':dateLongueTexte,'epoch':epoch}


def randomString(p_length):
    s = ""
    #créer un string de p_length lettres
    for x in range(p_length):
      s = s + choice(string.ascii_letters)
    return s


# class htmlCode (db.Model):
#     __tablename__ = 'htmlCode'
#     id = db.Column(db.Integer, primary_key=True, autoincrement=True)
#     codeText = db.Column(db.Text)
#     codeBlob = db.Column(db.LargeBinary)

#     def __init__(self, p_codeText):
#     # Ici on crée une instance de la classe 'htmlCode'
#     # 1 seul p_ est passé : le champ 'codeText' 
#     # le champ 'id' est généré automatiquement par MySQL
#         self.codeText = p_codeText
#     def create():
#     # Ici on ajoute à la table  1 seul enregistrement en créant une instance de classe
#     # La valeur de 'item' est un string aléatoire de 10 symboles. 
#         Myadd = htmlCode(randstr(10))
#         db.session.add(Myadd) 
#         db.session.commit()
#     def RetrieveId(p_id):
#         # ici on recherche un enregistrement par son champ 'id': 
#         return (htmlCode.query.filter_by(id=p_id).first())

class Velo (db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    roues = db.Column(db.Text)
    marque = db.Column(db.Text)
    prix = db.Column(db.Text)
    poids = db.Column(db.Text)
    def __init__(self, roues, marque, prix, poids): 
        self.roues = roues
        self.marque = marque
        self.prix = prix
        self.poids = poids
    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
    def create(self, roues, marque, prix, poids):
        Myadd = Velo(roues, marque, prix, poids)
        db.session.add(Myadd)
        db.session.commit() 
        # pour informer des champs des dates donnés par le code python 
        # et l'id donné par mysql je retourne l'enregistrement
        return {'tf':True,'data':Myadd.as_dict()}

# velo = Velo(marque="Peugeot", prix=500, poids=100)

class Balise (db.Model):
    __tablename__ = 'balise'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    dateCreation = db.Column(db.DateTime)
    dateLongueTexteCreation = db.Column(db.Text)
    epochCreation = db.Column(db.Integer)
    langage = db.Column(db.Text)
    supprime = db.Column(db.Integer)
    propriete = db.relationship("Propriete", backref="balise")
    nom = db.Column(db.Text)
    def __init__(self, p_nom):
        # Ici on crée une instance de la classe 'Langage'
        # le champ 'id' est généré automatiquement par MySQL

        try:
            self.nom=p_nom
            self.dateCreation= dateProvider()['date']
            self.dateLongueTexteCreation = dateProvider()['texte']
            self.epochCreation = dateProvider()['epoch']
            self.supprime = 0
            return None
        except Exception as exception:
            print("Exception : ",exception)
            return {'tf':False,'data':exception}

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
        
    def create(p_nom):
        # print("self.__table__.columns : ",self.__table__.columns)
        Myadd = Balise(p_nom)
        db.session.add(Myadd)
        db.session.commit() 
        # pour informer des champs des dates donnés par le code python 
        # et l'id donné par mysql je retourne l'enregistrement
        return {'tf':True,'data':Myadd.as_dict()}
    def delete(p_id):
        try:
            deleteIt = Balise.query.filter_by(id=p_id).first()
            db.session.delete(deleteIt)
            db.session.commit()
        except Exception as exception:
            print ("++++++++++++++++++++++++++++++++++++++++++++++++++++++ \n")
            print("Exception : ",exception)
            print ("\n")
            return {'tf':False,'data':exception}

class Propriete (db.Model):
    __tablename__ = 'propriete'
    # Cette table est un enfant de la classe 'Balise'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    dateCreation = db.Column(db.DateTime)
    dateLongueTexteCreation = db.Column(db.Text)
    epochCreation = db.Column(db.Integer)
    parentId = db.Column(db.Integer, db.ForeignKey("balise.id"), nullable=False)
    nom = db.Column(db.Text)
    supprime = db.Column(db.Integer)
    metad = db.relationship("Metadata", backref="propriete")
    def __init__(self, p_nom, p_parentId):
        try:
            self.parentId = p_parentId
            self.nom = p_nom
            self.dateCreation= dateProvider()['date']
            self.dateLongueTexteCreation = dateProvider()['texte']
            self.epochCreation = dateProvider()['epoch']
            self.supprime = 0
            return None
        except Exception as exception:
            print ("++++++++++++++++++++++++++++++++++++++++++++++++++++++\\r\\n")
            print("Exception : ",exception)
            print ("\n")
            return {'tf':False,'data':exception}
    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

    def create(p_nom, p_parentId):
        # Utiliser cette méthode permet une meilleure gestion des erreurs que d'utiliser
        # la méthode init sur la classe ainsi : 
        #       Dossier(p_parentId, p_dossier)
        #       db.session.add(Myadd)
        #       db.session.commit() 
        try:
            Myadd = Propriete(p_nom, p_parentId)
            db.session.add(Myadd)
            db.session.commit() 
            return {'tf':True,'data':Myadd.as_dict()}
        except Exception as exception:
            print ("++++++++++++++++++++++++++++++++++++++++++++++++++++++ \n")
            print("Exception : ",exception)
            print ("\n")
            return {'tf':False,'data':exception}
    def delete(p_id):
        try:
            deleteIt = Propriete.query.filter_by(id=p_id).first()
            db.session.delete(deleteIt)
            db.session.commit()
        except Exception as exception:
            print ("++++++++++++++++++++++++++++++++++++++++++++++++++++++ \n")
            print("Exception : ",exception)
            print ("\n")
            return {'tf':False,'data':exception}



class Metadata (db.Model):
    __tablename__ = 'metadata'
    # Cette table est un enfant de la classe 'Langage'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    dateCreation = db.Column(db.DateTime)
    dateLongueTexteCreation = db.Column(db.Text)
    epochCreation = db.Column(db.Integer)
    nom = db.Column(db.Text)
    parentId = db.Column(db.Integer, db.ForeignKey("propriete.id"), nullable=False)
    supprime = db.Column(db.Integer)

    def __init__(self, p_nom, p_parentId):
        
        try:
            self.nom = p_nom
            self.parentId = p_parentId
            self.dateCreation= dateProvider()['date']
            self.dateLongueTexteCreation = dateProvider()['texte']
            self.epochCreation = dateProvider()['epoch']
            self.supprime = 0
            return None
        except Exception as exception:
            print("\\nException : ",exception,"\\n")
            return {'tf':False,'data':exception}
    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

    def create( p_nom, p_parentId):
        # Utiliser cette méthode permet une meilleure gestion des erreurs que d'utiliser
        # la méthode init sur la classe ainsi : 
        #       Dossier(p_parentId, p_dossier)
        #       db.session.add(Myadd)
        #       db.session.commit() 
        try:
            Myadd = Metadata(p_nom, p_parentId)
            db.session.add(Myadd)
            db.session.commit() 
            return {'tf':True,'data':Myadd.as_dict()}
        except Exception as exception:
            print ("++++++++++++++++++++++++++++++++++++++++++++++++++++++ \n")
            print("Exception : ",exception)
            print ("\n")
            return {'tf':False,'data':exception}
    def delete(p_id):
        try:
            deleteIt = Metadata.query.filter_by(id=p_id).first()
            db.session.delete(deleteIt)
            db.session.commit()
        except Exception as exception:
            print ("++++++++++++++++++++++++++++++++++++++++++++++++++++++ \n")
            print("Exception : ",exception)
            print ("\n")
            return {'tf':False,'data':exception}


#Créer toutes les tables 
db.create_all() 


def killAll():
    #Créer toutes les tables 
    db.drop_all() 





@app.route('/', methods=['GET', 'POST'])
def myindex():
    return render_template('index.html') 


# 17/05/2023
@app.route("/notrecodeAll")
def mynotrecodeAll():
    dd = Notrecode.query.filter_by(supprime=0).all()
    # parcourir les instances pour en créer une liste de dict
    ll = []
    for data in dd:
        ll.append(data.as_dict())
    return jsonify(ll)


# 27/04/2023
@app.route("/createLangage")
def mycreateLangage():
    s = randomString(10)
    l = Langage(s)
    print("dir(l) : ",dir(l))
    db.session.add(l)
    db.session.commit()
    return (s+'<p> OK, a été ajouté</p>')

#18.05.2023
@app.route('/page1', methods=['GET', 'POST'])
def mypage1():
    # e = Notrecode.query.filter_by(supprime=0).limit(10).all()
    e = Notrecode.query.filter_by(supprime=0).order_by(Notrecode.epochCreation.desc()).limit(10).all()
    print("Voici les ",str(len(e))," lignes : ",e)
    datatodisplay = []
    for data in e:
        datatodisplay.append(data.as_dict())
    return render_template('page1.html',datatodisplay=datatodisplay) 

#18.05.2023
@app.route('/page2', methods=['GET', 'POST'])
def mypage2():
    # récupérer les datas passées dans la barre d'adresse page2?langage=1&dossier=1"
    langage = request.args.get('langage')
    dossier = request.args.get('dossier')
    sousdossier = request.args.get('sousdossier') 
    fileName = request.args.get('fileName')
    id = request.args.get('id')
    print("langage : ",langage)
    print("dossier : ",dossier)
    print("sousdossier : ",sousdossier)
    print("id : ",id,"\n")
    print("fileName : ",fileName,"\n")

    # rechercher le titre
    ti = Notrecode.query.filter_by(id=id).first()
    print("Voici le titre : ",ti.titre)

    # créer l'array des <option> pour <select> 'langage'
    dd = Langage.query.filter_by().all()
    # parcourir les instances pour en créer une liste de dict
    arrLangage = []
    for data in dd:
        arrLangage.append(data.as_dict())

    # créer l'array des <option> pour <select> 'dossier'
    dd = Dossier.query.filter_by(parentId=langage).all()
    # parcourir les instances pour en créer une liste de dict
    arrDossier = [] 
    for data in dd:
        arrDossier.append(data.as_dict())
    print("arrDossier : ",arrDossier)

    # créer l'array des <option> pour <select> 'sousdossier'
    sd = Sousdossier.query.filter_by(parentId=dossier).all()

    print("Sousdossier.query.filter_by(parentId=dossier).all() : ",sd)



    # parcourir les instances pour en créer une liste de dict
    arrSousdossier = []
    for data in sd:
        arrSousdossier.append(data.as_dict())


    chemin_complet = os.path.join(chemin_notrecode, fileName)
    # placer le fichier html dans une variable 
    # Ouvrir un fichier en mode lecture
    print("chemin complet : ",chemin_complet)
    with open(chemin_complet, 'r') as fichier:
        file = fichier.read()
    print("Voici le contenue du fichier : \n")
    print(file)
    return render_template('page2.html', id=id, fileName=fileName, titre=ti.titre, file=file, arrLangage=arrLangage, arrDossier=arrDossier, arrSousdossier=arrSousdossier,
        langage=langage, dossier=dossier, sousdossier=sousdossier) 


# 19/05/2023
# créer un fichier artificiel de code dans le dossier "static/notrecode"
# et dans la table mySQL 'Notrecode'
@app.route("/ecrireNotrecode")
def myecrire():
    nomFichier = str(uuid.uuid4())+'.html'
    chemin_complet = os.path.join("static/notrecode", nomFichier)
    with open(chemin_complet, 'w') as fichier:
        fichier.write("<p>Je suis du code HTML.</p>")
    s = randomString(10)
    l = Notrecode(s,1,1,1,nomFichier)
    db.session.add(l)
    db.session.commit()
    st = '<p>écriture OK '+nomFichier+'  </p>'
    return (st)



# 19/05/2023
@app.route("/getNotreCodePapa") 
def mygetNotreCodePapa():
    # Interroger la table 'notrecode' pour obtenir en retour
    # ce type de structure de données : 
    # [ {date: '18/05/2023', 'titre' : 'le string', id = 4} ]

    langage = request.args.get('langage')
    dossier = request.args.get('dossier')
    sousdossier = request.args.get('sousdossier')
    print("getNotreCodePapa langage : ",langage)
    print("getNotreCodePapa dossier : ",dossier)
    print("getNotreCodePapa sousdossier : ",sousdossier,"\n")

    # Les 3 p_ sont vides 
    if (langage  == '' and dossier == '' and sousdossier == ''):
        print("les 3 sont vides")
        e = Notrecode.query.filter_by().limit(10).all()

    # Les 3 sont NON vides 
    elif ((not dossier == '') and (not dossier == '') and (not sousdossier == '') ):
        print("les 3 sont NON vides")
        e = Notrecode.query.filter_by(langage=langage, dossier=dossier, sousdossier=sousdossier).all()

    # dossier et sousdossier sont vides 
    elif (dossier == '' and sousdossier == ''):
        print("dossier et sousdossier sont vides")
        e = Notrecode.query.filter_by(langage=langage).all()

    # dossier est NON vide et sousdossier est vide
    elif ( (not dossier == '') and sousdossier == ''):
        print("dossier est NON vide et sousdossier est vide")
        e = Notrecode.query.filter_by(langage=langage, dossier=dossier).all()

    

    arr = []
    for data in e:
        arr.append(data.as_dict())
    return jsonify(arr)


# 20/05/2023
@app.route("/createDossier")
def mycreateDossier():
    langageId = request.args.get('langageId')
    dossier = request.args.get('dossier')
    print("langageId : ",langageId)
    print("dossier : ",dossier,"\n")

    #     def __init__(self, p_parentId, p_dossier):
    d = Dossier(langageId, dossier)

    db.session.add(d)
    db.session.commit()
    return ('<p> OK, a été ajouté : </p>'+dossier)


# 26/05/2023
@app.route("/createSousdossier")
def mycreateSousdossier():
    dossierId = request.args.get('dossierId')
    sousdossier = request.args.get('sousdossier')
    # def __init__(self, p_parentId, p_sousdossier):
    d = Sousdossier(dossierId, sousdossier)
    db.session.add(d)
    db.session.commit()
    return ('<p> Le sous-dossier a été ajouté : </p>'+sousdossier)







# 20/05/2023
@app.route("/saisirLangage", methods=['GET', 'POST'])
def mysaisirLangage():
    if request.method == 'POST':
        l = request.form['langage']
        print("langage : ",l)
        # Création d'une ligne dans la table 'langage'
        l2 = Langage(l)
        db.session.add(l2)
        db.session.commit()
        flash('POST request : un nouveau langage est saisi')
        return redirect(url_for('myindex'))
    else:
        flash('GET request')
        return render_template('saisirLangage.html')

# 20/05/2023
@app.route("/saisirDossier", methods=['GET', 'POST'])
def mysaisirDossier():
    if request.method == 'POST':
        # lire la valeur dans le select 'langage'
        l = request.form['langage']
        d = request.form['dossier']
        print("dossier : ",d)
        # Création d'une ligne dans la table 'dossier'
        #     def __init__(self, p_parentId, p_dossier):
        
        db.session.add(l2)
        db.session.commit()
        flash('POST request : un nouveau langage est saisi')
        return redirect(url_for('myindex'))
    else:
        flash('GET request')
        return render_template('saisirLangage.html')


# 20/05/2023
@app.route("/langageAll")
def mylangageAll():
    # retourner toutes les lignes de la table 'langage'
    dd = Langage.query.filter_by().all()
    # parcourir les instances pour en créer une liste de dict
    ll = []
    for data in dd:
        ll.append(data.as_dict())
    return jsonify(ll)

# 20/05/2023
@app.route("/dossierWithParentId")
def mydossierWithParentId():
    # retourner toutes les lignes de la table 'dossier' 
    # pour un langage donné dans request.args.get('langage')
    langage = request.args.get('langage')
    dd = Dossier.query.filter_by(parentId=langage).all()
    # parcourir les instances pour en créer une liste de dict
    ll = []
    for data in dd:
        ll.append(data.as_dict())
    print("1er dossier : ",ll[0])
    return jsonify(ll)

# 20/05/2023
@app.route("/dossierWithParentIdAjouter") # sousdossierWithParentIdAjouter
def mydossierWithParentIdAjouter():
    # retourner toutes les lignes de la table 'dossier' 
    # pour un langage donné dans request.args.get('langage')
    langage = request.args.get('langage')
    dd = Dossier.query.filter_by(parentId=langage).all()
    # parcourir les instances pour en créer une liste de dict
    print("Dans /dossierWithParentIdAjouter résultat de la requête : \n")

    ll = []
    for data in dd:
        ll.append(data.as_dict())
    ll.append({'id': 999, 
        'dateCreation': None, 
        'dateLongueTexteCreation': None, 
        'epochCreation': None, 
        'parentId': langage, 
        'dossier': 'Ajouter un dossier', 
        'supprime': 0, 
        'uuid': None})
    print(ll)
    print(" \n")
    print("1er dossier : ",ll[0])
    return jsonify(ll)


# 20/05/2023
@app.route("/sousdossierAll")
def mysousdossierAll():
    # retourner toutes les lignes de la table 'sousdossier' 
    # pour un dossier donné dans request.args.get('dossier')
    dossier = request.args.get('dossier')
    dd = Sousdossier.query.filter_by(parentId=dossier).all()
    # parcourir les instances pour en créer une liste de dict
    ll = []
    for data in dd:
        ll.append(data.as_dict())
    return jsonify(ll)


# 27/04/2023
@app.route("/createLangageName/<p_langage>")
def mycreateLangageNew(p_langage):
    l = Langage(p_langage)
    db.session.add(l)
    db.session.commit()
    return ('<p> OK, a été ajouté : </p>'+p_langage)



# 26/05/2023
@app.route("/createDossierNew/<p_langageId>")
def mycreateDossierNew(p_langageId):
    #     def __init__(self, p_parentId, p_dossier):
    s = randomString(10)
    d = Dossier(p_langageId, s)

    db.session.add(d)
    db.session.commit()
    return (s+'<p> Le dossier a été ajouté</p>')

# 26/05/2023
@app.route("/createSousdossierNew/<p_dossierId>")
def mycreateSousdossierNew(p_dossierId):
    #     def __init__(self, p_parentId, p_dossier):
    s = randomString(10)
    d = Sousdossier(p_dossierId, s)
    db.session.add(d)
    db.session.commit()
    return (s+'<p> Le sous-dossier a été ajouté</p>')

# 26/05/2023
@app.route("/sousdossierWithParentId")
def mysousdossierWithParentId():
    # retourner toutes les lignes de la table 'sousdossier' 
    # pour un dossier donné dans request.args.get('dossier')
    sousdossier = request.args.get('sousdossier')
    print("\n")
    print("Voici p_ request.args.get('sousdossier') : ",request.args.get('sousdossier'))
    dd = Sousdossier.query.filter_by(parentId=sousdossier).all()
    # parcourir les instances pour en créer une liste de dict
    ll = []
    for data in dd:
        ll.append(data.as_dict())
    return jsonify(ll)

# 01/08/2023
@app.route("/sousdossierWithParentIdAjouter")
def mysousdossierWithParentIdAjouter():
    # retourner toutes les lignes de la table 'sousdossier' 
    # pour un dossier donné dans request.args.get('dossier')
    # et ajouter un option 'AJOUTER UN SOUS-DOSSIER'
    dossier = request.args.get('dossier')
    print("\n")
    print("Voici p_ request.args.get('dossier') : ",request.args.get('dossier'))
    dd = Sousdossier.query.filter_by(parentId=dossier).all()
    # parcourir les instances pour en créer une liste de dict
    ll = []
    for data in dd:
        ll.append(data.as_dict())
    ll.append({'id': 999, 
        'dateCreation': None, 
        'dateLongueTexteCreation': None, 
        'epochCreation': None, 
        'parentId': dossier, 
        'sousdossier': 'Ajouter un sous-dossier', 
        'supprime': 0, 
        'uuid': None})
    print("Les sous-dossier : ",ll)
    return jsonify(ll)

# 27/05/2023
# Ici dans p_id on fournit l'ID d'un enregistrement de la table mySQL 'Notrecode'
# qu'il faut renvoyer
@app.route('/givedata/<p_id>', methods=['GET'])
def mygivedata(p_id):
    dd = Notrecode.query.filter_by(id=p_id).first()
    if (dd == None):
        # p_id n'est pas trouvé...
        print("Aucun enregistrement avec cet id : ",p_id)
        return jsonify({'fichier':'0'})
    else:
        return jsonify(dd.as_dict())


# 27/05/2023
# Retourner 10 enregistrements de la table mySQL 'Notrecode'
@app.route("/getNotreCode10") 
def mygetNotreCode10():
    # Interroger la table 'notrecode' pour obtenir en retour
    # ce type de structure de données : 
    # [ {date: '18/05/2023', 'titre' : 'le string', id = 4} ]

    e = Notrecode.query.filter_by().limit(10).all()

    arr = []
    for data in e:
        arr.append(data.as_dict())
    return jsonify(arr)


# 28/05/2023
# A partir de l'ID retourner les datas à afficher : 
@app.route("/getFileData") 
def mygetFileData():
    id = request.args.get('id')
    fileName = request.args.get('fileName')
    print("id : ",id,"\n")
    print("fileName : ",fileName,"\n")

    dd = Notrecode.query.filter_by(id=id).first()

    if (dd == None):
        # p_id n'est pas trouvé...
        print("Aucun enregistrement avec cet id : ",p_id)
        return jsonify({'file':'0'})
    else:
        # Extraire et mettre dans une liste les datas pour
        # 3 <select>, titre et code HTML
        d = dd.as_dict()
        print("Voici l'enregistrement : ",d)
        chemin_complet = os.path.join("static/notrecode", fileName)
        # placer le fichier html dans une variable 

        # Ouvrir un fichier en mode lecture
        try:
            with open(chemin_complet, 'r') as fichier:
                file = fichier.read()
            print("Voici le contenu du fichier : \n")
            print(file)
            d['fileData']=file
            return jsonify(d)
        except Exception as e:
            print("Le fichier n'existe pas... "+ str(e))
            return ""
        return jsonify(dd.as_dict())


# 29/05/2023
# enregistrer un fichier dans la table mySQL 'Notrecode' 
# à partir du contenu de l'éditeur tinyMCE sur page 2 
# var url = "/newNotrecode?"+"titre="+p_titre+"+"langage="+p_langage+"&dossier="+p_dossier+"&sousdossier="+p_sousdossier+"&nomFichier:"+p_file
@app.route("/newNotrecode")
def mynewnotrecode():
    langage = request.args.get('langage')
    dossier = request.args.get('dossier')
    sousdossier = request.args.get('sousdossier')
    file = request.args.get('file')
    titre = request.args.get('titre')
    print("langage",langage)
    print("titre",titre)
    print("file",file)
    print("dossier",dossier)
    print("sousdossier",sousdossier)


    nomFichier = str(uuid.uuid4())+'.html'
    chemin_complet = os.path.join("static/notrecode", nomFichier)
    with open(chemin_complet, 'w') as fichier:
        fichier.write(file)
    # def __init__(self, p_titre, p_langage, p_dossier, p_sousdossier,p_fichier):
    l = Notrecode(titre,langage,dossier, sousdossier,nomFichier)
    db.session.add(l)
    db.session.commit()
    st = '<p>écriture OK '+nomFichier+'  </p>'
    return (st)


# 29/05/2023
# enregistrer un fichier dans la table mySQL 'Notrecode' 
# à partir du contenu de l'éditeur tinyMCE sur page 2 
# var url = "/newNotrecode?"+"titre="+p_titre+"+"langage="+p_langage+"&dossier="+p_dossier+"&sousdossier="+p_sousdossier+"&nomFichier:"+p_file
@app.route("/newNotrecode2", methods=['POST'])
def mynewnotrecode2():
    r = request.get_json()
    print("Le json : ",r)
    print("Le titre : ",r['titre'])
    print("Le langage : ",r['langage'])
    print("Le dossier : ",r['dossier'])
    print("Le sousdossier : ",r['sousdossier'])
    print("Le fichier : ",r['file'])


    nomFichier = str(uuid.uuid4())+'.html'
    chemin_complet = os.path.join("static/notrecode", nomFichier)

    fichier = open(chemin_complet, "x")
    fichier.write(r['file'])
    fichier.close()

    # with open(chemin_complet, 'w') as fichier:
    #     fichier.write(r['file'])
    # def __init__(self, p_titre, p_langage, p_dossier, p_sousdossier,p_fichier):
    l = Notrecode(r['titre'],r['langage'],r['dossier'], r['sousdossier'],nomFichier)
    db.session.add(l)
    db.session.commit()
    st = '<p>écriture OK '+nomFichier+'  </p>'
    return (st)

#29.05.2023
@app.route('/newpage2', methods=['GET', 'POST'])
def mynewpage2():
    # créer une nouvelle page avec le btn 'créer' 
    return render_template('newpage2.html') 

#29.05.2023 : tester, après des bugs l'écriture sur paw vers un nouveau fichier
@app.route('/newfile', methods=['GET', 'POST'])
def mynewfile():
    # writing
    # Sur serveur PAW : app.config['cheminServeurPaw']
    if app.config['cheminServeur']=="":
        nomFichier = 'static/notrecode/'+str(uuid.uuid4())+'.html'
    else:
        nomFichier = '/home/lestortues67/codebase/static/notrecode/'+str(uuid.uuid4())+'.html'
    with open(nomFichier, 'x') as f:
        f.write(nomFichier)
    return jsonify({'nomFichier':nomFichier})

# 01/08/2023
@app.route("/addDossier")
def myaddDossier():
    # Ajouter un dossier à la table 'Dossier'
    # pour un dossier donné dans request.args.get('dossier')
    nomDossier = request.args.get('dossier')
    parentIdDossier = request.args.get('parentIdDossier')
    print("\n ")

    try : 
        record = Dossier.create(0,int(parentIdDossier), nomDossier )
        return record
    except Exception as exception:
        print("Exception : ",exception)
        return {'tf':False,'data':'Erreur : Dossier NON ajouté à sa table'}

# 01/08/2023
@app.route("/addSousDossier")
def myaddSousDossier():
    # Ajouter un sous-dossier à la table 'Dossier'
    # pour un dossier donné dans request.args.get('nomSousdossier')
    nomSousDossier = request.args.get('nomSousDossier')
    parentIdSousDossier = request.args.get('parentIdSousDossier')
    print("\n ")

    try : 
        r = Sousdossier.create(0,int(parentIdSousDossier), nomSousDossier )
        if (r['tf']):
            return {'tf':True,'data':'Sous-dossier ajouté à sa table'}
        else:
            return {'tf':False,'data':'Sous-dossier NON ajouté à sa table'}
    except Exception as exception:
        print("Exception : ",exception)
        return {'tf':False,'data':'Erreur : Sous-dossier NON ajouté à sa table : '}

# 02/08/2023
@app.route("/dbConnected")
def mydbConnected():
    return jsonify(dbConnected())

@app.route("/getDateData")
def mygetDateData():
    # Retourner la date pour les tests en JS de fetch()
    return jsonify(dateProvider())

# 06/08/2023
@app.route("/getDateData100")
def mygetDateData100():
    # Apres un délai de 100ms retourner la date pour les tests en JS de fetch()
    time.sleep(0.1)
    return jsonify(dateProvider())



#16/08/2023
@app.route('/json2htmlPage01', methods=['GET', 'POST'])
def myjson2htmlPage01():
    # une page html qui reçoit des datas au format json qui décrivent des 
    # balises à placer sur la page
    balButton01 = {'balise' : 'button',
    'id':'btn01',
    'class':['btn','btn-primary'],
    'dataset':[{'ref':123},{'ligne':456}],
    'innerHTML':'Ouvrir',
    'events':[{'onclick':'eventManager'},{'onmouseover':'eventManager'} ],
    'where':'divc0l0',
    'prototype':"HTMLButtonElement",
    'prototypeCodes':[".prototype.clickItA = function(){console.log('je suis le prototype A');}",
    ".prototype.clickItB = function(){console.log('je suis le prototype B');}"]
    }
    return render_template('json2htmlPage01.html', balButton01=balButton01 ) 

#16/08/2023
@app.route('/json2htmlTest01', methods=['GET', 'POST'])
def myjson2htmlTest01():
    # renvoie un exemple de balise <button> en json
    balButton01 = {'balise' : 'button',
    'id':'btn01',
    'class':['btn','btn-primary'],
    'dataset':[{'ref':123},{'ligne':456}],
    'innerHTML':'Ouvrir',
    'events':[{'onclick':'eventManager'},{'onmouseover':'eventManager'} ],
    'where':'divc0l0',
    'prototype':"HTMLButtonElement",
    'prototypeCodes':[".prototype.clickItA = function(){console.log('je suis le prototype A');}",
    ".prototype.clickItB = function(){console.log('je suis le prototype B');}"]
    }
    return jsonify(balButton01) 




    

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

@app.errorhandler(500)
def internal_server_error(e):
    return render_template('500.html'), 500
