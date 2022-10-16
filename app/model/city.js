module.exports = (app) => {
  const { INTEGER, STRING } = app.Sequelize;

  const City = app.model.define("city", {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: STRING(50),
    pid: INTEGER,
  });

  return City;
};
