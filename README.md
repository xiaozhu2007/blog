<div align="center">
  <h1>HackPig520's Blog</h1>

[![Netlify Status](https://api.netlify.com/api/v1/badges/78c67981-3f26-4c95-bdc8-c311ed58fd1e/deploy-status)](https://app.netlify.com/sites/xiaozhu2007/deploys)[![Made with ❤](https://flat.badgen.net/badge/made%20with/%e2%9d%a4/ff69b4)](blog)

</div>

<h2 align="center"><a href="https://xiaozhu2007.netlify.app/friends/">查看网站</a></h2>
<p align="center">
  <a href="https://github.com/xiaozhu2007">
    <img src="https://ghchart.rshah.org/xiaozhu2007" alt="xiaozhu2007's Github chart" />
  </a>
</p>
<div align="center">欢迎添加友情链接!不过您需要注意以下几点:</div>
	
+ 0.确保站点内容不违反中国大陆法律

- 1.建站时间不小于**6 个月**.

- 2.确定不会随随便便跑路.

- 3.时间达到 30 天无法正常访问的将会被删除, 解决方法参见第 8 条.

- 4.我们对免费二级域名(如：\*.netlify.app、\*.gitlab.io、\*.coding.me、\*.github.io 等)和免费顶级域名给予支持.

- 5.确保站点可以以 HTTPS 访问,可以不强制 HTTPS.

- 6.拥有尽可能多的原创内容.

- 7.如果因特殊原因而更换地址，请提出 Issues!

---

添加方式：

- 进入[本仓库][gh_blog], 直接修改(友链配置文件)
  <https://github.com/xiaozhu2007/blog/blob/master/source/_data/friends.json> 按照示例规则添加友链.

- Commit Message 请填写 `添加友链 <你的博客地址，不带协议，不带斜杠>` （不要添加尖括号!），否则打回重新提交.

- 修改下方的选项为`Create a new branch for this commit and start a pull request.`.

- 修改方框内文字为`links/<你的博客名称缩写(小写)>`，例如`blog.loser114514.io`可以填写为`links/loser114514`.

- 点击`Sign off and commit changes`，确认无误后，向仓库发起 PullRequest.

## API

没错，我们提供了一些基于 Netlify Functions 的 API 服务，具体如下：

| API Endpoint    | 需要 Token | 参数                                                     | 使用限制(有 Token 可绕过)          | 返回类型 |
| --------------- | ---------- | -------------------------------------------------------- | ---------------------------------- | :------: |
| `/_/dns-lookup` | 可选       | `hostname`：需要查询的目标地址，`type`：指定查询的[类型] | 30 次/小时/IP，超限直接永久封禁 IP |   JSON   |
| `/_/emoji`      | 可选       | 无                                                       | 30 次/小时/IP，超限直接永久封禁 IP |   JSON   |
| `/_/ping`       | 可选       | `msg`：指定返回信息                                      | 30 次/小时/IP，超限直接永久封禁 IP |   JSON   |

当前支持的 Enderpoint 列表：

```
xiaozhu2007.netlify.app
liuzhen932.fun(2023/11/21起不再支持，请等待更换新域名)
pig.cn.eu.org(2022/12/28起不再支持，请使用其他的 Enderpoint)
```

### 以下列出了有效的 `types` 值

- 'A' IPV4 地址, 默认
- 'AAAA' IPV6 地址
- 'MX' 邮件交换记录
- 'TXT' text 记录
- 'SRV' SRV 记录
- 'PTR' 用来反向 IP 查找
- 'NS' 域名服务器记录
- 'CNAME' 别名记录
- 'SOA' 授权记录的初始值

### 错误码
每次 DNS 查询都可能返回以下错误码：
```
dns.NODATA: 无数据响应。
dns.FORMERR: 查询格式错误。
dns.SERVFAIL: 常规失败。
dns.NOTFOUND: 没有找到域名。
dns.NOTIMP: 未实现请求的操作。
dns.REFUSED: 拒绝查询。
dns.BADQUERY: 查询格式错误。
dns.BADNAME: 域名格式错误。
dns.BADFAMILY: 地址协议不支持。
dns.BADRESP: 回复格式错误。
dns.CONNREFUSED: 无法连接到 DNS 服务器。
dns.TIMEOUT: 连接 DNS 服务器超时。
dns.EOF: 文件末端。
dns.FILE: 读文件错误。
dns.NOMEM: 内存溢出。
dns.DESTRUCTION: 通道被摧毁。
dns.BADSTR: 字符串格式错误。
dns.BADFLAGS: 非法标识符。
dns.NONAME: 所给主机不是数字。
dns.BADHINTS: 非法HINTS标识符。
dns.NOTINITIALIZED: c c-ares 库尚未初始化。
dns.LOADIPHLPAPI: 加载 iphlpapi.dll 出错。
dns.ADDRGETNETWORKPARAMS: 无法找到 GetNetworkParams 函数。
dns.CANCELLED: 取消 DNS 查询。
```

### API Token 购买 & 使用

在[爱发电][afdian]赞助我`5`元即可获得 API Token；食用方法：添加参数`token`，参数值为您的 Token 值。如：`/_/something?token=kgbnvPFYtH8RYxxRt3JPekmR5ChFhRL5`

[blog]: https://xiaozhu2007.netlify.app/
[pigfly]: https://github.com/xiaozhu2007/hexo-theme-pigfly
[gh_blog]: https://github.com/xiaozhu2007/blog
[afdian]: https://afdian.net/order/create?plan_id=5931b3de017b11eca91752540025c377&product_type=0
