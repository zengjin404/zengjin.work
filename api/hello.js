module.exports = {
  default: function handler(req, res) {
    const { method } = req;
    
    if (method === 'GET') {
      return res.status(200).json({
        message: 'Hello World!',
        timestamp: new Date().toISOString()
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  }
} 