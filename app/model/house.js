module.exports = (app) => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const House = app.model.define("house", {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: STRING(50),
    info: STRING(150),
    address: STRING(200),
    price: STRING,
    publishTime: DATE,
    cityCode: STRING,
    showCount: INTEGER,
    startTime: DATE,
    endTime: DATE,
  });
  return House;
};