"use strict";

const BaseController = require("./base");

class HouseController extends BaseController {
  // 获取热门名宿
  async hot() {
    const { ctx, app } = this;
    const result = await ctx.service.house.hot();
    if (result) {
      this.success(result);
    } else {
      this.error("获取数据失败");
    }
  }

  // 搜索名宿
  async search() {
    const { ctx, app } = this;
    const result = await ctx.service.house.search(ctx.params());
    this.success(result);
  }

  // 民宿详情
  async detail() {
    const { ctx, app } = this;
    const result = await ctx.service.house.detail(ctx.params("id"));
    if (result) {
      this.success(result);
    } else {
      this.error("获取民宿详情失败");
    }
  }
}

module.exports = HouseController;
