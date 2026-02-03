# 登录系统实现完成

本文档说明如何部署和测试登录系统。

## 一、数据库初始化

### 1. 创建user_session表

在Supabase SQL编辑器中执行以下SQL：

```sql
-- 用户会话表
CREATE TABLE IF NOT EXISTS user_session (
  id BIGSERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES base_user(id) ON DELETE CASCADE,
  refresh_token_hash VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL,
  revoked_at TIMESTAMPTZ,
  user_agent TEXT,
  ip_address VARCHAR(45)
);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_user_session_user_id ON user_session(user_id);
CREATE INDEX IF NOT EXISTS idx_user_session_token_hash ON user_session(refresh_token_hash);
CREATE INDEX IF NOT EXISTS idx_user_session_expires_at ON user_session(expires_at);
```

或者直接运行项目中的迁移脚本：

```bash
# 在Supabase SQL编辑器中执行
zengjin.work/api/_base/_db_migration.sql
```

### 2. 创建测试用户

首先配置环境变量（参考下一节），然后使用加密工具生成密码：

```bash
cd zengjin.work/api/_base
node encrypt_password.js "123456"
```

将输出的SQL语句复制到Supabase SQL编辑器执行。

## 二、环境变量配置

### 1. 生成密钥

```bash
# 生成CRYPTO_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# 生成JWT_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 2. 配置本地环境

在 `zengjin.work/.env` 文件中添加：

```bash
CRYPTO_SECRET=生成的密钥1
JWT_SECRET=生成的密钥2
```

### 3. 配置Vercel环境

在Vercel项目设置 > Environment Variables 中添加相同的环境变量。

## 三、安装依赖

登录系统使用了`jsonwebtoken`库，需要安装：

```bash
cd zengjin.work
npm install jsonwebtoken
```

## 四、使用登录组件

在你的Vue页面中引入组件：

```vue
<script setup>
import Login from '/src/components/Login.vue'
import Exit from '/src/components/Exit.vue'
import Demo from '/src/components/Demo.vue'
</script>

<template>
	<div>
		<Login />
		<Exit />
		<Demo />
	</div>
</template>
```

## 五、验证流程

### 1. 基本登录

- 点击"登录"按钮
- 输入用户名和密码
- 验证登录成功

### 2. 调用受保护接口

- 登录后点击Demo组件中的"获取测试数据"
- 验证能成功获取数据

### 3. Token自动刷新

- 将`_jwt.js`中的Access Token有效期临时改为10秒
- 登录后等待10秒
- 再次调用受保护接口
- 观察Network面板，应该看到自动调用refresh接口

### 4. 退出登录

- 点击"退出"按钮
- 验证状态已清空
- 再次调用受保护接口应返回401

## 六、API接口说明

### 登录相关

- `POST /api/base/login/login` - 登录
- `POST /api/base/login/refresh` - 刷新Token
- `POST /api/base/login/logout` - 退出登录

### 用户信息

- `GET /api/base/user/me` - 获取当前用户信息（需要登录）

### 测试接口

- `GET /api/base/demo/test` - 受保护的测试接口（需要登录）

## 七、故障排查

### 1. 登录失败

- 检查环境变量是否配置
- 检查数据库密码是否正确加密
- 查看浏览器控制台和服务器日志

### 2. Token刷新失败

- 检查Cookie是否正确设置
- 检查`withCredentials`配置
- 验证user_session表中是否有记录

### 3. CORS错误

- 开发环境应该不会有CORS问题
- 生产环境检查Cookie的SameSite和Secure属性

## 八、安全提醒

1. **密钥管理**：绝不要将CRYPTO_SECRET和JWT_SECRET提交到Git
2. **密码加密**：本方案使用AES对称加密，安全性低于bcrypt
3. **HTTPS**：生产环境必须使用HTTPS
4. **定期更新**：定期轮换密钥和清理过期session
