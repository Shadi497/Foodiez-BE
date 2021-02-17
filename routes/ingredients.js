const express = require("express");
const {
  ingredientList,
  ingredientDetail,
  fetchIngredient,
} = require("../controllers/ingredientController");
const router = express.Router();

router.param("ingredientId", async (req, res, next, ingredientId) => {
  const foundIngredient = await fetchIngredient(ingredientId, next);
  if (foundIngredient) {
    req.ingredient = foundIngredient;
    next();
  } else {
    next({
      status: 404,
      message: "Ingredient not found",
    });
  }
});

//list
router.get("/", ingredientList);

//detail
router.get("/:ingredientId", ingredientDetail);

module.exports = router;
