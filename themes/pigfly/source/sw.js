///// 定义 /////
const CACHE_NAME = 'PigCDNCache';
self.cons = {
    s: (m) => {
        console.log(`%c[SUCCESS]%c ${m}`, 'color:white;background:green;', '')
    },
    w: (m) => {
        console.log(`%c[WARNING]%c ${m}`, 'color:brown;background:yellow;', '')
    },
    i: (m) => {
        console.log(`%c[INFO]%c ${m}`, 'color:white;background:blue;', '')
    },
    e: (m) => {
        console.log(`%c[ERROR]%c ${m}`, 'color:white;background:red;', '')
    },
    d: (m) => {
        console.log(`%c[DEBUG]%c ${m}`, 'color:white;background:black;', '')
    }
}

const generate_uuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

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
    const urlStr = req.url
    let urlObj = new URL(urlStr)
    const pathname = urlObj.href.substr(urlObj.origin.length)
    const port = urlObj.port
    const domain = (urlStr.split('/'))[2]
    if (pathname.match(/\/sw\.js/g)) { return fetch(req) }
    if (pathname.match('/cdn-cgi/')) return new Response(null, { status: 400 })
    
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
