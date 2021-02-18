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
      include: {
        model: Ingredient,
        as: "ingredients",
        attributes: ["id"],
      },
    });
    res.status(200).json(recipes);
  } catch (error) {
    next(error);
  }
};

exports.recipeCreate = async (req, res, next) => {
  try {
    const newRecipe = await Recipe.create(req.body);

    req.body.ingredients.map(async (ingredient) => {
      const foundIngredient = await Ingredient.findByPk(ingredient.id);

      await newRecipe.addIngredient(foundIngredient, {
        through: "Ingredient_Recipes",
      });
    });

    res.status(201).json(newRecipe);
  } catch (error) {
    next(error);
  }
  // req.body.name = req.recipe.name;

  // if (req.file) {
  //   req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
  // }

  // req.body format
  // {
  //   name: 'recipe1',
  //   ingredients: [{
  //      name: 'milk',
  //      image: "img-url",
  //     Ingredient_Recipes: {
  //       selfGranted: true
  //     }
  //   }]
  // }
};

exports.recipeDetail = async (req, res, next) => {
  res.status(200).json(req.recipe);
};
