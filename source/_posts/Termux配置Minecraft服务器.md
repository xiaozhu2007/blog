---
title: Termux安装Java并配置Minecraft服务器
img: /medias/featureimages/6.jpg
icon: app
category: 学习
tag:
  - Termux
  - Java
  - Minecraft
isOriginal: true
abbrlink: 13849
date: 2021-08-27 00:00:00
updated: 2022-11-30 20:10:42
---

本篇文章将以一个小白的身份教您如何用 Termux 安装 Java 并配置 Minecraft 服务器。

<!-- more -->

## Termux 下载

> 2022/11/30 更新：
> 值得注意的是，`Termux` 更新速度越来越慢了，所以如果您看到 `F-droid` 上的 `Termux` 10 个月没更新，大可不必去管它

Termux 官网：
https://termux.com/

官网推荐下载地址：
https://f-droid.org/packages/com.termux/

Termux Github 下载：
https://github.com/termux/termux-app/releases

## 下载 Java 包

> 此处为了演示，使用 Java8（理论支持 Java11 和 16）

### 下载解压

> 2022/11/01 更新：
>
> 当前 Termux 已支持安装 openjdk-17，打开终端，输入如下命令安装
> `pkg update && pkg install openjdk-17 -y`
> 即可

#### 下载 jdk8/11

[JDK8 下载地址](https://www.oracle.com/java/technologies/javase/javase-jdk8-downloads.html)
[JDK11 下载地址](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)

我下载的是：jdk-8u291-linux-aarch64.tar.gz（Java11 是 jdk-11.0.10_linux-aarch64_bin.tar.gz）
解压：

```bash
tar -zxvf jdk-8u291-linux-aarch64.tar.gz
```

_or Java11_

```bash
tar -zxvf jdk-11.0.10_linux-aarch64_bin.tar.gz
```

解压到一个好记的目录就可以了。
我解压的目录是：/data/data/com.termux/files/home/java/jdk8/

#### 修改环境变量

配置`vim ~/.zshrc`，增加如下内容：

```bash
#JDK8
export JAVA_HOME=/data/data/com.termux/files/home/java/jdk8
export PATH=$PATH:$JAVA_HOME/bin:.
export CLASSPATH=$JAVA_HOME/lib/tools.jar:$JAVA_HOME/lib/dt.jar:.
```

这样 jdk 就配置完成了。

```bash
java --version #查看Java版本
```

---

## 下载服务端 Jar 包

### 了解各种服务端

Minecraft 中的服务器有着几种分类：

- [原版服务器](https://minecraft.net/zh-hans/download/server/)，也就是 Mojang 官方提供的服务器，可以保证稳定，缺点是不支持插件或模组

- 插件服务器，也就是支持插件的服务器，一般相较于原版优化更多，可以加入插件 例如：[Paper](https://papermc.io/downloads)/[Purpur](https://purpurmc.org/)/[Spigot](https://hub.spigotmc.org/jenkins/job/BuildTools/)/Bukkit

- 模组服务器，也就是支持使用模组的服务器，相较于前两种玩法更多，但是模组多了可能会卡顿 例如：Fabric/Forge

- 混合服务器，也就是同时支持模组和插件的服务器，这种服务器一般不支持太多版本，而且有些模组可能不支持，插件也可能会出错 例如：Mohist/CatServer

Minecraft 服务端有多个版本，下面是部分服务端下载链接：

官方服务端(推荐)：https://mcversions.net/

Purpur 服务端(在保留 Paper 优化同时拥有更多配置)：https://purpurmc.org/

Spigot 服务端(需自行构建)：https://hub.spigotmc.org/jenkins/job/BuildTools/

Sponge 服务端：https://www.spongepowered.org/

回到终端，继续输入

```bash
cd ~
mkdir mc
cd mc
wget https://api.papermc.io/v2/projects/paper/versions/1.19.2/builds/230/downloads/paper-1.19.2-230.jar #1.19.2 Paper 第230次构建
echo "java -jar server.jar nogui" > start.sh
bash start.sh
```

首次启动会失败，需要**手动**接受《最终用户许可协议》（EULA）

```bash
# 不过我把它打包成了一键修改命令
sed -i 's/eula=false/eula=true/g' eula.txt
```

主配置文件是 server.properties，其中大部分配置在这里进行修改

比如：启用离线模式（盗版可进）

```bash
# 同上，一键修改命令
sed -i 's/online-mode=true/online-mode=false/g' server.properties
```

## 优化

注意：这个栏目仅针对 Paper 以及 Purpur

- [Purpur 端生电向配置](https://www.bilibili.com/read/cv18220927)

> 首先，Paper 默认是不允许 tnt、铁轨和地毯的复制，以及破基岩、刷沙等特性的，但是可以通过开关开启 tnt 铁轨地毯复制和破基岩，其他的都不行，只能改源码

paper 关于刷沙的 issue：https://github.com/PaperMC/Paper/issues/3724

```YAML
# paper.yml
# ......
settings:
  unsupported-settings:
    allow-piston-duplication: true # 开启TNT复制、地毯复制和铁轨复制
    allow-permanent-block-break-exploits: true # 开启破坏不可破坏方块（如基岩、末地传送门）
    allow-headless-pistons: false # 开启无头活塞
messages: # 各种情况下显示的消息（已汉化）
  no-permission: '&c对不起，您无权使用该指令
    如果您觉得这是一个错误，请联系管理员'
  kick:
    authentication-servers-down: 'Mojang验证服务器离线!'
    connection-throttle: Connection throttled! Please wait before reconnecting.
    flying-player: 服务器未开启飞行
    flying-vehicle: 服务器未开启飞行
world-settings:
  default:
    baby-zombie-movement-modifier: 0.5 # 小僵尸相对于正常生物快多少，如0.5就是正常僵尸的速度*1.5,
    experience-merge-max-value: -1 # 经验球合并成一个的最大值
    grass-spread-tick-rate: 1 # 草方块传播速度，越大越慢，以tick为单位
    disable-ice-and-snow: false # 是否关闭冰与雪的形成，同时还会导致炼药锅不能被雨/雪填满
    disable-thunder: false # 是否关闭雷雨天
    disable-explosion-knockback: false # 是否关闭爆炸带来的击退效果
    all-chunks-are-slime-chunks: false # 史莱姆能否在所有区块生成
    game-mechanics:
      disable-player-crits: false # 关闭玩家暴击
      shield-blocking-delay: 5 # 盾牌被斧子击中后的禁用时间
      disable-chest-cat-detection: false # 猫在箱子上时能否开启箱子
      disable-pillager-patrols: false # 关闭掠夺者巡逻队
      pillager-patrols:
        spawn-chance: 0.2 #巡逻队生成几率
        spawn-delay:
          per-player: false
          ticks: 12000 # 巡逻队几tick尝试生成一次
        start:
          per-player: false
          day: 5
    anti-xray: # Antixray设置
      enabled: false
      # Anti-Xray has two different modes.
      # engine-mode: 1 replaces specified blocks (hidden-blocks) with other "fake" blocks, stone (deepslate at y < 0), netherrack, or end_stone based on the dimension.
      # In contrast, engine-mode: 2 will replace both hidden-blocks and replacement-blocks with randomly generated hidden-blocks.
      engine-mode: 1
      max-chunk-section-index: 3
      update-radius: 2 # 更新雷达
      lava-obscures: false
      use-permission: false # 用权限管理
      hidden-blocks: # 隐藏的方块
        # You can add air here such that many holes are generated.
      # This works well against cave finders but may cause client FPS drops for all players.
      # - air
      - gold_ore
      - iron_ore
      - coal_ore
      - lapis_ore
      - mossy_cobblestone
      - obsidian
      - chest
      - diamond_ore
      - redstone_ore
      - clay
      - emerald_ore
      - ender_chest
      # As of 1.18 some ores are generated much higher.
      # Please adjust the max-block-height setting at your own discretion.
      # https://minecraft.fandom.com/wiki/Ore might be helpful.
      max-block-height: 64
      replacement-blocks: # 使用这些方块来替换
      - stone
      - oak_planks
    door-breaking-difficulty: # 生物破门的难度
        zombie:
        - HARD
        vindicator:
        - NORMAL
        - HARD
    fishing-time-range: # 钓鱼所需的tick
      MinimumTicks: 100
      MaximumTicks: 600
    max-growth-height: # 植物最多能长多高
      cactus: 3
      reeds: 3
      bamboo:
        max: 16
        min: 11
# ......
```
