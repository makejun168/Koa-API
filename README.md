# Koa API
Node Koa2 搭建通用 API服务

### 1. 项目初始化

#### npm 初始化

```
npm init -y
```

#### git 初始化

```
git init
```

### 2. 搭建项目

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



### 3. 项目的基础搭建

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
