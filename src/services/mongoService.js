// Question: Pourquoi créer des services séparés ?
// Réponse: 

const { ObjectId } = require('mongodb');

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