const Categorie = require("../models/Categorie");
const Film = require("../models/Film");

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Categorie.findAll();
    res.status(200).json(categories);
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories :", error);
    res.status(500).json({
      message: "Une erreur est survenue lors de la récupération des catégories",
    });
  }
};

// creation d'une categorie
exports.createCategorie = async (req, res) => {
  try {
    const categorieData = req.body;
    const newCategorie = await Categorie.create(categorieData);
    res.status(201).json(newCategorie);
  } catch (error) {
    console.error("Erreur lors de la création de la catégorie :", error);
    res.status(500).json({
      message: "Une erreur est survenue lors de la création de la catégorie",
    });
  }
};

// l'api modification
exports.updateCategorie = async (req, res) => {
  try {
    // Récupérer l'ID de la catégorie à partir des paramètres de la requête
    const { id } = req.params;

    // Vérifier si la catégorie existe
    const existingCategorie = await Categorie.findByPk(id);
    if (!existingCategorie) {
      return res.status(404).json({ message: "Catégorie non trouvée" });
    }

    // Mettre à jour les données de la catégorie avec les nouvelles données du corps de la requête
    await existingCategorie.update(req.body);

    // Récupérer la catégorie mise à jour depuis la base de données
    const updatedCategorie = await Categorie.findByPk(id);

    // Répondre avec la catégorie mise à jour
    res.status(200).json(updatedCategorie);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la catégorie :", error);
    res
      .status(500)
      .json({
        message:
          "Une erreur est survenue lors de la mise à jour de la catégorie",
      });
  }
};

// suppression par ID
exports.deleteCategorie = async (req, res) => {
  try {
    // Récupérer l'ID de la catégorie à partir des paramètres de la requête
    const { id } = req.params;
    // Vérifier si la catégorie existe
    const existingCategorie = await Categorie.findByPk(id);
    if (!existingCategorie) {
      return res.status(404).json({ message: "Catégorie non trouvée" });
    }
    // Supprimer la catégorie de la base de données
    await existingCategorie.destroy();
    res.status(200).json({ message: "Catégorie supprimée avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression de la catégorie :", error);
    res
      .status(500)
      .json({
        message:
          "Une erreur est survenue lors de la suppression de la catégorie",
      });
  }
};

exports.getCategorieFilms = async (req, res) => {
  try {
    const categorieId = req.params.id;

    // Trouver la catégorie par son ID
    const categorie = await Categorie.findByPk(categorieId, {
      include: [
        {
          model: Film,
          attributes: ["id", "nom"],
          through: { attributes: [] },
        },
      ],
    });
    if (!categorie) {
      return res.status(404).json({ message: "Categorie not found" });
    }

    res.status(200).json({ categorie });
  } catch (error) {
    console.error("Error retrieving category films:", error);
    res.status(500).json({
      message: "An error occurred while retrieving category films",
    });
  }
};
