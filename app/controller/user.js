"use strict";

const { Controller } = require("egg");
const md5 = require("md5");
const dayjs = require("dayjs");

class UserController extends Controller {
  async jwySign() {
    const { ctx, app } = this;
    const username = ctx.request.body.username;
    const token = app.jwt.sign(
      {
        username,
      },
      app.config.jwt.secret
    );
    ctx.session[username] = 1;
    return token;
  }

  // 注册
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
      createTime: ctx.helper.time(),
    });
    if (result) {
      const token = await this.jwySign();
      ctx.body = {
        status: 200,
        data: {
          ...ctx.helper.unPick(result.dataValues, ["password"]),
          createTime: ctx.helper.timestamp(result.createTime),
          token,
        },
      };
    } else {
      ctx.body = {
        status: 500,
        message: "注册用户失败",
      };
    }
  }

  // 登录
  async login() {
    const { ctx, app } = this;
    const { username, password } = ctx.request.body;
    const user = await ctx.service.user.getUser(username, password);

    if (user) {
      const token = await this.jwySign();
      ctx.body = {
        status: 200,
        data: {
          ...ctx.helper.unPick(user.dataValues, ["password"]),
          createTime: ctx.helper.timestamp(user.createTime),
          token,
        },
      };
    } else {
      ctx.body = {
        status: 500,
        message: "用户不存在",
      };
    }
  }

  // 获取用户详情
  async detail() {
    const { ctx } = this;
    const user = await ctx.service.user.getUser(ctx.username);

    if (user) {
      ctx.body = {
        status: 200,
        data: {
          ...ctx.helper.unPick(user.dataValues, ["password"]),
          createTime: ctx.helper.timestamp(user.createTime),
        },
      };
    } else {
      ctx.body = {
        status: 500,
        message: "用户不存在",
      };
    }
  }

  // 退出登录
  async logout() {
    const { ctx } = this;
    try {
      ctx.session[ctx.username] = null;
      ctx.body = {
        status: 200,
        data: "ok",
      };
    } catch (error) {
      ctx.body = {
        status: 500,
        message: "退出登录失败",
      };
    }
  }
}

module.exports = UserController;
