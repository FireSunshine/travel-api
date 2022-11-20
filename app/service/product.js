"use strict";

const BaseService = require("./base");

class ProductService extends BaseService {
  // 产品列表
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

  // 产品详情
  async detail(id) {
    return this.run(async (ctx, app) => {
      const result = await ctx.model.Product.findOne({
        where: { id },
      });
      return result;
    });
  }

  // 搜索产品
  async search(params) {
    return this.run(async (ctx, app) => {
      const { like } = app.Sequelize.Op;
      const where = {
        name: {
          [like]: "%" + params.keywords + "%",
        },
      };
      if (!params.keywords) {
        delete where.name;
      }
      const total = await ctx.model.Product.count({ where });
      const result = await ctx.model.Product.findAll({
        attributes: {
          exclude: ["createTime", "updateTime", "feature", "fees", "notes"],
        },
        limit: params.pageSize,
        offset: (params.pageNum - 1) * params.pageSize,
        where,
      });
      return {
        data: result,
        pagination: {
          pageNum: params.pageNum,
          pageSize: params.pageSize,
          total: total,
        },
      };
    });
  }
}

module.exports = ProductService;
