module.exports = (app) => {
  const { STRING, INTEGER, DATE, DECIMAL, TEXT } = app.Sequelize;
  const Product = app.model.define("product", {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: STRING(64),
    price: DECIMAL(10, 2),
    images: STRING(255),
    description: TEXT,
    categoryId: INTEGER,
    createTime: DATE,
    updateTime: DATE,
  });

  Product.associate = () => {
    app.model.Product.belongsTo(app.model.Category, {
      foreignKey: "categoryId",
    });
  };

  return Product;
};
