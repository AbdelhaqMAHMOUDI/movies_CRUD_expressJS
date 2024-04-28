// models/Categorie.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Categorie = sequelize.define("categorie", {
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Categorie;


const Film = require("./Film");

Categorie.belongsToMany(Film, { through: "categoriefilm" });
