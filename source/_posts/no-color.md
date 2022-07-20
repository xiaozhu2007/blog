---
title: 修改网站为(黑白)灰色代码
img: '/medias/featureimages/5.jpg'
date: 2020-06-14 19:30:53
---


```HTML
<style>
html {
	/* //以下代码通过滤镜将页面中所有的彩色去掉，适用于各种纪念日，请维护人员及时删除或注释掉 */
	filter:progid:DXImageTransform.Microsoft.BasicImage(grayscale=1); 
	filter: grayscale(100%);
	-webkit-filter: grayscale(100%);
	-moz-filter: grayscale(100%);
	-ms-filter: grayscale(100%);
	-o-filter: grayscale(100%);
	filter: gray;
	-webkit-filter: grayscale(1); 
	/* //去彩色代码结束 */
}
</style>

```
将上面代码粘贴到你的 网站<head>……</head> 中；

或者您的header模板文件里