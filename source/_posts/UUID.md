---
title: 什么是UUID？有什么用处？
img: '/medias/featureimages/8.jpg'
icon: app
date: 2022-09-27
category: 学习
tag:
  - 学习
isOriginal: false
---

UUID全称Universally Unique Identifier，即通用唯一识别码。

<!-- more -->

## 0x01 版本
UUID 是有不同的版本的，每个版本有不同的适用场景，比如，版本4 建议使用随机方式生成所有的可变因子。在很多场景下，这个其实是一个非常方便的实现方式。版本1 使用的是 时间戳＋时钟序列＋节点信息（机器信息）在一些分布式系统场景下是能严格保证全局唯一的。twitter 的 snowflake 可以看作是是 UUID 版本1 的简化版。
到现在为止，UUID 一共有5个实现版本:

 - 版本1: 严格按照 UUID 定义的每个字段的意义来实现，使用的变量因子是时间戳＋时钟序列＋节点信息（Mac地址）
 - 版本2: 基本和版本1一致，但是它主要是和 DCE（ IBM 的一套分布式计算环境）。但是这个版本在 ietf 中也没有具体描述，反而在DCE 1.1: Authentication and Security Services这篇文档中说到了具体实现。所以这个版本现在很少使用到，并且很多地方的实现也都忽略了它。
 - 版本3: 基于 name 和 namespace 的 hash 实现变量因子，版本3使用的是 md5 进行 hash 算法。
 - 版本4: 使用随机或者伪随机实现变量因子。
 - 版本5: 基于 name 和 namespace 的 hash 实现变量因子，版本5使用的是 sha1 进行 hash 算法。
不管是 UUID 的哪个版本，它的结构都是一样的，这个结构是按照版本1进行定义的，只是在其他版本中，版本1中的几个变量因子都进行了变化。

## 0x02 基本结构
UUID 长度是128bit（16字节（128位）），换算为16进制数值(每4位代表一个数值)就是有32个16进制数值组成，中间使用4个-进行分隔，按照8-4-4-4-12的顺序进行分隔。加上中间的横杆，UUID有36个字符。比如：3e350a5c-222a-11eb-abef-0242ac110002。

UUID的格式是这样的：xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx
N那个位置，只会是8,9,a,b
M那个位置，代表版本号，由于UUID的标准实现有5个版本，所以只会是1,2,3,4,5


### 壹 Timestamp - 时间戳
Timestamp 是一个 60 bits 的无符号数。对于 version 为 1 的 UUID，它从 1582-10-15 00:00:000000000 起到当前 UTC 时间，每隔 100 纳秒加一。对于无法获取UTC时间的系统，由于获取不到UTC，那么你可以统一采用localtime。（实际上一个系统时区相同就可以了）。

有了时间戳之后，结构图中的time_low，time_mid，time_hi就知道了。

`time_low`是 timestamp 60bit 中的 0～31bit，共32bit。

`time_mid`是 timestamp 60bit 中的 32～47bit，共16bit。

`time_hi_and_version`这个字段的意思很明确，就是包含两个部分，version 和 time_hi。version 占用 bit 数为4. 代表它最多可以支持31个版本。time_hi就是timestamp剩余的12bit，一共是16bit。

### 贰 Clock Sequence - 时钟序列
如果计算 UUID 的机器进行了时间调整，或者是nodeId变化了（主机更换网卡），和其他的机器冲突了。那么这个时候，就需要有个变量因子进行变化来保证再次生成的 UUID 的唯一性。

其实Clock Sequence的变化算法很简单，当时间调整，或者nodeId变化的时候，直接使用一个随机数，或者，在原先的Clock Sequence值上面自增加一也是可以的。
Clock Sequence 一共是14bit

`clock_seq_low`是 Clock Sequence 中的 0～7 bit 共8bit。
`clock_seq_hi_and_reserved`包含两个部分，reserved 和 clock_seq_hi。其中clock_seq_hi为Clock Sequence中的 8～13 bit 共6个bit，reserved是2bit，reserved 一般设置为10。
### 叁 node - 节点信息
Node 是一个 48 bits 的无符号数，对于 version 为 1 的 UUID，它选取 IEEE 802 MAC 地址，即网卡的 MAC 地址。当系统有多块网卡时，任何一块有效的网卡都可被做 Node 数据；对于没有网卡的系统，取值为随机数。

## 0x03 不同版本区别
以上内容已经把 UUID 的结构构成说明清楚了。基本上这个结构构成是 UUID version1 的定义。我们可以看到，它的变量因子包含timestamp，clock sequence，node。但在不同版本中，这几个变量因子的含义是不同的。

在version4中，timestamp，clock sequence, node都是随机或者伪随机的。

但在version3和5中，是基于name和namesapc 的hash算法生成。
其中的name 和namespace 基本上和我们很多语言的命名空间，类名一样，它的基本要求就是，name + namespace 才是唯一确定hash串的标准。换句话说，一样的namespace + name 使用相同的hash算法（比如version3的md5）
计算出来的结果必须是一样的，但是不同的 namespace 中的同样的 name 生成的结果是不一样的。

version3 和 version5 中的三个变量因子都是由hash 算法保证的，version3是md5, version5是sha1。