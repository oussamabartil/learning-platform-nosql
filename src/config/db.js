// Question : Pourquoi créer un module séparé pour les connexions aux bases de données ?
// Réponse : Afin d'isoler la logique de connexion et aussi de partager la meme connection dans toute application (facilite aussi reutilisabilite et mantenabilite de code )
// Question : Comment gérer proprement la fermeture des connexions ?
// Réponse : avant arret de application il faut qu'uo appel la methodes de fermeture de connection comme mongoClient.close(),redisClient.close()... 

const { MongoClient } = require('mongodb');
const redis = require('redis');
const config = require('./env');

let mongoClient, redisClient, db;

async function connectMongo() {
  // TODO: Implémenter la connexion MongoDB
  // Gérer les erreurs et les retries
  try{
    if(!mongoClient){
      mongoClient =new MongoClient(config.mongodb.uri , { useUnifiedTopology: true});
      await mongoClient.connect();
      db =mongoClient.db(config.mongodb.dbName);
      console.log('conecter  a MongoDb:', config.mongodb.dbName );
    }
    return db;
  }catch(error){
    console.error('erreur lors de la connection a MongoDB ',error);
    throw error;
  }
}

async function connectRedis() {
  // TODO: Implémenter la connexion Redis
  // Gérer les erreurs et les retries
  try{
    if(!redisClient){
      redisClient =redis.createClient({url:config.redis.uri});
       redisClient.on('error',(err)=> console.error('Redis client erreur ', err));
      await redisClient.connect();
      console.log('conecter  a redis:', config.redis.uri );
    }
    return redisClient;
  }catch(error){
    console.error('Erreur lors de la connection a redis ',error);
    throw error;
  }

}

//ici je vais ajouter une fonction de la fermeture des connection Mongodb et Redis
async function closeConnections() {
  if (mongoClient) {
    await mongoClient.close();
    console.log('MongoDB connection fermer');
  }
  if (redisClient) {
    await redisClient.quit();
    console.log('Redis connection fermer');
  }
}


// Export des fonctions et clients
module.exports = {
  // TODO: Exporter les clients et fonctions utiles
  connectMongo,
  connectRedis,
  getMongoClient: ()=>mongoClient,
  getDB: ()=>db,
  getRedisClient: ()=>redisClient,
  closeConnections
};