"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app;
  const userExist = app.middleware.userExist();
  router.get("/", controller.home.index);
  router.post("/api/user/register", controller.user.register);
  router.post("/api/user/login", controller.user.login);
  router.post("/api/user/detail", userExist, controller.user.detail);
  router.post("/api/user/logout", controller.user.logout);
  router.post("/api/user/edit", controller.user.editUser);
  router.post("/api/commons/citys", controller.commons.citys);
};
