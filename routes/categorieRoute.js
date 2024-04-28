const express = require('express');
const router = express.Router();
const categorieController = require('../controllers/categorieController');


// recuperation de toutes les categories 
router.get('/', categorieController.getAllCategories);
//creation d'une categorie 
router.post('/', categorieController.createCategorie);
//modification 
router.put('/:id', categorieController.updateCategorie);
//suppression 
router.delete('/:id', categorieController.deleteCategorie);

router.get('/:id/films', categorieController.getCategorieFilms);

module.exports = router;
