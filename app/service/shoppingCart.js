"use strict";

const BaseService = require("./base");

class ShoppingCartService extends BaseService {
  async addShoppingCart(params) {
    return this.run(async (ctx, app) => {
      const result = await ctx.model.ShoppingCart.create(params);
      return result;
    });
  }

  async lists(params) {
    return this.run(async (ctx, app) => {
      const searchParam = {
        where: {
          userId: params.userId,
        },
        raw: true,
        attributes: [
          "id",
          "createTime",
          "productId",
          "userId",
          [app.Sequelize.col("product.id"), "productId"],
          [app.Sequelize.col("product.name"), "name"],
          [app.Sequelize.col("product.images"), "images"],
          [app.Sequelize.col("product.price"), "price"],
          [app.Sequelize.col("product.description"), "description"],
        ],
        include: [
          {
            model: app.model.Product,
            attributes: [],
            as: "product",
          },
        ],
      };
      if (params?.pageNum) {
        searchParam.limit = params?.pageSize;
        searchParam.offset = (params?.pageNum - 1) * params?.pageSize;
      }
      const total = await ctx.model.ShoppingCart.count(searchParam.where);
      const result = await ctx.model.ShoppingCart.findAll(searchParam);
      if (params?.pageNum) {
        return {
          data: result,
          pagination: {
            pageNum: params.pageNum,
            pageSize: params.pageSize,
            total: total,
          },
        };
      } else {
        return result;
      }
    });
  }

  async delShoppingCart(cartIds) {
    return this.run(async (ctx, app) => {
      const result = await ctx.model.ShoppingCart.destroy({
        where: { id: cartIds },
      });
      return result;
    });
  }
}

module.exports = ShoppingCartService;
