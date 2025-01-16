# Learning Platform NoSQL

## Description

Ce projet est une API backend pour une plateforme d'apprentissage en ligne, développée en utilisant Node.js, Express, MongoDB et Redis. Il suit les bonnes pratiques de développement pour offrir une structure de code modulaire, performante et facile à maintenir.

---
## Installation et Lancement

### Prérequis

- **Node.js** : Version 14 ou supérieure
- **MongoDB** : Pour le stockage des données
- **Redis** : Pour la gestion du cache

### Étapes d'installation

1. **Clonez le dépôt** :

   ```bash
   git clone https://github.com/oussamabartil/learning-platform-nosql.git
   cd learning-platform-nosql

2. **Installez les dépendances** :
   ```bash
   npm install
3. **Configurez les variables d'environnement** :
Créez un fichier .env à la racine du projet avec les paramètres suivants :
      ```bash
      MONGODB_URI=mongodb://localhost:27017
      MONGODB_DB_NAME=learning_platform
      REDIS_URI=redis://localhost:6379
      PORT=3000
4.  **Démarrez MongoDB et Redis** :
      ```bash
      sudo systemctl start mongod
      sudo systemctl start redis-server

5. **Lancez l'application** :
   ```bash
   npm start

## Structure du Projet
Voici la structure du code avec une description de chaque dossier et fichier :
      ```bash
      ├── src
      │   ├── config
      │   │   ├── db.js # Connexions aux bases de données
      │   │   ├── env.js # Validation des variables d'environnement
      │   ├── controllers
      │   │   ├── courseController.js # Logique métier des cours
      │   │   ├── studentController.js # Logique métier des étudiants
      │   ├── routes
      │   │   ├── courseRoutes.js # Routes liées aux cours
      │   │   ├── studentRoutes.js # Routes liées aux étudiants
      │   ├── services
      │   │   ├── mongoService.js # Services MongoDB
      │   │   ├── redisService.js # Services Redis
      │   ├── app.js # Point d'entrée de l'application
      ├── .env # Fichier de configuration des variables d'environnement
      ├── .gitignore # Fichiers/dossiers à ignorer par Git
      ├── package.json # Dépendances et scripts du projet
      └── README.md # Documentation du projet



## Choix Techniques

- **Node.js et Express** : Création d'une API RESTful performante.
- **MongoDB** : Gestion des données non relationnelles.
- **Redis** : Cache pour améliorer les performances.
- **dotenv** : Gestion des variables d'environnement.

## Réponses aux Questions du Projet

### Pourquoi utiliser des variables d'environnement ?
Pour séparer la configuration du code et éviter de compromettre des informations sensibles.

### Comment gérer les connexions aux bases de données ?
Les connexions sont centralisées dans des modules distincts pour améliorer la modularité et la réutilisation.

### Pourquoi séparer contrôleurs, routes et services ?
Cette séparation permet un code plus organisé, maintenable et facile à tester.

### Comment gérer efficacement le cache avec Redis ?
En utilisant des **TTL (Time-To-Live)**, des stratégies de cache adaptées (cache-aside, write-through) et une surveillance régulière des performances.

### Quelles informations ne jamais commiter ?
Clés API, mots de passe, jetons et toutes les données sensibles.

## Fonctionnalités principales 

Ajoutez ici des captures d’écran des fonctionnalités principales, par exemple :
# 1. Ajouter un étudiant
![Ajouter un étudiant](images/ajouterEtudiant.png)

---

# 2. Créer un cours
![Créer un cours](images/creationCours.png)

---

# 3. Modifier les informations d'un étudiant
![Modifier un étudiant](images/modifierEtudiant.png)

---

# 4. Récupérer les statistiques des cours
![Récupérer les statistiques](images/recuperCourseStats.png)

---

# 5. Récupérer les informations d'un cours par ID
![Récupérer un cours](images/recupererCoursById.png)

---

# 6. Récupérer les informations d'un étudiant par ID
![Récupérer un étudiant par ID](images/recupererEtudiantById.png)

---

# 7. Récupérer tous les étudiants
![Récupérer tous les étudiants](images/recupererToutLesEtudiants.png)

---

# 8. Supprimer un étudiant
![Supprimer un étudiant](images/supprimerEtudiant.png)

## Ressources

- [Node.js Documentation](https://nodejs.org/en/docs/)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Documentation](https://www.mongodb.com/docs/)
- [Redis Documentation](https://redis.io/documentation)

## Auteur

Projet développé par **Oussama BARTIL** dans le cadre du projet de fin de module **NoSQL**.


### Réponse des questions des commentaires
##### Question : #####
Pourquoi créer un module séparé pour les connexions aux bases de données ?
### Réponse : ###
Afin d'isoler la logique de connexion et aussi de partager la meme connection dans toute application (facilite aussi reutilisabilite et mantenabilite de code )

##### Question : #####
 Comment gérer proprement la fermeture des connexions ?
### Réponse : ### 
Avant arret de application il faut qu'uo appel la methodes de fermeture de connection comme mongoClient.close(),redisClient.close()... 

