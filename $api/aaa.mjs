// Docs on request and context https://docs.netlify.com/functions/build/#code-your-function-2
export default async (req, context) => {
	// 处理 OPTIONS 预检请求
  if (req.method == 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    });
  }
  
  try {
    const url = new URL(req.url)
    const subject = url.searchParams.get('name') || 'World'

    return new Response(JSON.stringify({msg: `Hello ${subject}`})
    , {
     headers: {
       'Access-Control-Allow-Origin': '*',
       'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
       'Access-Control-Allow-Headers': 'Content-Type, Authorization',
     }
    }
    )
  } catch (error) {
    return new Response(JSON.stringify({msg: error.toString()})
    , {
     status: 500,
     headers: {
       'Access-Control-Allow-Origin': '*' // 错误响应也要加 CORS 头
     }
    }
    )
  }
}
