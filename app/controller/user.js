"use strict";

const { Controller } = require("egg");
const md5 = require("md5");
const dayjs = require("dayjs");

class UserController extends Controller {
  async register() {
    const { ctx, app } = this;
    const params = ctx.request.body;
    const user = await ctx.service.user.getUser(params.username);
    if (user) {
      ctx.body = {
        status: 500,
        message: "用户已经存在",
      };
      return;
    }

    const result = await ctx.service.user.addUser({
      ...params,
      password: md5(params.password + app.config.salt),
      createTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    });
    if (result) {
      ctx.body = {
        status: 200,
        data: "注册成功",
      };
    } else {
      ctx.body = {
        status: 500,
        message: "注册用户失败",
      };
    }
  }
}

module.exports = UserController;
