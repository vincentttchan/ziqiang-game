/**
 * Vercel Serverless Function：接收遊戲事件並寫入 Supabase
 *
 * 路由：POST /api/track
 * Body 格式：{ events: [ {eventName, payload, timestamp, sessionId, class, studentId, appVersion, url}, ... ] }
 *
 * 環境變數（在 Vercel Dashboard → Settings → Environment Variables 設定）：
 *   SUPABASE_URL              例如 https://abcdefgh.supabase.co
 *   SUPABASE_SERVICE_ROLE_KEY 用 service role key（伺服器端，可寫入）
 *
 * 為何用 service role key 而非 anon key：
 *   service role 可繞過 Row Level Security，純後端使用安全；切勿洩漏到前端。
 */

export default async function handler(req, res) {
  // CORS：允許自己網域，亦兼容本機開發
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env;
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return res.status(500).json({ error: 'Server not configured' });
  }

  let body = req.body;
  // Vercel 一般已自動解析 JSON，但 sendBeacon 送來的 Blob 可能是 raw text
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch (e) {
      return res.status(400).json({ error: 'Invalid JSON' });
    }
  }

  const events = Array.isArray(body?.events) ? body.events : null;
  if (!events || events.length === 0) {
    return res.status(400).json({ error: 'No events' });
  }

  // 限制每批最多 100 條，防止濫用
  if (events.length > 100) {
    return res.status(413).json({ error: 'Batch too large' });
  }

  // 取得 client IP（僅用於濫用偵測，不做精確定位）
  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || null;
  const userAgent = req.headers['user-agent'] || null;

  // 轉換為 Supabase 表格列格式
  const rows = events.map(ev => ({
    event_name: String(ev.eventName || '').slice(0, 64),
    payload: ev.payload || {},
    client_timestamp: ev.timestamp || null,
    session_id: ev.sessionId || null,
    class_name: ev.class || null,
    student_id: ev.studentId || null,
    app_version: ev.appVersion || null,
    page_url: (ev.url || '').slice(0, 256),
    client_ip: ip,
    user_agent: userAgent ? userAgent.slice(0, 256) : null,
  }));

  // 直接呼叫 Supabase REST API（不用 SDK，減少冷啟動）
  try {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/game_events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify(rows),
    });
    if (!r.ok) {
      const txt = await r.text();
      console.error('Supabase error:', r.status, txt);
      return res.status(502).json({ error: 'Database error' });
    }
    return res.status(200).json({ ok: true, inserted: rows.length });
  } catch (e) {
    console.error('Fetch error:', e);
    return res.status(500).json({ error: 'Internal error' });
  }
}
