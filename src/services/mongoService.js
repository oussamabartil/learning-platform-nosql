// Question: Pourquoi créer des services séparés ?
// Réponse: Pour regrouper la logique d’accès aux données (CRUD) ou traitement complexe 
//          dans un endroit central, réutilisable par plusieurs contrôleurs.


const { ObjectId } = require('mongodb');
const db = require('../config/db');

// Fonctions utilitaires pour MongoDB
async function findOneById(collection, id) {
  // TODO: Implémenter une fonction générique de recherche par ID
  const database = await db.connectMongo();
  return await database.collection(collection).findOne({_id:new ObjectId(id)});
}

//ajouter insertion 
async function insertOne(collection, data) {
  const database = await db.connectMongo();
  return await database.collection(collection).insertOne(data);
}

//Statistiques 
async function countDocuments(collectionName, query = {}) {
  const database = await db.connectMongo();
  return await database.collection(collectionName).countDocuments(query);
}
// Export des services
module.exports = {
  // TODO: Exporter les fonctions utilitaires
  findOneById,
  insertOne,
  countDocuments
};