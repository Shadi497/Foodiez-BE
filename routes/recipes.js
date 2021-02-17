const express = require("express");
const {
  recipeCreate,
  recipeList,
  recipeDetail,
  fetchRecipe,
} = require("../controllers/recipeController");
const router = express.Router();

const upload = require("../middleware/multer");

router.param("recipeId", async (req, res, next, recipeId) => {
  const foundRecipe = await fetchRecipe(recipeId, next);
  if (foundRecipe) {
    req.recipe = foundRecipe;
    next();
  } else {
    next({
      status: 404,
      message: "Recipe not found",
    });
  }
});

//list
router.get("/", recipeList);

//create recipe
router.post("/new", upload.single("image"), recipeCreate);

//detail
router.get("/:recipeId", recipeDetail);

module.exports = router;
