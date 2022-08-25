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
    if (pathname.match(/\/sw\.js/g)) return fetch(req)
    if (pathname.match('/cdn-cgi/')) return new Response(null, { status: 403 })
    const path = pathname.split('?')[0]
    const query = q => urlObj.searchParams.get(q)
    const nqurl = urlStr.split('?')[0]
    const nqreq = new Request(nqurl)
    
    if (query('nosw') == 'true') {
        return fetch(req)
    }
    if (domain.match("unpkg.com")) {
        return fetch(req.url.replace("https://unpkg.com", "https://zhimg.unpkg.com"));
    } else {
        return fetch(req)
    }
}

const handleerr = async (req, msg) => {
    return new Response(`<h1>网站遇到了致命错误</h1>
    <b>${msg}</b>`, { headers: { "content-type": "text/html; charset=utf-8" } })
}
const handlecgi = async (req) => {
    const intelligent_size = (byte) => {
        if (byte < 1024) {
            return `${byte}B`
        } else if (byte < 1024 * 1024) {
            return `${(byte / 1024).toFixed(2)}KB`
        } else if (byte < 1024 * 1024 * 1024) {
            return `${(byte / 1024 / 1024).toFixed(2)}MB`
        } else {
            return `${(byte / 1024 / 1024 / 1024).toFixed(2)}GB`
        }
    }
    const urlStr = req.url
    let urlObj = new URL(urlStr)
    const pathname = urlObj.href.substr(urlObj.origin.length)
    const query = q => urlObj.searchParams.get(q)
    const endpoint = "https://cdn1.tianli0.top/npm/chenyfan-blog-helper-dash@0.0.9/"
    let dash_main = await (await fetch(endpoint + 'index.html')).text()
    let client_ip = await (await fetch('https://icanhazip.com/')).text()
    return new Response(dash_main
                .replace(/<!--IP-->/g, client_ip)
                .replace(/<!--SECTION-->/g, '')
                , {
                    headers: {
                        'Content-Type': 'text/html'
                    }
                })
}

