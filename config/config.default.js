/* eslint valid-jsdoc: "off" */

"use strict";

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1664951133101_3792";

  // add your middleware config here
  config.middleware = [];

  // 安全威胁csrf的防范
  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.mysql = {
    app: true,
    agent: false,
    client: {
      host: "127.0.0.1",
      port: "3306",
      user: "root",
      password: "root",
      database: "travel",
    },
  };

  config.sequelize = {
    dialect: "mysql",
    host: "127.0.0.1",
    port: "3306",
    user: "root",
    password: "root",
    database: "travel",
    define: {
      timestamps: false,
      freezeTableName: true,
    },
  };

  config.jwt = {
    secret: "sunshine",
  };

  config.auth = {
    exclude: [
      "/home",
      "/api/user/register",
      "/api/user/login",
      "/api/user/logout",
      "/api/product/lists",
      "/api/product/detail",
      "/api/product/search",
    ],
  };

  config.cors = {
    origin: "*",
    allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH",
  };

  config.redis = {
    client: {
      port: 6379,
      host: "127.0.0.1",
      password: "",
      db: 0,
    },
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    salt: "sunshine",
    redisExpire: 60 * 60 * 24,
  };

  return {
    ...config,
    ...userConfig,
  };
};
