"use strict";

const Service = require("egg").Service;
const md5 = require("md5");

class UserService extends Service {
  async getUser(username, password) {
    try {
      const { ctx } = this;
      const _where = password
        ? { username, password: md5(password + this.app.config.salt) }
        : { username };
      const result = await ctx.model.User.findOne({
        where: _where,
      });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async addUser(params) {
    try {
      const { ctx } = this;
      const result = await ctx.model.User.create(params);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

module.exports = UserService;
