const express = require('express');
const filmRoutes = require('./routes/filmRoutes');
const categorieRoutes = require('./routes/categorieRoute');
const acceptFormatMiddleware = require('./middlewares/acceptFormatMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;

const sequelize = require('./config/db');

// Middleware pour parser les requêtes JSON
app.use(express.json());

//le middleware pour gérer les en-têtes Accept
app.use(acceptFormatMiddleware);



app.get('/test', (req, res) => {
  res.send(`Le format préféré est : ${req.preferredFormat}`);
});


// Routes pour les films
app.use('/films', filmRoutes);
app.use('/categories', categorieRoutes);


// Synchronisation avec la base de données
sequelize.sync({ force: false }) // Utilisez force: true uniquement pour la première synchronisation pour créer la table, puis passez à false pour les synchronisations ultérieures
  .then(() => {
    console.log('Tables synchronisées avec succès');
  })
  .catch(err => {
    console.error('Erreur lors de la synchronisation des tables :', err);
  });


// Gestion des erreurs
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Démarrez le serveur
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
