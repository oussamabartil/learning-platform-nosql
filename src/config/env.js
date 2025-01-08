// Question: Pourquoi est-il important de valider les variables d'environnement au démarrage ?
// Réponse : pour detecter les erreurs de configuration au moment de demarage et eviter les comportomants inattendus en production
// Question: Que se passe-t-il si une variable requise est manquante ?
// Réponse : L'application ne pourra pas fonctionner correctement, elle va etre arreter ou application va declencher un erreur.

const dotenv = require('dotenv');
dotenv.config();

const requiredEnvVars = [
  'MONGODB_URI',
  'MONGODB_DB_NAME',
  'REDIS_URI'
];

// Validation des variables d'environnement
function validateEnv() {
  // TODO: Implémenter la validation
  // Si une variable manque, lever une erreur explicative
  requiredEnvVars.forEach((varName) => {
  if(!process.env[varName]){
    throw new Error(`Manque d'une important variable d'environnement ${varName}`)
  }
});
}

//maintenant j'appel la methode validateEnv afin de valide des variables d'environnement
validateEnv();  

module.exports = {
  mongodb: {
    uri: process.env.MONGODB_URI,
    dbName: process.env.MONGODB_DB_NAME
  },
  redis: {
    uri: process.env.REDIS_URI
  },
  port: process.env.PORT || 3000
};