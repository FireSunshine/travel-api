module.exports = (app) => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const ShoppingCart = app.model.define("shoppingCart", {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: INTEGER,
    productId: INTEGER,
    createTime: DATE,
  });

  ShoppingCart.associate = () => {
    app.model.ShoppingCart.belongsTo(app.model.Product, {
      foreignKey: "productId",
      as: "product",
    });
  };

  return ShoppingCart;
};
