'use strict';

const { Controller } = require('egg');

class HomeController extends Controller {
  async index() {
    const { ctx, app } = this;
    console.log(app.mysql, 'mysql');
    ctx.body = 'hi, egg';
  }
}

module.exports = HomeController;
