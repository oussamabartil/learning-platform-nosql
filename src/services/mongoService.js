// Question: Pourquoi créer des services séparés ?
// Réponse: 

const { ObjectId } = require('mongodb');

// Fonctions utilitaires pour MongoDB
async function findOneById(collection, id) {
  // TODO: Implémenter une fonction générique de recherche par ID
  const database = await db.connectMongo();
  return await database.collection(collection).findOne({_id:new ObjectId(id)});
}

// Export des services
module.exports = {
  // TODO: Exporter les fonctions utilitaires
};