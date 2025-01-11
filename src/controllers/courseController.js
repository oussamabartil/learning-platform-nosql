// Question: Quelle est la différence entre un contrôleur et une route ?
// Réponse:la route definit URL et la methode HTTP mais le controlleur il gere la logique  metier ,service (se qui concerne le traitement , validation..)avant de renvoyer la reponse.
// Question : Pourquoi séparer la logique métier des routes ?
// Réponse :afin de separer la couche metier et pour rendre aussi le code lisible facile a reutiliser et facile a maintenaire.

const { ObjectId } = require('mongodb');
const db = require('../config/db');
const mongoService = require('../services/mongoService');
const redisService = require('../services/redisService');

async function createCourse(req, res) {
  // TODO: Implémenter la création d'un cours
  // Utiliser les services pour la logique réutilisable

  try{
    const {name , description}=req.body;

    //valider existance de nom
    if(!name){
      return res.status(400).json({ error: 'nom est important'});
    }

    //enregistre ke ccours dans mongo
    const newCourse =await mongoService.insertOne('courses',{
      name,
      description: description || '',
      createdAt: new Date()
    });

    //mettre  ajour le cache afin utiliser Redis 
    await redisService.cacheData(`course_${newCourse.insertedId}`,newCourse, 60);
    return res.status(201).json({ message: 'le cours a ete cree',data: newCourse});
    

  }catch(error){
console.error('createCourse error',error);
return res.status(500).json({ error: 'Erreur serveur interne'});

  }
}

//fonction pour recuperer les cours
async function getCourse(req, res) {
  try {
    const courseId = req.params.id;
    if (!courseId) {
      return res.status(400).json({ error: 'Id de cours est important' });
    }

    //verifier si le cours exist dans Redis ==cache
    const cachedCourse =await redisService.getData(`cours_${courseId}`); 
    if(cachedCourse){
          return res.status(200).json({ fromCache: true, data: JSON.parse(cachedCourse) });

    }
    const course =await mongoService.findOneById('courses', courseId);
    if (!course) {
      return res.status(404).json({ error: 'Cours non trouvet' });
    }

    //stocker le dans le cache 
    await redisService.cacheData(`course_${courseId}`, course, 120);

    return res.status(200).json({ data: course });
  }catch(error){
    console.error();
    return res.status(500).json({ error: 'Erreur serveur' });
  }
}


//avoir les statistique nbr des cours existant dans la BD


async function getCourseStats(req, res) {
  try {
    //implementer des statistiques 
    const stats = await mongoService.countDocuments('courses');
    return res.status(200).json({ totalCourses: stats });
  } catch (error) {
    console.error('[getCourseStats] error:', error);
    return res.status(500).json({ error: 'Erreur de serveur ' });
  }
}
// Export des contrôleurs
module.exports = {
  // TODO: Exporter les fonctions du contrôleur
  createCourse,
  getCourse,
  getCourseStats
};