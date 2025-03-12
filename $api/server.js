const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// 处理 CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST');
  res.header('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
  next();
});

// 通用路由处理
app.all('/:path*/:operation', (req, res) => {
  const pathParts = req.params.path.split('/');
  const modulePath = path.join(__dirname, ...pathParts);
  
  try {
    const module = require(modulePath);
    module.default(req, res);
  } catch (error) {
    console.error(`模块加载错误: ${modulePath}`, error);
    res.status(404).json({ error: '接口不存在' });
  }
});

app.listen(port, () => {
  console.log(`本地开发服务器运行在: http://localhost:${port}`);
}); 