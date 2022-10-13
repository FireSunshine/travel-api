"use strict";

const md5 = require("md5");
const BaseService = require("./base");

class UserService extends BaseService {
  async getUser(username, password) {
    return this.run(async () => {
      const { ctx } = this;
      const _where = password
        ? { username, password: md5(password + this.app.config.salt) }
        : { username };
      const result = await ctx.model.User.findOne({
        where: _where,
      });
      return result;
    });
  }

  async addUser(params) {
    return this.run(async () => {
      const { ctx } = this;
      const result = await ctx.model.User.create(params);
      return result;
    });
  }

  async editUser(pamars) {
    return this.run(async () => {
      const { ctx } = this;
      const result = await ctx.model.User.update(pamars, {
        where: {
          username: ctx.username,
        },
      });
      return result;
    });
  }
}

module.exports = UserService;
