const Film = require("../models/Film");
const Categorie = require("../models/Categorie");

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
    res.status(500).json({
      message: "Une erreur est survenue lors de la récupération des films",
    });
  }
};

// Créer un nouveau film
exports.createFilm = async (req, res) => {
  try {
    // Extraire les données du corps de la requête
    const { nom, description, date_parution, note, categories } = req.body;

    // Créer le film dans la base de données
    const newFilm = await Film.create({
      nom,
      description,
      date_parution,
      note,
    });

    // Associer le film aux catégories correspondantes
    // Associer le film aux catégories correspondantes
    if (categories && categories.length > 0) {
      // Rechercher les catégories par leur nom
      const categoriesFound = await Categorie.findAll({
        where: { nom: categories },
      });

      // Associer les catégories trouvées au film
      await newFilm.setCategories(categoriesFound);
    }
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
    res.status(500).json({
      message: "Une erreur est survenue lors de la récupération du film par ID",
    });
  }
};

exports.updateFilm = async (req, res) => {
  try {
    // Récupérer l'ID du film à partir des paramètres de la requête
    const { id } = req.params;

    // Vérifier si le film existe
    const existingFilm = await Film.findByPk(id);
    if (!existingFilm) {
      return res.status(404).json({ message: "Film not found" });
    }
    // Mettre à jour les données du film avec les nouvelles données du corps de la requête
    await existingFilm.update(req.body);
    // Récupérer le film mis à jour depuis la base de données
    const updatedFilm = await Film.findByPk(id);
    // Répondre avec le film mis à jour
    res.status(200).json(updatedFilm);
  } catch (error) {
    console.error("Erreur lors de la mise à jour du film :", error);
    res.status(500).json({
      message: "Une erreur est survenue lors de la mise à jour du film",
    });
  }
};

exports.deleteFilm = async (req, res) => {
  try {
    // Récupérer l'ID du film à partir des paramètres de la requête
    const { id } = req.params;

    // Vérifier si le film existe
    const existingFilm = await Film.findByPk(id);
    if (!existingFilm) {
      return res.status(404).json({ message: "Film not found" });
    }

    // Supprimer le film de la base de données
    await existingFilm.destroy();

    // Répondre avec un message de succès
    res.status(200).json({ message: "Film deleted successfully" });
  } catch (error) {
    console.error("Erreur lors de la suppression du film :", error);
    res.status(500).json({
      message: "Une erreur est survenue lors de la suppression du film",
    });
  }
};

// Rechercher des films en fonction de certains critères : nom, description, et par tranche de date
exports.searchFilms = async (req, res) => {
  try {
    const {
      nom,
      description,
      date_parution_min,
      date_parution_max,
      page,
      limit,
      categorieNom,
    } = req.query;
    // la limite d'affichage est à 10 s'elle n'est pas definie
    const options = {
      limit: limit ? parseInt(limit) : 10,
      include: [
        {
          model: Categorie,
          attributes: ["id", "nom"],
          through: { attributes: [] },
        },
      ],
    };

    if (nom) {
      options.where = { nom: { [db.Sequelize.Op.like]: `%${nom}%` } };
    }
    if (description) {
      options.where = {
        description: { [db.Sequelize.Op.like]: `%${description}%` },
      };
    }

    if (categorieNom) {
      // Trouver l'ID de la catégorie en fonction de son nom
      const categorie = await Categorie.findOne({
        where: { nom: categorieNom },
      });

      // Si la catégorie existe, inclure ses films dans la recherche
      if (categorie) {
        options.include = [
          {
            model: Categorie,
            through: { attributes: [] },
            where: { id: categorie.id },
          },
        ];
      }
    }

    if (date_parution_min && date_parution_max) {
      options.where = {
        ...options.where,
        date_parution: {
          [db.Sequelize.Op.between]: [date_parution_min, date_parution_max],
        },
      };
    }

    //pagination et limit
    if (page) {
      options.offset = (page - 1) * options.limit;
      console.log(" voici la nouvelle limit  ======= " + limit);
    }
    if (limit) {
      options.limit = parseInt(limit);
    }

    const films = await Film.findAll(options);

    res.status(200).json(films);
  } catch (error) {
    console.error("Erreur lors de la recherche des films :", error);
    res.status(500).json({
      message: "Une erreur est survenue lors de la recherche des films",
    });
  }
};



// Méthode pour obtenir les catégories associées à un film
exports.getFilmCategories = async (req, res) => {
  try {
    const filmId  = req.params.id;
    const film = await Film.findByPk(filmId, {
      include: [
        {
          model: Categorie,
          attributes: ["id", "nom"],
          through: { attributes: [] } 
        }
      ]
    });
    if (!film) {
      return res.status(404).json({ message: "Film not found" });
    }

    res.status(200).json({ film });
  } catch (error) {
    console.error("Error retrieving film categories:", error);
    res.status(500).json({
      message: "An error occurred while retrieving film categories"
    });
  }
};