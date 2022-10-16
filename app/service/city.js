"use strict";

const BaseService = require("./base");

class CityService extends BaseService {
  async getCity(pid) {
    return this.run(async () => {
      const { ctx } = this;
      const result = await ctx.model.City.find({
        where: { pid },
      });
      return result;
    });
  }
}

module.exports = CityService;
