const express = require("express");
const App = express();
const db = require("./db/models");
const ingredientRoutes = require("./routes/ingredients");
const categoryRoutes = require("./routes/categories");
const recipeRoutes = require("./routes/recipes");
const cors = require("cors");
const path = require("path");

App.use(express.json());
App.use(cors());
App.use("/ingredients", ingredientRoutes);
App.use("/categories", categoryRoutes);
App.use("/recipes", recipeRoutes);
App.use("/media", express.static(path.join(__dirname, "media")));

//Not Found
App.use((req, res, next) => {
  next({
    status: 404,
    message: "Path not found",
  });
});

//Error Handling
App.use((error, req, res, next) => {
  res
    .status(error.status || 500)
    .json({ message: error.message || "Internal Server Error" });
});

db.sequelize.sync({ alter: true });
// db.sequelize.sync({ force: true });

App.listen(8000, () => {
  console.log("Application is running");
});
