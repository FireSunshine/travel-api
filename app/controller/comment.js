"use strict";

const BaseController = require("./base");

class CommentController extends BaseController {
  // 添加评论
  async add() {
    const { ctx, app } = this;
    const user = await ctx.service.user.getUser(ctx.username);
    const result = await ctx.service.comment.add({
      userId: user.id,
      houseId: ctx.params("houseId"),
      msg: ctx.params("comment"),
      createTime: ctx.helper.time(0),
    });
    if (result) {
      this.success(result);
    } else {
      this.error("添加评论失败");
    }
  }

  // 查看留言列表
  async lists() {
    const { ctx, app } = this;
    const user = await ctx.service.user.getUser(ctx.username);
    const result = await ctx.service.comment.lists(ctx.params(), user.id);
    if (result) {
      this.success(result);
    } else {
      this.error("获取评论列表失败");
    }
  }
}

module.exports = CommentController;
