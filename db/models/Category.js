const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define("Category", {
    name: { type: DataTypes.STRING, allowNull: false },
    slug: { type: DataTypes.STRING, unique: true },
    image: { type: DataTypes.STRING },
  });

  SequelizeSlugify.slugifyModel(Category, {
    source: ["name"],
  });

  return Category;
};
