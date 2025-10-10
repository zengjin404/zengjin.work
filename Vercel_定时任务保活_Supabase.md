# Vercel 定时任务保活 Supabase

## Core Features

- 定时只读查询保持 Supabase 活跃

- GET 手动触发健康检查

- 轻量操作，控制超时与重试

- 标准化错误处理与安全日志

- 无副作用与幂等保证

## Tech Stack

{
  "Web": null,
  "iOS": null,
  "Android": null,
  "Backend": "Vercel Serverless Functions (Node.js) + Vercel Cron + @supabase/supabase-js + 环境变量配置"
}

## Design

无界面，提供可读健康检查响应与安全日志

## Plan

Note: 

- [ ] is holding
- [/] is doing
- [X] is done

---

[X] 需求分析与方案制定

[ ] 实现 /api/base/keepalive 接口，提供 GET 动作，返回健康检查结果

[ ] 集成 Supabase 客户端，读取环境变量并建立只读会话

[ ] 实现轻量级只读查询（listUsers 或 head-only count），控制超时与重试

[ ] 加入错误处理与标准响应：成功/失败结果、错误码与安全日志

[ ] 配置 Vercel Cron，每周至少一次触发 /api/base/keepalive

[ ] 提供本地与线上手动触发验证方式，返回可读状态信息

[ ] 保护与幂等：确保无写操作，不触达业务表，避免副作用
