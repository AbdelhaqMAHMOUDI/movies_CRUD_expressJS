const Film = require("../models/Film");

// Données factices pour simuler une base de données
// Récupération de tous les films

const db = require("../config/db");

// Récupérer tous les films
exports.getAllFilms = async (req, res) => {
  try {
    // Récupérer tous les films de la base de données
    const films = await Film.findAll();

    // Répondre avec les films récupérés
    res.status(200).json(films);
  } catch (error) {
    console.error("Erreur lors de la récupération des films :", error);
    res
      .status(500)
      .json({
        message: "Une erreur est survenue lors de la récupération des films",
      });
  }
};

// Créer un nouveau film
exports.createFilm = async (req, res) => {
  try {
    // Extraire les données du corps de la requête
    const filmData = req.body;

    // Créer un nouveau film dans la base de données
    const newFilm = await Film.create(filmData);

    // Répondre avec le film créé
    res.status(201).json(newFilm);
  } catch (error) {
    console.error("Erreur lors de la création du film :", error);
    res
      .status(500)
      .json({ message: "Une erreur est survenue lors de la création du film" });
  }
};

// Récupération d'un film par son ID
exports.getFilmById = async (req, res) => {
  try {
    const { id } = req.params;
    const film = await Film.findByPk(id);
    if (!film) {
      res.status(404).json({ error: "Film not found" });
    }
    res.status(200).json(film);
  } catch (error) {
    console.error("Erreur lors de la recuperation du film par ID", error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération du film par ID' });
  }
};



exports.updateFilm = async (req, res) => {
  try {
    // Récupérer l'ID du film à partir des paramètres de la requête
    const { id } = req.params;

    // Vérifier si le film existe
    const existingFilm = await Film.findByPk(id);
    if (!existingFilm) {
      return res.status(404).json({ message: 'Film not found' });
    }
    // Mettre à jour les données du film avec les nouvelles données du corps de la requête
    await existingFilm.update(req.body);
    // Récupérer le film mis à jour depuis la base de données
    const updatedFilm = await Film.findByPk(id);
    // Répondre avec le film mis à jour
    res.status(200).json(updatedFilm);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du film :', error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour du film' });
  }
};



exports.deleteFilm = async (req, res) => {
  try {
    // Récupérer l'ID du film à partir des paramètres de la requête
    const { id } = req.params;

    // Vérifier si le film existe
    const existingFilm = await Film.findByPk(id);
    if (!existingFilm) {
      return res.status(404).json({ message: 'Film not found' });
    }

    // Supprimer le film de la base de données
    await existingFilm.destroy();

    // Répondre avec un message de succès
    res.status(200).json({ message: 'Film deleted successfully' });
  } catch (error) {
    console.error('Erreur lors de la suppression du film :', error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la suppression du film' });
  }
};