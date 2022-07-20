---
title: Termux安装Java并配置Minecraft服务器
img: '/medias/featureimages/6.jpg'
icon: app
date: 2021-08-27
category: 软件
tag:
  - Git
  - Termux
  - Java
  - Minecraft
isOriginal: true
---

本篇文章将以一个小白的身份教您如何用Termux安装Java并配置Minecraft服务器。
<!-- more -->

## Termux下载
Termux官网：
https://termux.com/

官网推荐下载地址：
https://f-droid.org/packages/com.termux/

## 下载Java包

> 此处为了演示，使用Java8（理论支持Java11和16）

### 下载解压

#### 下载jdk8/11
[JDK8下载地址](https://www.oracle.com/java/technologies/javase/javase-jdk8-downloads.html)
[JDK11下载地址](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)

我下载的是：jdk-8u291-linux-aarch64.tar.gz（Java11是jdk-11.0.10_linux-aarch64_bin.tar.gz）
解压：
```bash
tar -zxvf jdk-8u291-linux-aarch64.tar.gz
```
*or Java11*
```bash
tar -zxvf jdk-11.0.10_linux-aarch64_bin.tar.gz
```
解压到一个好记的目录就可以了。
我解压的目录是：/data/data/com.termux/files/home/java/jdk8/

#### 修改环境变量
配置`vim ~/.zshrc`，增加如下内容：
```Bash
#JDK8
export JAVA_HOME=/data/data/com.termux/files/home/java/jdk8
export PATH=$PATH:$JAVA_HOME/bin:.
export CLASSPATH=$JAVA_HOME/lib/tools.jar:$JAVA_HOME/lib/dt.jar:.
```
这样jdk就配置完成了。

```Bash
java --version #查看Java版本
```
---
### 下载服务端Jar包

下载最新版服务器端jar包，minecraft服务端有多个版本，下面是部分服务端下载链接：

官方服务端最新版本：https://minecraft.net/zh-hans/download/server/

官方客户端、服务端所有版本(推荐)：https://mcversions.net/

papermc服务端：https://papermc.io/downloads

spigot服务端(需自行构建)：https://hub.spigotmc.org/jenkins/job/BuildTools/

sponge服务端：https://www.spongepowered.org/

回到终端，继续输入
```bash
cd ~
mkdir mc 
cd mc 
wget https://launcher.mojang.com/v1/objects/1b557e7b033b583cd9f66746b7a9ab1ec1673ced/server.jar #1.16.5官方
echo "java -jar server.jar" > start.sh
bash start.sh
```
首次启动会失败，需要手动接受《最终用户许可协议》End-User License Agreement（EULA）
```bash
# 一键修改命令
sed -i 's/eula=false/eula=true/g' eula.txt
```
主配置文件是server.properties，其中大部分配置在这里进行修改

比如：启用离线模式（盗版可进）

```bash
sed -i 's/online-mode=true/online-mode=false/g' server.properties
```