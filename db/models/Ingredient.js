const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Ingredient = sequelize.define("Ingredient", {
    name: { type: DataTypes.STRING, allowNull: false },
    slug: { type: DataTypes.STRING, unique: true },
    image: { type: DataTypes.STRING },
  });

  SequelizeSlugify.slugifyModel(Ingredient, {
    source: ["name"],
  });

  return Ingredient;
};
