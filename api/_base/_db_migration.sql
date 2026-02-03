-- 用户会话表
-- 用于管理 Refresh Token 和会话状态
CREATE TABLE IF NOT EXISTS base_user_session (
  id BIGSERIAL PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL REFERENCES base_user(id) ON DELETE CASCADE,
  refresh_token_hash VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL,
  revoked_at TIMESTAMPTZ,
  user_agent TEXT,
  ip_address VARCHAR(45)
);

-- 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_base_user_session_user_id ON base_user_session(user_id);
CREATE INDEX IF NOT EXISTS idx_base_user_session_token_hash ON base_user_session(refresh_token_hash);
CREATE INDEX IF NOT EXISTS idx_base_user_session_expires_at ON base_user_session(expires_at);

-- 添加注释
COMMENT ON TABLE base_user_session IS '用户会话表，存储refresh token哈希值和会话信息';
COMMENT ON COLUMN base_user_session.user_id IS '关联的用户ID';
COMMENT ON COLUMN base_user_session.refresh_token_hash IS 'Refresh Token的SHA256哈希值';
COMMENT ON COLUMN base_user_session.created_at IS '会话创建时间';
COMMENT ON COLUMN base_user_session.expires_at IS '会话过期时间';
COMMENT ON COLUMN base_user_session.revoked_at IS '会话撤销时间，NULL表示未撤销';
COMMENT ON COLUMN base_user_session.user_agent IS '客户端User-Agent';
COMMENT ON COLUMN base_user_session.ip_address IS '客户端IP地址';
