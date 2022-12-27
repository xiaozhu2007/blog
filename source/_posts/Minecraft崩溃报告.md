---
title: 记一次对 Minecraft 的崩溃分析
img: /medias/featureimages/5.jpg
icon: app
category: 学习
tag:
  - Minecraft
isOriginal: false
abbrlink: 8111
date: 2021-11-25 00:00:00
---

来了解下 Minecraft 的崩溃报告吧!

<!-- more -->

## 0x00 前言

!> [WARNING] 本篇适用于 Minecraft 服务端/客户端报错。

!> [WARNING] 本篇适用于 Minecraft 服务端/客户端报错。

!> [WARNING] 本篇适用于 Minecraft 服务端/客户端报错。

我所说的报错，指的是一款名为《Minecraft》的游戏中的报错。并不是《我的世界(中国版)》的报错

在大家游玩 Minecraft 时，有时需要装一些 Forge 模组以此来提高可玩度，但自己配置模组包的时候，总会造成游戏崩溃，并且大多数人还连崩溃报告输出目录都不知道在哪，于是我想来改变这个现状

## 0x01 一些俏皮话

> Minecraft 这个游戏，各种 BUG 和解决方案如果写成一堆不重复的书，摞起来的厚度可以比姚明还高。

所以这个游戏不是一般的神奇，尤其是当你在看崩溃报告的时，你更会体验到这一点。

你不加模组，MC 也会崩溃，加了还是崩溃。这是一个比较罕见的情况。<br />
大多数情况是你一股脑加了一堆模组，然后突然崩了，就不知道怎么办了。<br />
幸运的是，这时候，你有<!-- 6 -->0%的概率可以找到问题所在并解决这个问题。

## 0x02 寻找崩溃日志

首先，你得知道你的客户端/服务端目录<br />
客户端的 CrashReport 文件夹目录:`.minecraft\crash-reports`<br />
如果你启用了版本隔离，那就在`.minecraft\versions\版本名\crash-reports`<br />
服务端的 CrashReport 在你的服务端根目录下。<br />
这个条件的前提是你的服务端是原版服务端

## 0x03 打开崩溃日志

嗯，我们都知道，crashreport 目录下的所有文件都是以`crash-日期_具体时间-server.txt`命名的

如果是客户端的崩溃报告日志,后面的 server 则是 client

然后我们找到一个日志打开并分析。

## 0x04 下载文本编辑器

首先你需要一个文本编辑器来查看崩溃报告，

这里我推荐微软官方的 Visaul Code.

然后我们就可以愉快地打开报告进行查看了。
