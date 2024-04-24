// db.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('filmsdb', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

// Tester la connexion à la base de données
sequelize.authenticate()
  .then(() => {
    console.log('Connected to MySQL database');
  })
  .catch((err) => {
    console.error('Error connecting to MySQL database:', err);
  });

module.exports = sequelize;
