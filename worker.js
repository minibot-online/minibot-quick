// MiniBot Quick — اپ مدیریت سریع شخصی
// فایل‌های استاتیک سرو می‌شوند و درخواست‌های API به سرور ربات پروکسی می‌شوند.
const UPSTREAM = "https://minibot-mine.onrender.com"; // سرور ۱ — نگهدارنده لیست سرورها

let _regCache = { ts: 0, list: [] };
async function getRegistry() {
  if (Date.now() - _regCache.ts < 60000 && _regCache.list.length) return _regCache.list;
  try {
    const r = await fetch(UPSTREAM + "/api/servers", { headers: { "Content-Type": "application/json" } });
    const j = await r.json();
    const list = (j && Array.isArray(j.servers) ? j.servers : []).filter(s => s && s.id && /^https:\/\/[a-z0-9.-]+/i.test(s.url || ""));
    _regCache = { ts: Date.now(), list };
    return list;
  } catch (e) { return _regCache.list || []; }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname.startsWith("/api")) {
      let target = UPSTREAM;
      const isRegistryPath = url.pathname === "/api/servers" || url.pathname === "/api/admin/servers";
      const sid = isRegistryPath ? null : request.headers.get("x-server");
      if (sid) {
        const reg = await getRegistry();
        const s = reg.find(x => x.id === sid);
        if (s) target = s.url;
      }
      const upstreamReq = new Request(target + url.pathname + url.search, request);
      upstreamReq.headers.delete("x-server");
      return fetch(upstreamReq);
    }
    const res = await env.ASSETS.fetch(request);
    if (url.pathname.endsWith("/") || url.pathname.endsWith(".html") || !url.pathname.split("/").pop().includes(".")) {
      const h = new Headers(res.headers);
      h.set("Cache-Control", "no-store");
      return new Response(res.body, { status: res.status, headers: h });
    }
    return res;
  }
};
