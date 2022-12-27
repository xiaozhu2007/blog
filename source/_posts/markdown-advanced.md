---
title: 一些关于 Markdown 的奇技淫巧
img: "https://lz-oss-0.s3.ladydaily.com/1870963-3904c48d0860d6e1.webp"
toc: false
top: false
mathjax: false
categories: 学习
tags:
  - Github
keywords: Github,MarkDown,markdown
date: 2022-12-18 12:15:15
isOriginal: true
---

自从几年前开始在 GitHub 玩耍，接触到 Markdown 之后，就深深的爱上了它，在各种文档编辑上，有条件用 Markdown 的尽量用，不能用的创造条件也要用——README、博客、接口文档等等全都是。

这几年也发现越来越多的网站和程序提供了对 Markdown 的支持，从最初接触的 GitHub、Jekyll，到简书、CSDN 等等，由此也从别人做得好的文档中，学到了一些『奇技淫巧』，所以本文不是对 Markdown 基础语法的介绍，而是一些相对高级、能将 Markdown 玩出更多花样的小技巧。

> 注：如下技巧大多是利用 Markdown 兼容部分 HTML 标签的特性来完成，不一定在所有网站和软件里都完全支持，主要以 GitHub 支持为准。

## 在表格单元格里换行

借助于 HTML 里的 `<br />` 实现。

示例代码：

```markdown
| Header1 | Header2                          |
| ------- | -------------------------------- |
| item 1  | 1. one<br />2. two<br />3. three |
```

示例效果：

| Header1 | Header2                          |
| ------- | -------------------------------- |
| item 1  | 1. one<br />2. two<br />3. three |

## 图文混排

使用 <img> 标签来贴图，然后指定 align 属性。

示例代码：

```markdown
<img align="right" src="https://raw.githubusercontent.com/mzlogin/mzlogin.github.io/master/images/posts/markdown/demo.png"/>

这是一个示例图片。

图片显示在 N 段文字的右边。

N 与图片高度有关。

刷屏行。

刷屏行。
```

到这里应该不会受影响了，本行应该延伸到了图片的正下方，所以我要足够长才能确保不同的屏幕下都看到效果。

## 控制图片大小和位置

标准的 Markdown 图片标记 ![]() 无法指定图片的大小和位置，只能依赖默认的图片大小，默认居左。

而有时候源图太大想要缩小一点，或者想将图片居中，就仍需要借助 HTML 的标签来实现了。图片居中可以使用 <div> 标签加 align 属性来控制，图片宽高则用 width 和 height 来控制。

示例代码：

**图片默认显示效果：**

```markdown
![](https://raw.githubusercontent.com/mzlogin/mzlogin.github.io/master/images/posts/markdown/demo.png)
```

**加以控制后的效果：**

```html
<div align="center">
  <img
    width="65"
    height="75"
    src="https://raw.githubusercontent.com/mzlogin/mzlogin.github.io/master/images/posts/markdown/demo.png"
  />
</div>
```

是不是看着舒服多了？

## 使用 Emoji

这个是 GitHub 对标准 Markdown 标记之外的扩展了，用得好能让文字生动一些。

示例代码：

```markdown
我和我的小伙伴们都笑了。:smile:
```

示例效果：

我和我的小伙伴们都笑了。:smile:

更多可用 Emoji 代码参见 <https://www.webpagefx.com/tools/emoji-cheat-sheet/>。

## 行首缩进

直接在 Markdown 里用空格和 Tab 键缩进在渲染后会被忽略掉，需要借助 HTML 转义字符在行首添加空格来实现，&ensp;代表半角空格，&emsp; 代表全角空格。

示例代码：

```markdown
&emsp;&emsp;春天来了，又到了万物复苏的季节。
```

## 展示数学公式

如果是在 GitHub Pages 和 Hexo，可以参考 `http://wanguolin.github.io/mathmatics_rending/` 使用 MathJax 来优雅地展示数学公式（非图片）。

如果是在 GitHub 项目的 README 等地方，目前我能找到的方案只能是贴图了，以下是一种比较方便的贴图方案：

在 https://www.codecogs.com/latex/eqneditor.php 网页上部的输入框里输入 LaTeX 公式，比如 `$$x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}$$`；
在网页下部拷贝 URL Encoded 的内容，比如以上公式生成的是 https://latex.codecogs.com/png.image?%5Chuge%20%5Cdpi%7B300%7D%5Cdpi%7B200%7D%5Cint%20%5Cfrac%7B1%7D%7Bx%7D%20dx%20=%20%5Cln%20%5Cleft%7C%20x%20%5Cright%7C%20&plus;%20C

3. 在文档需要的地方使用以上 URL 贴图，比如

![](https://latex.codecogs.com/png.image?%5Chuge%20%5Cdpi%7B300%7D%5Cdpi%7B200%7D%5Cint%20%5Cfrac%7B1%7D%7Bx%7D%20dx%20=%20%5Cln%20%5Cleft%7C%20x%20%5Cright%7C%20+%20C)

## 任务列表

在 GitHub 和 GitLab 等网站，除了可以使用有序列表和无序列表外，还可以使用任务列表，很适合要列出一些清单的场景。

示例代码：

```markdown
**购物清单**

- [ ] 一次性水杯
- [x] 西瓜
- [ ] 豆浆
- [x] 可口可乐
- [ ] 小茗同学
```

## 自动维护目录

有时候维护一份比较长的文档，希望能够自动根据文档中的标题生成目录（Table of Contents），并且当标题有变化时自动更新目录，能减轻工作量，也不易出错。

如果你使用 `Vim` 编辑器，那可以使用插件 `vim-markdown-toc` 来帮你完美地解决此事。

[[toc]]

如果你使用其它编辑器，一般也能找到对应的解决方案，比如 Atom 编辑器的 `markdown-toc` 插件，Sublime Text 的 `MarkdownTOC` 插件等。

## 后话

好了，这一波的奇技淫巧就此告一段落，希望大家在了解这些之后能有所收获。

如果你觉得本文对你有帮助，欢迎[关注我的频道](https://www.youtube.com/channel/UCOE6Ckq2Pip08Ia1Zg6dUGA)，获取更多有帮助的内容。

## 参考

https://raw.githubusercontent.com/matiassingers/awesome-readme/master/readme.md
https://www.zybuluo.com/songpfei/note/247346
https://www.youtube.com/channel/UCOE6Ckq2Pip08Ia1Zg6dUGA
