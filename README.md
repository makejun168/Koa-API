# Koa API
Node Koa2 搭建通用 API服务

## 1. 项目初始化

#### npm 初始化

```
npm init -y
```

#### git 初始化

```
git init
```

---

## 2. 搭建项目

#### 安装 Koa

```
npm install Koa@^2.13.1
```

#### 编写基础的API

```
创建 src/main.js
```

#### Code

```js
const Koa = require('koa');

const app = new Koa();

app.use((ctx, next) => {
    ctx.body = 'Hello world 666';
})

app.listen(3000, () => {
    console.log('server is running on http://localhost:3000')
})
```

#### 测试

```js
node src/main.js
```

---

## 3. 项目的基础搭建

#### 3.1 自动重启服务

```
yarn add nodemon
```

##### 编写 package.json 脚本

```
"dev": "nodemon src/main.js"
```

##### 执行

```
yarn dev
```

#### 3.2 读取配置文件

```
yarn add dotenv
```


##### 创建文件目录

```
创建 src/config/config.default.js
```

```js
const dotenv = require('dotenv');

dotenv.config();

// 获取到 .env 的键值对

console.log(process.env.APP_PORT)

module.exports = process.env;
```

##### 改写 main.js

```js
const Koa = require('koa');
const { APP_PORT } = require('./config/config.default');

const app = new Koa();

app.use((ctx, next) => {
    ctx.body = 'Hello world  123';
})

app.listen(APP_PORT, () => {
    console.log(`server is running on http://localhost:${APP_PORT}`)
})
```

---

## 4. 添加路由

### 步骤

1. 导入包
2. 实例化对象
3. 编写路由
4. 注册中间件

#### 导入

```js
yarn add koa-router
```


#### 编写路由

```js
const Router = require("koa-router");

const router = new Router({prefix: '/users'});

// router get /users
router.get('/', (ctx, next) => {
    ctx.body = 'user'
})

module.exports = router;
```

#### 改写入口文件 main.js

```js
const Koa = require('koa');
const { APP_PORT } = require('./config/config.default');

const app = new Koa();

const Router = require('koa-router');
const UserRouter = require('./router/user.route');

app.use(UserRouter.routes());

app.use((ctx, next) => {
    ctx.body = 'Hello world  123';
})

app.listen(APP_PORT, () => {
    console.log(`server is running on http://localhost:${APP_PORT}`);
})
```

---

## 5. 目录结构优化

#### 将 HTTP 服务 和 app 业务拆分

```
创建 src/app/index.js
```

```js
const Koa = require('koa');

const UserRouter = require('../router/user.route');

const app = new Koa();

app.use(UserRouter.routes());

module.exports = app;
```

#### 修改 main.js

```js
const Koa = require('koa');
const { APP_PORT } = require('./config/config.default');
const app = require('./app');

app.listen(APP_PORT, () => {
    console.log(`server is running on http://localhost:${APP_PORT}`)
})
```

#### 将路由和控制器进行拆分

路由解析 URL，分发到控制器对应的方法
控制前：处理不同的业务需求

```js
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
```

##### 改写 user.controller.js

```js
class UserController {
    async register(ctx, next) {
        ctx.body = '用户注册成功'
    }

    async login(ctx, next) {
        ctx.body = '用户登录成功'
    }
}

module.exports = new UserController();
```

---

## 6 解析 body 拆分 service 层

```
yarn add koa-body
```

#### 注册中间件

#### 解析请求的数据

```js
const { createUser } = require('../service/user.service')

class UserController {
    async register(ctx, next) {
        // 获取数据
        console.log(ctx.request.body);
        // 操作数据库

        // 返回结果
        ctx.body = ctx.request.body;
    }

    async login(ctx, next) {
        ctx.body = '用户登录成功'
    }
}

module.exports = new UserController();
```


#### 拆分 Service 层 从 controller 中

```js
// 操作用户数据库
class UserService {
    async createUser(user_name, password) {
        // todo
        return '写入数据库成功'
    }
}

module.exports = new UserService();
```
