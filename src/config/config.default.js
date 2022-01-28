const dotenv = require('dotenv');

dotenv.config();

// 获取到 .env 的键值对

console.log(process.env.APP_PORT)

module.exports = process.env;
