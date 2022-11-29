---
title: 无需信用卡，永久白嫖！谷歌云免费创建 RDP 远程桌面
img: "/medias/featureimages/1.jpg"
toc: true
top: false
mathjax: false
categories: 学习
tags:
  - 白嫖
keywords: 谷歌
date: 2022-11-29 15:35:15
---

## Cloud Shell 介绍

Cloud Shell 是一个可从浏览器访问的在线开发和运营环境。您可以利用其预加载了实用程序（如 `gcloud` 命令行工具、`kubectl` 等）的在线终端管理资源，还可以使用在线 Cloud Shell Editor 开发、构建、调试和部署云端应用。它有如下特点：

#### 随时随地全权访问

利用 Linux Shell 灵活地管理 Google Cloud 资源。利用 Cloud Shell，您可以在终端窗口中通过命令行访问虚拟机实例。

#### 满足开发者需求的环境

Cloud Shell Editor 经过简化，可凭借多种语言支持（例如 Go、Java、Node.js、Python 和 C#）、集成式调试程序、源代码控制、重构和可自定义的接口等功能提高工作效率，帮助您直接从浏览器中开发应用。在 Cloud Shell 虚拟机或我们的 `minikube Kubernetes` 模拟器中运行应用，直接从浏览器中进行预览，然后将更改从我们的 Git 客户端提交回您的代码库。

#### 预装了您喜爱的工具的最新版本

Cloud Shell 中已预装了您常用的许多命令行工具，从 `bash` 和 `sh` 到 `emacs` 和 `vim`，并且都保持为最新版。`gcloud` 命令行工具、MySql、Kubernetes、Docker、minikube 和 Skaffold 等管理和开发工具已经过配置并且随时可供使用，因而您不必再搜索如何安装最新版本及其所有依赖项。只要连接到 Cloud Shell 即可使用！

#### 可最大限度提高开发工作效率的 Cloud Code 工具

利用 Cloud Code 扩展程序提供的多种工具轻松开发云端应用，从而开发和部署 Kubernetes 和 Cloud Run 应用、管理集群以及将 Google Cloud API 集成到您的项目中，这一切操作都可以直接在 Cloud Shell Editor 中进行。

#### 构建新技能时直接在文档中使用 Cloud Shell

在构建新技能和学习新产品时，Cloud Shell 可以直接在文档中激活和使用，从而省去不必要的上下文切换。

#### 5 GB 永久性磁盘存储空间

Cloud Shell 提供 5GB 的永久性磁盘存储空间，作为您在 Cloud Shell 实例上的 `$HOME` 目录。您存储在主目录中的所有文件（包括脚本以及 `.bashrc` 和 `.vimrc` 等用户配置文件）在不同会话之间共享。

### 产品演示

![在运行于 Cloud Shell 中的集群中创建并部署一个 Kubernetes 留言板应用](https://lh3.googleusercontent.com/WhS3gyjmk-B3XGdOYtPsnCN6XWkbJPNk4WiTm6wF2RjjANdXcmKjzsPf6WPnvIYlWP_emz55lMYB=e14-w1502)

![从 Google Cloud Console 中启动 Cloud Shell 并检查 gcloud 组件的版本](https://lh3.googleusercontent.com/bADt-LplQDbOD3LLXc8nB4zC5GUjV0MCieIWXOUd7j7gaHL2uDuPuZt3kYdl_KoclG4OHTQp26k=e14-w1502)

### 用量配额

Cloud Shell 的默认**每周**配额为 `50` 小时。

#### 查看 Cloud Shell 每周配额

如果您达到配额，则需要等到指定的日期和时间后再使用 Cloud Shell，或者咨询您的 Cloud Shell 管理员以增加配额。

#### 申请增加配额

Cloud Shell 配额增加必须通过客户支持请求提交，且无法使用 Google Cloud Console 更新。如需申请增加配额，请联系 Cloud Customer Care（而非“结算”）。

如需详细了解配额增加流程，请参阅[配额增加请求简介(境外)](https://cloud.google.com/docs/quota#about_increase_requests)。

#### Cloud Shell 闲置

如果您在 **120** 天内无法访问 Cloud Shell，您的主磁盘会被删除。在删除之前，您会收到电子邮件通知。为防止您的主磁盘被删除，请启动会话。对于需要长期存储的敏感数据，请考虑使用 Cloud Storage 上的其他解决方案。

#### 非交互式用法

Cloud Shell 只能以交互方式使用。非交互式会话会在一小时后自动结束。Cloud Shell 会话的有效期上限为 `12` 小时，之后会话会自动终止。您可以随后立即启动新会话。

#### 磁盘存储

Cloud Shell 免费预配 5 GB 的永久性磁盘存储空间，装载为您在虚拟机实例上的 `$HOME` 目录。此存储空间按用户分配，并且可以供多个项目使用。您存储在主目录中的所有文件（包括安装的软件、脚本以及 `.bashrc` 和 `.vimrc` 等用户配置文件）在不同会话之间共享，并计入 5 GB 限额。

#### 清理磁盘空间

如果遇到 no space left on device 错误，请使用 Cloud Shell 终端从主目录中移除文件以释放空间。使用 `du -hs $(ls -A)` 命令可查看每个文件在每个子目录中使用的空间。请考虑移除不再需要的文件或占用大量存储空间。

注意：如果您不经常访问 Cloud Shell，则 `$HOME` 目录永久性存储空间可能会被回收。回收之前，系统会向您发送一封电子邮件通知。启动 Cloud Shell 会话即可防止永久性存储空间被回收。

## 常见问题

#### 连接缓慢

首次连接 Cloud Shell 时，系统需要为您创建主磁盘，目前最长可能需要 25 秒的时间。此后再与现有虚拟机实例连接时，需要大约五秒钟的时间。但是，如果您不使用 Cloud Shell 的时间达到一周，则连接性能将会变慢，因为需要从归档恢复主目录。

Cloud Shell 还提供了暂存模式，即没有永久性磁盘存储空间的 Cloud Shell 体验。[临时模式](https://cloud.google.com/shell/docs/using-cloud-shell#choosing_ephemeral_mode)可提供更快的连接性能，但在会话期间创建的所有文件都会在会话结束时**丢失**。

#### 浏览器支持？

Cloud Shell 支持最新版本的 Google Chrome、Mozilla Firefox、Microsoft Edge、Microsoft Internet Explorer 11+ 和 Apple Safari 8+。但不支持 **Safari** 的无痕浏览模式。

## Cloud Shell 白嫖开始

1. 访问并登录[谷歌云](https://cloud.google.com/)

2. 选择顶部菜单的“激活 Cloud Shell”，**激活不需要绑定信用卡**

3. 激活成功后执行以下代码

```
help
ls -all
docker run -p 8080:80 dorowu/ubuntu-desktop-lxde-vnc
```

等待半分钟左右即可安装成功，如果提示端口被占用可以修改 `8080` 为其他端口

4. 点击在“网页预览”-"在端口 8080 上预览"

5. 创建 RDP 远程桌面成功

RDP 远程桌面有效时间约 30-120 分钟；关闭 shell 窗口远程桌面会断开，可以重复执行 docker 命令重建。

好了，这次教程就到这里啦~ 如果我认为 Cloud Shell 体验不错的话，以后会继续更新的鸭！如果您认为这篇文章对您有帮助，可以考虑一下[赞助](https://afdian.net/order/create?plan_id=5931b3de017b11eca91752540025c377&product_type=0)吗？谢谢啦~
