---
title: 关于 CloudFlare Workers 的奇技淫巧
img: "https://s1.ax1x.com/2022/11/30/zw4etP.png"
toc: false
top: false
mathjax: false
categories: 学习
tags:
  - 白嫖
keywords: CloudFlare, Workers
isOriginal: true
date: 2022-12-29 15:35:15
---

# 关于 CloudFlare Workers 的奇技淫巧

## 基础

首先你要有个 [Cloudflare] 账户, 这是必须的. 需要注意的是 [Cloudflare] 的 [Workers] 一天只有 `10` 万次免费额度, 不过已经够用了.

### Hello World!

登录到 [Cloudflare] 的面板, 先点击右上角的 `English(US)` 并换成 `简体中文`

点击左上角的 `菜单` -> `Workers` 进入到 `Workers` 页面. 新注册的用户会提示设置一个 `workers.dev` 顶级域名下的二级子域名, 这个子域名设置好之后是可更改的, 之后你新创建的 Worker 就会使以这个域名而二级子域名开始的.

设置好二级子域名之后选择 `Free` 套餐计划————这样可以白嫖, 然后进入到 Worker 管理界面, 创建一个新的 `Worker` 然后在 `Script` 输入框里填入以下代码. `worker.js` 代码可以参考 xiaozhu20007/CFWorkers.

```js 最简短的反代代码.js
const t_url = "https://raw.githubusercontent.com"; // 目标

addEventListener("fetch", (event) => {
  event.respondWith(
    handleRequest(event.request).catch(
      (err) => new Response(err.stack, { status: 500 })
    )
  );
});
async function handleRequest(request) {
  const { pathname, search } = new URL(request.url);
  let html = await fetch(t_url + pathname + search);
  return html;
}
```

修改好代码之后点击左下角的 `Save and Deploy` 然后 `Preview` 看看页面是否显示正常，如果显示正常恭喜你成功啦.

## 进阶

### 优化 Google Analytics 使用体验

代码如下：

```js Google_Analytics加速.js
// 转载自https://raw.githubusercontent.com/SukkaW/cloudflare-workers-async-google-analytics/master/worker.js
//const AllowedReferrer = 'skk.moe'; // ['skk.moe', 'suka.js.org'] multiple domains is supported in array format

addEventListener("fetch", (event) => {
  event.respondWith(response(event));
});

async function senData(event, url, uuid, user_agent, page_url) {
  const encode = (data) => encodeURIComponent(decodeURIComponent(data));

  const getReqHeader = (key) => event.request.headers.get(key);
  const getQueryString = (name) => url.searchParams.get(name);

  const reqParameter = {
    headers: {
      Host: "www.google-analytics.com",
      "User-Agent": user_agent,
      Accept: getReqHeader("Accept"),
      "Accept-Language": getReqHeader("Accept-Language"),
      "Accept-Encoding": getReqHeader("Accept-Encoding"),
      "Cache-Control": "max-age=0",
    },
  };

  const pvData = `tid=${encode(getQueryString("ga"))}&cid=${uuid}&dl=${encode(
    page_url
  )}&uip=${getReqHeader("CF-Connecting-IP")}&ua=${user_agent}&dt=${encode(
    getQueryString("dt")
  )}&de=${encode(getQueryString("de"))}&dr=${encode(
    getQueryString("dr")
  )}&ul=${getQueryString("ul")}&sd=${getQueryString("sd")}&sr=${getQueryString(
    "sr"
  )}&vp=${getQueryString("vp")}`;

  const perfData = `plt=${getQueryString("plt")}&dns=${getQueryString(
    "dns"
  )}&pdt=${getQueryString("pdt")}&rrt=${getQueryString(
    "rrt"
  )}&tcp=${getQueryString("tcp")}&srt=${getQueryString(
    "srt"
  )}&dit=${getQueryString("dit")}&clt=${getQueryString("clt")}`;

  const pvUrl = `https://www.google-analytics.com/collect?v=1&t=pageview&${pvData}&z=${getQueryString(
    "z"
  )}`;
  const perfUrl = `https://www.google-analytics.com/collect?v=1&t=timing&${pvData}&${perfData}&z=${getQueryString(
    "z"
  )}`;

  await fetch(pvUrl, reqParameter);
  await fetch(perfUrl, reqParameter);
}

async function response(event) {
  const url = new URL(event.request.url);

  const getReqHeader = (key) => event.request.headers.get(key);

  const Referer = getReqHeader("Referer");
  const user_agent = getReqHeader("User-Agent");
  const ref_host = (() => {
    try {
      return new URL(Referer).hostname;
    } catch (e) {
      return "";
    }
  })();

  let needBlock = false;

  needBlock =
    !ref_host ||
    ref_host === "" ||
    !user_agent ||
    !url.search.includes("ga=UA-")
      ? true
      : false;

  if (
    typeof AllowedReferrer !== "undefined" &&
    AllowedReferrer !== null &&
    AllowedReferrer
  ) {
    let _AllowedReferrer = AllowedReferrer;

    if (!Array.isArray(AllowedReferrer)) _AllowedReferrer = [_AllowedReferrer];

    const rAllowedReferrer = new RegExp(_AllowedReferrer.join("|"), "g");

    needBlock = !rAllowedReferrer.test(ref_host) ? true : false;
    console.log(_AllowedReferrer, rAllowedReferrer, ref_host);
  }

  if (needBlock) {
    return new Response("403 Forbidden", {
      headers: { "Content-Type": "text/html" },
      status: 403,
      statusText: "Forbidden",
    });
  }

  const getCookie = (name) => {
    const pattern = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    const r = (getReqHeader("cookie") || "").match(pattern);
    return r !== null ? unescape(r[2]) : null;
  };

  const createUuid = () => {
    let s = [];
    const hexDigits = "0123456789abcdef";
    for (let i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    return s.join("");
  };

  const _uuid = getCookie("uuid");
  const uuid = _uuid ? _uuid : createUuid();

  // To sent data to google analytics after response id finished
  event.waitUntil(senData(event, url, uuid, user_agent, Referer));

  // Return an 204 to speed up: No need to download a gif
  let response = new Response(null, {
    status: 204,
    statusText: "No Content",
  });

  if (!_uuid)
    response.headers.set(
      "Set-Cookie",
      `uuid=${uuid}; Expires=${new Date(
        new Date().getTime() + 365 * 86400 * 30 * 1000
      ).toGMTString()}; Path='/';`
    );

  return response;
}
```

（未完待续）

[cloudflare]: https://cloudflare.com/
[workers]: https://cloudflareworkers.com/
