# 登录系统环境变量配置说明

## 必需的环境变量

请在 `.env` 文件中添加以下环境变量：

### 1. CRYPTO_SECRET

AES加密密钥，用于加密和解密用户密码。

```bash
CRYPTO_SECRET=your-32-character-secret-key-here
```

**说明**：

- 长度建议32字符以上（实际会通过SHA256处理为32字节）
- 请使用强随机字符串
- **务必保密**，不要泄露到代码仓库

**生成方式**：

```bash
# 使用Node.js生成随机字符串
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 2. JWT_SECRET

JWT签名密钥，用于生成和验证Access Token。

```bash
JWT_SECRET=your-jwt-secret-key-here
```

**说明**：

- 长度建议32字符以上
- 请使用强随机字符串
- **务必保密**，不要泄露到代码仓库

**生成方式**：

```bash
# 使用Node.js生成随机字符串
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 完整的.env示例

```bash
# 数据库连接配置
DB_HOST=aws-1-ap-northeast-2.pooler.supabase.com
DB_PORT=5432
DB_USER=postgres.jzqpuoqisozftkznduhx
DB_PASSWORD=xiaoguai@0602
DB_NAME=postgres

SUPABASE_URL=https://jzqpuoqisozftkznduhx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# 登录系统加密密钥（新增）
CRYPTO_SECRET=your-32-character-secret-key-here
JWT_SECRET=your-jwt-secret-key-here

# 腾讯云翻译
TENCENTCLOUD_SECRET_ID=AKIDPXO1QXmcaISLJ2DkkDZmNqocMuugw4Mz
TENCENTCLOUD_SECRET_KEY=f4GKEd092f17yZ2JJ9k6C0aqDJFzb2Ol
TENCENTCLOUD_PROJECT_ID=1346464

# 其他环境变量
NODE_ENV=development
```

## Vercel部署配置

在Vercel项目设置中，需要配置相同的环境变量：

1. 进入项目设置页面
2. 找到"Environment Variables"
3. 添加以下变量：
    - `CRYPTO_SECRET`
    - `JWT_SECRET`
    - 其他已有的环境变量

**注意**：

- 开发环境和生产环境应使用**不同的密钥**
- 可以为不同环境（Development/Preview/Production）设置不同的值

## 安全建议

1. **绝不要**将密钥提交到Git仓库
2. **定期更换**密钥（需要重新加密所有密码）
3. 使用密钥管理服务（如1Password、AWS Secrets Manager）存储密钥
4. 团队成员应各自配置本地环境变量，不共享密钥文件
