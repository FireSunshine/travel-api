module.exports = (app) => {
  const { INTEGER, STRING } = app.Sequelize;

  const Province = app.model.define("province", {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: STRING(50),
  });

  return Province;
};
