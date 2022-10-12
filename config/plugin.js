"use strict";

const path = require("path");

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }

  // mysql
  mysql: {
    enable: true,
    package: "egg-mysql",
  },

  equelize: {
    enable: true,
    package: "egg-sequelize",
  },

  jwt: {
    enable: true,
    package: "egg-jwt",
  },

  auth: {
    enable: true,
    path: path.join(__dirname, "../lib/plugin/egg-auth"),
  },

  redis: {
    enable: true,
    package: "egg-redis",
  },
};
