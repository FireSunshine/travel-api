module.exports = (app) => {
  const { INTEGER, STRING, DATE, DECIMAL } = app.Sequelize;

  const Category = app.model.define("category", {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: STRING(64),
    createTime: DATE,
    updateTime: DATE,
  });

  return Category;
};
