const Koa = require('koa');
const KoaBody = require('koa-body');

const UserRouter = require('../router/user.route');

const app = new Koa();

// 所有中间件之前
app.use(KoaBody());

app.use(UserRouter.routes());

module.exports = app;
