"use strict";

const BaseController = require("./base");

class ProductController extends BaseController {
  // 获取产品列表
  async productList() {
    const { ctx, app } = this;
    const result = await ctx.service.product.productList();
    if (result) {
      this.success(result);
    } else {
      this.error("获取数据失败");
    }
  }

  // 产品详情
  async detail() {
    const { ctx, app } = this;
    const result = await ctx.service.product.detail(ctx.params("id"));
    if (result) {
      this.success(result);
    } else {
      this.error("获取产品详情失败");
    }
  }

  // 搜索产品
  async search() {
    const { ctx, app } = this;
    const result = await ctx.service.product.search(ctx.params());
    if (result) {
      this.success(result);
    } else {
      this.error("搜索失败");
    }
  }
}

module.exports = ProductController;
