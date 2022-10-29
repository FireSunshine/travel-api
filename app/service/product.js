"use strict";

const BaseService = require("./base");

class ProductService extends BaseService {
  async productList() {
    return this.run(async (ctx, app) => {
      const result = await ctx.model.Product.findAll({
        include: [
          {
            raw: true,
            model: app.model.Category,
            attributes: ["name"],
          },
        ],
      });
      return result;
    });
  }
}

module.exports = ProductService;
