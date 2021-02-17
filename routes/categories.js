const express = require("express");
const {
  categoryCreate,
  categoryList,
  categoryDetail,
  fetchCategory,
  ingredientCreate,
} = require("../controllers/categoryController");
const router = express.Router();

const upload = require("../middleware/multer");

router.param("categoryId", async (req, res, next, categoryId) => {
  const foundCategory = await fetchCategory(categoryId, next);
  if (foundCategory) {
    req.category = foundCategory;
    next();
  } else {
    next({
      status: 404,
      message: "Category not found",
    });
  }
});

//list
router.get("/", categoryList);

//create category
router.post("/", upload.single("image"), categoryCreate);

//create ingredient
router.post(
  "/:categoryId/ingredients",
  upload.single("image"),
  ingredientCreate
);

//detail
router.get("/:categoryId", categoryDetail);

module.exports = router;
