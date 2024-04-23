const express = require('express');
const router = express.Router();
const filmController = require('../controllers/filmController');
const validationMiddleware = require('../middlewares/validationMiddleware');


// header accept
router.get('/validationImpossible',  validationMiddleware);

// Récupération de tous les films
router.get('/', filmController.getAllFilms);

// Récupération d'un film par son ID
router.get('/:id', filmController.getFilmById);

// Création d'un film
router.post('/', filmController.createFilm);

// Modification d'un film
router.put('/:id', filmController.updateFilm);

// Suppression d'un film
router.delete('/:id', filmController.deleteFilm);




module.exports = router;
