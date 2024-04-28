// film.js
const { DataTypes } = require("sequelize");
const sequelize2 = require("../config/db");

const Film = sequelize2.define("film", {
  nom: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(2048),
    allowNull: false,
  },
  date_parution: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  note: {
    type: DataTypes.INTEGER,
    allowNull: true,
    validate: {
      min: 0,
      max: 5,
    },
  },
});


module.exports = Film;
const Categorie = require("./Categorie");

Film.belongsToMany(Categorie, { through: "categoriefilm" });

// Film.prototype.getCategories = async function() {
//   try {
//     const categories = await this.getCategories(); 
//     return categories;
//   } catch (error) {
//     console.error("Erreur lors de la récupération des catégories du film :", error);
//     return null;
//   }
// };


