// Question: Pourquoi séparer les routes dans différents fichiers ?
// Réponse : afin d'organiser et isoller les routes des utilisateurs de differents  parties de l'application
// Question : Comment organiser les routes de manière cohérente ?
// Réponse: pour organiser les routes il faut les separer selon les ressources par exemple ici les routes de courses aussi en utilisant Http action Soit GET,POST,PUT,DELETE...

const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// Routes pour les cours
router.post('/', courseController.createCourse);
router.get('/:id', courseController.getCourse);
router.get('/stats', courseController.getCourseStats);

module.exports = router;