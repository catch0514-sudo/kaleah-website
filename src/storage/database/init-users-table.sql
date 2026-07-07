-- 科栎雅（KALEAH）用户系统数据库表
-- 请在 Supabase SQL Editor 中执行此脚本

-- 1. 用户表
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(128),
  nickname VARCHAR(128),
  phone VARCHAR(20),
  avatar TEXT,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE
);

-- 创建索引
CREATE INDEX IF NOT EXISTS users_email_idx ON users(email);

-- 2. 用户地址表
CREATE TABLE IF NOT EXISTS user_addresses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(128) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  province VARCHAR(50) NOT NULL,
  city VARCHAR(50) NOT NULL,
  district VARCHAR(50) NOT NULL,
  address VARCHAR(255) NOT NULL,
  is_default BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引
CREATE INDEX IF NOT EXISTS user_addresses_user_id_idx ON user_addresses(user_id);

-- 3. 订单表
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_no VARCHAR(32) NOT NULL UNIQUE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status VARCHAR(20) NOT NULL DEFAULT 'pending',
  total_amount INTEGER NOT NULL DEFAULT 0,
  item_count INTEGER NOT NULL DEFAULT 0,
  -- 收货地址信息
  receiver_name VARCHAR(128) NOT NULL,
  receiver_phone VARCHAR(20) NOT NULL,
  receiver_province VARCHAR(50) NOT NULL,
  receiver_city VARCHAR(50) NOT NULL,
  receiver_district VARCHAR(50) NOT NULL,
  receiver_address VARCHAR(255) NOT NULL,
  -- 物流信息
  shipping_company VARCHAR(100),
  shipping_no VARCHAR(100),
  shipped_at TIMESTAMP WITH TIME ZONE,
  delivered_at TIMESTAMP WITH TIME ZONE,
  -- 订单商品（JSON存储）
  items JSONB NOT NULL DEFAULT '[]',
  -- 时间戳
  paid_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE
);

-- 创建索引
CREATE INDEX IF NOT EXISTS orders_order_no_idx ON orders(order_no);
CREATE INDEX IF NOT EXISTS orders_user_id_idx ON orders(user_id);
CREATE INDEX IF NOT EXISTS orders_status_idx ON orders(status);

-- 4. 浏览记录表
CREATE TABLE IF NOT EXISTS browse_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  product_id INTEGER NOT NULL,
  product_name VARCHAR(255) NOT NULL,
  product_image TEXT NOT NULL,
  product_price VARCHAR(50) NOT NULL,
  product_category VARCHAR(100),
  viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引
CREATE INDEX IF NOT EXISTS browse_history_user_id_idx ON browse_history(user_id);
CREATE INDEX IF NOT EXISTS browse_history_product_id_idx ON browse_history(product_id);

-- 5. 启用 RLS (Row Level Security)
-- 注意：生产环境建议启用 RLS 以提高安全性

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE browse_history ENABLE ROW LEVEL SECURITY;

-- 6. 创建 RLS 策略（允许所有操作，开发阶段使用）
-- 生产环境请根据实际需求调整策略

CREATE POLICY "Allow all for users" ON users FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for user_addresses" ON user_addresses FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for orders" ON orders FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for browse_history" ON browse_history FOR ALL USING (true) WITH CHECK (true);

-- 完成
-- 创建完成后，请确保在 Supabase 项目设置中配置正确的环境变量：
-- COZE_SUPABASE_URL: 你的 Supabase 项目 URL
-- COZE_SUPABASE_ANON_KEY: 你的 Supabase anon/public key
