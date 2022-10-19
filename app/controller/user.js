"use strict";

const md5 = require("md5");
const BaseController = require("./base");

class UserController extends BaseController {
  // 根据用户名生成token
  async jwtSign({ id, username }) {
    const { ctx, app } = this;
    // const username = ctx.request.body.username;
    // 上下文
    // const username = ctx.params("username");

    const token = app.jwt.sign(
      {
        id,
        username,
      },
      app.config.jwt.secret
    );
    // ctx.session[username] = 1;
    await app.redis.set(username, token, "EX", app.config.redisExpire);
    return token;
  }

  parseResasult(ctx, result) {
    return {
      ...ctx.helper.unPick(result.dataValues, ["password"]),
      createTime: ctx.helper.timestamp(result.createTime),
    };
  }

  // 注册
  async register() {
    const { ctx, app } = this;
    // const params = ctx.request.body;
    const params = ctx.params();
    const user = await ctx.service.user.getUser(params.username);
    if (user) {
      this.error("用户已经存在");
      return;
    }

    const result = await ctx.service.user.addUser({
      ...params,
      password: md5(params.password + app.config.salt),
      createTime: ctx.helper.time(),
    });
    if (result) {
      const token = await this.jwtSign({
        id: result.id,
        username: result.username,
      });
      this.success({
        ...this.parseResasult(ctx, result),
        token,
      });
    } else {
      this.error("注册用户失败");
    }
  }

  // 登录
  async login() {
    const { ctx, app } = this;
    // const { username, password } = ctx.request.body;
    const { username, password } = ctx.params();

    const user = await ctx.service.user.getUser(username, password);
    if (user) {
      const token = await this.jwtSign({
        id: user.id,
        username: user.username,
      });
      this.success({
        ...this.parseResasult(ctx, user),
        token,
      });
    } else {
      this.error("用户不存在");
    }
  }

  // 获取用户详情
  async detail() {
    const { ctx } = this;
    const user = await ctx.service.user.getUser(ctx.username);

    if (user) {
      this.success({
        ...this.parseResasult(ctx, user),
      });
    } else {
      this.error("用户不存在");
    }
  }

  // 退出登录
  async logout() {
    const { ctx, app } = this;
    try {
      // ctx.session[ctx.username] = null;
      await app.redis.del(ctx.username);
      this.success("ok");
    } catch (error) {
      thid.error("退出登录失败");
    }
  }

  // 编辑用户
  async editUser() {
    const { ctx } = this;
    const result = await ctx.service.user.editUser({
      ...ctx.params(),
      updateTime: ctx.helper.time(),
    });
    if (result) {
      this.success(result);
    } else {
      this.error("用户信息修改失败");
    }
  }
}

module.exports = UserController;
