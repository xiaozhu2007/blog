const CACHE_NAME = 'PigCDNCache';
let cachelist = [
    '/offline.html',
    'https://npm.elemecdn.com/chenyfan-os@0.0.0-r6'
];

///// 监听器 /////
self.addEventListener('install', async function (installEvent) {
    self.skipWaiting();
    installEvent.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(cachelist);
            })
    );
});

self.addEventListener('fetch', async event => {
    try {
        event.respondWith(handle(event.request))
    } catch (msg) {
        event.respondWith(handleerr(event.request, msg))
    }
});

self.addEventListener('message', (event) => {
  console.log(event.data)
  //输出
});

///// 处理器 /////
const handle = async (req) => {
    const domain = req.url.split('/')[2];
    if (domain.match("unpkg.com")) {
        return fetch(req.url.replace("https://unpkg.com", "https://zhimg.unpkg.com"));
    }
    else {
        return fetch(req)
    }
}

const handleerr = async (req, msg) => {
    return new Response(`<h1>网站遇到了致命错误</h1>
    <b>${msg}</b>`, { headers: { "content-type": "text/html; charset=utf-8" } })
}
