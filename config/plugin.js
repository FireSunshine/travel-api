'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }

  // mysql
  mysql: {
    enable: true,
    package: 'egg-mysql',
  },

  equelize: {
    enable: true,
    package: 'egg-sequelize',
  },
};
