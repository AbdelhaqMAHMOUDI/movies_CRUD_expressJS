// film.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 
const Film = sequelize.define('film', {
  nom: {
    type: DataTypes.STRING(128),
    allowNull: false
  },
  description: {
    type: DataTypes.STRING(2048),
    allowNull: false
  },
  date_parution: {
    type: DataTypes.DATE,
    allowNull: false
  },
  note: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 0,
      max: 5
    }
  }
});

module.exports = Film;
