// Offline support: network first, fall back to the saved copy.
const C='calc-tools-v1';
self.addEventListener('install', e=>{ self.skipWaiting(); e.waitUntil(caches.open(C).then(c=>c.addAll(['./','./index.html']).catch(()=>{}))); });
self.addEventListener('activate', e=>{ e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', e=>{
  const r=e.request; if(r.method!=='GET') return;
  e.respondWith(fetch(r).then(res=>{ if(res && (res.ok || res.type==='opaque')){ const cp=res.clone(); caches.open(C).then(c=>c.put(r,cp)); } return res; })
    .catch(()=>caches.match(r,{ignoreSearch:true}).then(m=>m || caches.match('./index.html'))));
});
