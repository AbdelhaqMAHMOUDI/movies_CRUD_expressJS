# movies_CRUD_expressJS

## premier rendu :

### Lancer le projet :

Assurez-vous d'avoir Node.js installé sur votre machine.
Clonez le projet depuis GitHub en utilisant la commande suivante dans votre terminal :

#### git clone https://github.com/AbdelhaqMAHMOUDI/movies_CRUD_expressJS.git


Accédez au répertoire du projet en utilisant la commande *** cd movies_CRUD_expressJS ***.
Installez les dépendances du projet en exécutant la commande suivante :
 ****** npm install ********
Lancez le serveur en utilisant la commande suivante :

******** npm start *********


### les URLs des APIs à tester 
Récupération de tous les films : GET http://localhost:3000/films
Récupération d'un film par son ID : GET http://localhost:3000/films/:id
Création d'un film : POST http://localhost:3000/films
Modification d'un film : PUT http://localhost:3000/films/:id
Suppression d'un film : DELETE http://localhost:3000/films/:id
Validation impossible : GET http://localhost:3000/films/validationImpossible
#### recherche : 
GET http://localhost:3000/films/search?nom=exemple  etc 
pour une recherche par categorie :  GET http://localhost:3000/films/search?categorieNom=exempleDeCategorie


====== Liste des catégories auxquelles appartient un film spécifique : 
GET http://localhost:3000/films/:id/categories

## Deuxieme rendu : (j'ai utilisé le meme repo et la meme branche pour le premier et deuxieme rendu)

Récupération de toutes les categories : GET http://localhost:3000/categories
Récupération d'une categorie par son ID : GET http://localhost:3000/categories/:id
Création d'une categorie : POST http://localhost:3000/categories
Modification d'une categorie : PUT http://localhost:3000/categories/:id
Suppression d'une categorie : DELETE http://localhost:3000/categories/:id
 ======  Liste des films qui appartiennent à une catégorie spécifique : 
 GET http://localhost:3000/categories/:id/films

 ### pour la creation des tables (que pour la premiere synchronisation )
 dans <app.js> mettez "true" au lieu de "false" <sequelize.sync({ force: true })>, 
 une fois les tables crées remettez l'argument à "false".
