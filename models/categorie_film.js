// film_categorie.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const FilmCategorie = sequelize.define("categoriefilm", {
  filmId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Film',
      key: 'id'
    }
  },
  categorieId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'categorie',
      key: 'id'
    }
  }
});

module.exports = FilmCategorie;
