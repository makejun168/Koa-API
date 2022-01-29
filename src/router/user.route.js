const Router = require("koa-router");

const router = new Router({prefix: '/users'});
const {register, login} = require('../controller/user.controller');

// router get /users
router.get('/', (ctx, next) => {
    ctx.body = '用户页面'
});

router.post('/register', register);

router.post('/login', login);

module.exports = router;
