const Film = require('../models/Film');

// Données factices pour simuler une base de données
let films = [];

// Récupération de tous les films
exports.getAllFilms = (req, res) => {
    res.status(200).json(films);
};

// Récupération d'un film par son ID
exports.getFilmById = (req, res) => {
    const id = req.params.id;
    const film = films.find(f => f.id === id);
    if (!film) {
        res.status(404).json({ error: 'Film not found' });
    } else {
        res.status(200).json(film);
    }
};



// Création d'un film
exports.createFilm = (req, res) => {
    const { nom, description, dateParution, note } = req.body;
    const id = Math.random().toString(36).substr(2, 9);
    const newFilm = new Film(id, nom, description, dateParution, note);
    films.push(newFilm);
    res.status(201).json(newFilm);
};

// Modification d'un film
exports.updateFilm = (req, res) => {
    const id = req.params.id;
    const updatedFilm = req.body;
    const index = films.findIndex(f => f.id === id);
    if (index === -1) {
        res.status(404).json({ error: 'Film not found' });
    } else {
        films[index] = updatedFilm;
        res.status(200).json(updatedFilm);
    }
};

// Suppression d'un film
exports.deleteFilm = (req, res) => {
    const id = req.params.id;
    films = films.filter(f => f.id !== id);
    res.status(200).json({ message: 'Film deleted successfully' });
};
