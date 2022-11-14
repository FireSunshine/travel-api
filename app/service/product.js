"use strict";

const BaseService = require("./base");

class ProductService extends BaseService {
  async productList() {
    return this.run(async (ctx, app) => {
      const result = await ctx.model.Product.findAll({
        // include: [
        //   {
        //     raw: true,
        //     model: app.model.Category,
        //     attributes: ["name"],
        //   },
        // ],
        // 除去的字段
        attributes: {
          exclude: ["createTime", "updateTime", "feature", "fees", "notes"],
        },
      });
      return result;
    });
  }

  async detail(id) {
    return this.run(async (ctx, app) => {
      const result = await ctx.model.Product.findOne({
        where: { id },
      });
      return result;
    });
  }
}

module.exports = ProductService;
