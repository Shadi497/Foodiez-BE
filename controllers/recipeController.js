const { Recipe } = require("../db/models");
const { Ingredient } = require("../db/models");

exports.fetchRecipe = async (recipeId, next) => {
  try {
    const foundRecipe = await Recipe.findByPk(recipeId);
    if (foundRecipe) return foundRecipe;
    else next({ message: "Recipe does not exist" });
  } catch (error) {
    next(error);
  }
};

exports.recipeList = async (req, res, next) => {
  try {
    const recipes = await Recipe.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      // include: {
      //   model: Ingredient,
      //   as: "ingredient",
      //   attributes: ["name"],
      // },
    });
    res.status(200).json(recipes);
  } catch (error) {
    next(error);
  }
};

exports.recipeCreate = async (req, res, next) => {
  try {
    req.body.ingredients = req.ingredient.recipes;
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const newRecipe = await Recipe.create(req.body);
    res.status(201).json(newRecipe);
  } catch (error) {
    next(error);
  }
};

exports.recipeDetail = async (req, res, next) => {
  res.status(200).json(req.recipe);
};
