// Question: Comment organiser le point d'entrée de l'application ?
//Reponse: Charger les variables d'env, initialiser les connexions DB, configurer Express et monter les routes.
// Question: Quelle est la meilleure façon de gérer le démarrage de l'application ?
// Réponse : Utiliser une fonction asynchrone pour gérer les erreurs (try/catch), 
//           s'assurer que la base est connectée avant d'écouter sur le port.


const express = require('express');
const cors = require('cors');
const config = require('./config/env');
const db = require('./config/db');

const courseRoutes = require('./routes/courseRoutes');
const studentRoutes = require('./routes/studentRoutes');

const app = express();

 app.use(express.json());

async function startServer() {
  try {
    // TODO: Initialiser les connexions aux bases de données
    await db.connectMongo();
    await db.connectRedis();

    // TODO: Configurer les middlewares Express
    app.use(cors());
    // TODO: Monter les routes
    app.use('/courses', courseRoutes);
    app.use("/students", studentRoutes);


    // TODO: Démarrer le serveur
    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Gestion propre de l'arrêt
process.on('SIGTERM', async () => {
  // TODO: Implémenter la fermeture propre des connexions
  console.log('SIGTERM signal received: closing connections...');
  await db.closeConnections();
  process.exit(0);
});

startServer();