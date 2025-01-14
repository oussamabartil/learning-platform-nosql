// Question : Comment gérer efficacement le cache avec Redis ?
// Réponse :En définissant un TTL (Time To Live) approprié et en invalidant ou mettant à jour 
//           les clés quand les données changent.
// Question: Quelles sont les bonnes pratiques pour les clés Redis ?
// Réponse : Utiliser un préfixe clair (ex : "course:", "user:") et un identifiant unique 
//           pour simplifier la gestion et éviter les collisions.


const db = require('../config/db');

// Fonctions utilitaires pour Redis
async function cacheData(key, data, ttl) {
    // TODO: Implémenter une fonction générique de cache
    const redisClient = await db.connectRedis();
    await redisClient.set(key, JSON.stringify(data), {
      EX: ttlInSeconds
    });
  }
  
  async function getData(key) {
    const redisClient = await db.connectRedis();
    const cachedData = await redisClient.get(key);
    return cachedData; // c'est du JSON stringifié
  }
  module.exports = {
    // TODO: Exporter les fonctions utilitaires
    cacheData,
    getData
  };