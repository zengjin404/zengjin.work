# 项目环境配置说明

## 数据库连接配置

本项目使用环境变量来管理数据库连接信息，以确保敏感信息不会被提交到代码仓库中。

### 本地开发环境设置

1. 在项目根目录创建一个 `.env` 文件（该文件已被添加到 `.gitignore` 中，不会被提交）
2. 参考 `.env.example` 文件，在 `.env` 文件中设置以下环境变量：

```
# 数据库连接配置
DB_HOST=your_database_host
DB_PORT=5432
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name

# 其他环境变量
NODE_ENV=development
```

### Vercel 生产环境设置

在 Vercel 部署时，请在 Vercel 项目设置中配置以下环境变量：

- `DB_HOST`
- `DB_PORT`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`
- `NODE_ENV=production`

## 注意事项

- 请勿在代码中硬编码数据库连接信息
- 确保 `.env` 文件不会被提交到代码仓库
- 在生产环境中，通过 Vercel 的环境变量设置来配置数据库连接
