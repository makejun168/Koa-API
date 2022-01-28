const Koa = require('koa');

const app = new Koa();

app.use((ctx, next) => {
    ctx.body = 'Hello world 666';
})

app.listen(3000, () => {
    console.log('server is running on http://localhost:3000')
})
