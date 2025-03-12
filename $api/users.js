const pool = require('./db/config');

// 模拟数据库
let users = [
  { id: 1, name: '张三', email: 'zhangsan@example.com' },
  { id: 2, name: '李四', email: 'lisi@example.com' }
];

module.exports = {
  default: async function handler(req, res) {
    const { method } = req;
    const operation = req.url.split('/').pop();

    try {
      switch (operation) {
        case 'select':
          const [users] = await pool.query('SELECT * FROM users ORDER BY id DESC');
          return res.status(200).json(users);
          
        case 'login':
          if (method !== 'POST') {
            return res.status(405).json({ error: '登录必须使用 POST 方法' });
          }
          // 处理登录逻辑...
          break;
          
        case 'GET':
          // 获取用户列表
          return res.status(200).json(users);

        case 'POST':
          try {
            const { name, email } = req.body;
            
            if (!name || !email) {
              return res.status(400).json({ error: '名称和邮箱都是必需的' });
            }

            const newUser = {
              id: users.length + 1,
              name,
              email
            };

            users.push(newUser);
            return res.status(201).json(newUser);
          } catch (error) {
            return res.status(400).json({ error: '无效的请求数据' });
          }

        default:
          res.setHeader('Allow', ['GET', 'POST']);
          return res.status(405).json({ error: `不支持 ${method} 方法` });
      }
    } catch (error) {
      console.error('操作错误:', error);
      return res.status(500).json({ error: '服务器内部错误' });
    }
  }
} 