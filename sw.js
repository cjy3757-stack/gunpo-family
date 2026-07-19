const CACHE='gunpo-eunhye-family-v8.6.0';
const ASSETS=['./','./index.html','./data.js','./service-data.js','./office-data.js','./finance-data.js','./manifest.webmanifest','./attendance-index.json','./logo.png','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',e=>{
  const url=new URL(e.request.url);
  if(url.pathname.endsWith('.xlsx')){e.respondWith(fetch(e.request,{cache:'no-store'}));return;}
  e.respondWith(fetch(e.request).then(r=>{const x=r.clone();caches.open(CACHE).then(c=>c.put(e.request,x));return r;}).catch(()=>caches.match(e.request)));
});
