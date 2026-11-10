// api/supabase-proxy.js
export const config = { runtime: 'edge' };

const SUPABASE_URL = 'https://sbfbvngaoywjgkdmoelg.supabase.co';

export default async function handler(req) {
  const url = new URL(req.url);
  
  // 注意：因为我们是通过 /api/supabase-proxy 访问的，所以这里要去掉这个前缀
  const targetPath = url.pathname.replace(/^\/api\/supabase-proxy/, '');
  const targetUrl = `${SUPABASE_URL}${targetPath}${url.search}`;

  // 复制并清理请求头
  const headers = new Headers();
  req.headers.forEach((value, key) => {
    if (key.toLowerCase() !== 'host') {
      headers.set(key, value);
    }
  });

  const fetchOptions = {
    method: req.method,
    headers,
  };

  if (!['GET', 'HEAD'].includes(req.method)) {
    fetchOptions.body = req.body;
  }

  const response = await fetch(targetUrl, fetchOptions);

  return new Response(response.body, {
    status: response.status,
    headers: response.headers,
  });
}
