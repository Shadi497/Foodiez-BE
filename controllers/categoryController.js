const { Category } = require("../db/models");
const { Ingredient } = require("../db/models");

exports.fetchCategory = async (categoryId, next) => {
  try {
    const foundCategory = await Category.findByPk(categoryId);
    if (foundCategory) return foundCategory;
    else next({ message: "Category does not exist" });
  } catch (error) {
    next(error);
  }
};

exports.categoryList = async (req, res, next) => {
  try {
    const categorys = await Category.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },

      include: { model: Ingredient, as: "ingredients", attributes: ["id"] },
    });
    res.status(200).json(categorys);
  } catch (error) {
    next(error);
  }
};

exports.categoryDetail = async (req, res, next) => {
  res.status(200).json(req.category);
};

exports.categoryCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
};

exports.ingredientCreate = async (req, res, next) => {
  try {
    req.body.categoryId = req.category.id;
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const newIngredient = await Ingredient.create(req.body);
    res.status(201).json(newIngredient);
  } catch (error) {
    next(error);
  }
};
