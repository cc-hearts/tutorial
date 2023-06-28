---
title: Linux 基础
---

## 目录结构

> 在 linux 中 一切皆为文件
> cd ：change directory

```shell
lrwxrwxrwx.  1 root root     7 Jul 11  2019 bin -> usr/bin

dr-xr-xr-x.  5 root root  4096 Sep  2 09:06 boot

drwxr-xr-x  19 root root  2980 Aug 22 12:32 dev

drwxr-xr-x. 77 root root  4096 Sep  2 09:04 etc

drwxr-xr-x.  3 root root  4096 Aug 20 12:58 home

lrwxrwxrwx.  1 root root     7 Jul 11  2019 lib -> usr/lib

lrwxrwxrwx.  1 root root     9 Jul 11  2019 lib64 -> usr/lib64

drwx------.  2 root root 16384 Jul 11  2019 lost+found

drwxr-xr-x.  2 root root  4096 Apr 11  2018 media

drwxr-xr-x.  2 root root  4096 Apr 11  2018 mnt

drwxrwxr-x.  4 root root  4096 Aug 22 13:08 opt

dr-xr-xr-x  89 root root     0 Aug 22 12:03 proc

dr-xr-x---. 10 root root  4096 Aug 22 13:17 root

drwxr-xr-x  25 root root   680 Sep  2 09:09 run

lrwxrwxrwx.  1 root root     8 Jul 11  2019 sbin -> usr/sbin

drwxr-xr-x.  2 root root  4096 Apr 11  2018 srv

dr-xr-xr-x  13 root root     0 Aug 22 20:03 sys

drwxrwxrwt.  8 root root  4096 Sep  2 09:09 tmp

drwxr-xr-x. 13 root root  4096 Jul 11  2019 usr

drwxr-xr-x. 19 root root  4096 Jul 11  2019 var
```

01. `bin` 目录 指令集管理目录
02. `dev` 设备管理目录(硬件管理)
03. `lib lib64` 都是库管理目录
04. `mdia` dvd、光驱、u 盘等管理目录文件
05. `opt` 用于需要安装的软件 管理目录
06. `proc src sys` 内核文件
07. `root` root 用户文件
08. `sbin` 高权限指令目录文件
09. `sys` 系统文件
10. `tmp` 临时文件夹
11. `usr` 用户文件夹
12. `var` 变量、日志文件夹
13. `lost+found` 系统非法关机后 这里就存放了一些文件
14. `etc` 所有系统管理所需要的配置文件和子目录
15. `boot` 启动 Linux 时的使用的一些核心文件

## vi 和 vim

> 所有的 Linux 系统都会内建 vi 文本编辑器
> `vim` 可以理解为 vi 的增强版

### 三种模式

01. 正常模式
02. 编辑模式
   按下 `i` 进入编辑模式
03. 命令行模式
   按下 `esc` 进入 命令行模式 `w` 代表写入 `q` 代表退出 `q!` 强制退出

## 常用快捷键

01. 复制：yy 复制当前行 p 粘贴 (3yy 复制当前行往下的 3 行 包括当前行)
02. 删除：dd 删除当前行 5dd 删除当前行下的 5 行
03. 查找： 按下 `/` 输入关键字 按下 回车查找
04. 快速到文档的最末行[G] 快速到文档的首行[gg]
05. 设置行号：`set nu` 显示行号 `set nonu`取消行号
06. 撤销上一个动作 按下`u`

   > 更多资料:

## 关机重启指令

```shell
shutdown -h now #立即关机
shutdown -h 1 #一分钟后关机
shutdown -r now #现在重新启动计算机
halt #关机
reboot # 重启计算机
sync #把内存的数据同步到磁盘 建议在关机和重启的时候优先执行
```

## 用户操作命令

```shell
 logout #退出用户登录 在运行级别3下有效
```

### 添加用户

```shell
useradd <用户名> # 如果没有指定组 则会创建一个与用户名同名的组 并且会将用户添加到改组下

# cd /home
# ll 便可以看到有用户名的一个文件夹

user -d <path> <用户名> # 创建用户名的时候指定home的目录 可以在登录的时候
# 如果先创建了文件夹 在使用该命令创建用户 则用户不会绑定用户组

useradd -g <用户组> <用户名> 添加用户到用户组内
```

> `home` 目录会存在用户组

### 给用户修改密码

```shell
passwd <用户名> # 修改用户名的密码
```

### 删除用户

```shell
userdel <用户名> # 删除用户 但是不会删除用户名

userdel -r <用户名> # 删除用户的时候 并且删除用户的家目录

## cd /home

## ll # 可以查看到用户的家目录

# 尽量删除用的时候 保留家目录
```

### 查询用户

```shell
id <用户名>

# id xm
# uid=1001(xm) gid=1001(xm) groups=1001(xm)
# uid 用户id gid 组id groups 组的名次

```

# 3# 切换用户

```shell
su - <用户名> # 高权限用户切换到低权限的用户 不需要密码

# 如果切换过去了 则可以使用exit 退出当前用户 返回到原来的用户
```

### 查看当前的用户

```
whoami # 查看当前的用户名
```

## 用户组

类似于角色 系统可以对有共性的多个用户进行统一的管理

### 新增用户组

```shell
groupadd <用户组名称>

# 添加用户时直接加上组

# 1.先创建组 groudadd tmp-group
# 2. 添加用户到组内
# useradd -g tmp-group <用户名>
# 给新增的用户分配了用户组名之后 家目录是根据用户组来的 而不是用户
```

### 删除用户组

```shell
 groupdel <用户组名称>
```

### 修改用户组

```shell
groupmod -g <用户组> <用户名>
```

## 用户和组的配置文件

```shell
/etc/passwd #用户配置文件 记录用户的信心

# admin:x:1000:1000::/home/admin:/bin/bash
# 用户名:<密码>:uid:groupId::<家目录>:<用户对应的shell>
```

```shell
/etc/shadow # 口令的配置文件
# xh:$6$.jpaLSwV$FbHHY80WEtQB.PmWC0OIUYErEqMRW8yo5pof5pcAahybxIKIpAGA1q0sNhPT2rQ/ajGXXgYYso1osxEIGBktg/:19238:0:99999:7:::

# xx:$6$u9PDyMSZ$2naZywjtQyVQvUtawf/2OaBYEp6zcEN5BfGYES.B/pPGBrOxSZDSTPk5X4H6tLhqEFcF7gnCvspaUEvjw.HXy1:19238:0:99999:7:::
```

```shell
/ect/group # 组配置文件

# 组名:口令(加密):组的标识符(id):
```

## 指令

系统的运行级别配置文件: `/etc/inittab`

切换到指定运行级别的指令:

```shell
init [0 | 1 | 2 | 3 | 5 | 6]
```

> 运行级别
> 0 关机
> 1 单用户（找回丢失密码）
> 2 多用户状态没有网络服务
> 3 多用户状态有网络服务
> 4 系统未使用保留给用户
> 5 图形界面
> 6 系统重启

### 帮助指令

```shell
# man [命令或配置文件] # 获得帮助信息

man ls

man help
```

```shell
help [命令] # 获取shell 内置的命令的信息
```

### 文件目录指令

```shell
pwd #显示当前工作目录的绝对路径
```

#### ls 指令

```shell
ls [选项] [目录或者文件]

# -a 显示当前目录所有文件和目录 包括隐藏的
# -l 以列表的方式显示信息

ls -l
ls -a
ls -la
ls -lh # 输出人类看懂的展示
```

#### cd 指令

```shell
cd
cd ~
# 都是回到家目录下面
```

#### mkdir 指令

```shell
mkdir /home/tmpFile # 在home目录下面创建 tmpFile 目录

mkdir -p /home/animal/snake # -p 可以创建多级目录

# mkdir -p /home/animal/snake 在 home的下创建了多级目录 animal/snake
```

> 删除目录:

```shell
rmdir /home/animal/snake #rmdir 删除的是空目录 如果目录下面有内容 是无法删除的

# 强删除
rm -rf ./[文件目录/文件名]
```

#### touch 指令

```shell
touch [文件名] [文件名] ... # 可以一次性创建多个文件
```

#### cp 指令

```shell
cp [选项] source dest  # 拷贝文件需要加-r
-r 递归复制整个文件
\cp -r source dest # 强制覆盖
```

#### rm 指令

移除文件目录

```shell
rm [选项] 要删除的文件或者目录

-r递归删除
-f 强制删除不提示
```

#### mv 指令

重命名或者移动文件目录

```shell
mv oldName newName # 重命名

mv /tmp/moveFile /tmp # 移动文件
```

#### cat 指令

`cat` 指令查看文件的内容 `cat` 以只读的方式打开

```shell
cat [选项] 要查看的文件

-n 显示行号

cat -n/etc/profile | more #分页显示

# 分页之后的操作：

# space 往后翻页

# enter 向下一行

# q 离开more状态

# ctrl + F 向下滚动一屏

# ctrl + B 返回上一屏

# = 输出当前的行号

# :f  输出文件名和当前行的行号
```

`cat` 追加内容 并且覆盖

```shell
cat > /etc/mysql/my.cnf <<END
# 追加的追加内容
END
```

`cat` 交互式追加内容

```shell
cat > /etc/mysql/my.cnf << EOF
# 交互式输入内容，可以把文本通过复制粘贴的方式添加到>提示符后面
EOF
```

#### less 指令

less 指令用来分屏查看文件的内容 其功能 与 more 相似 但是比 more 的指令更加强大 他能够按需加载内容

> 推荐大型文件使用 less 命令查看

#### > 指令 和 >> 指令

输入重定向或者追加

```shell
> 指令 覆盖
>> 指令追加

ls -l > a.txt # 将列表的描述文件写入到 a.txt中

# 用例：
cat /etc/profile > a.txt

echo hello > a.txt
```

#### echo 指令

输出环境变量到控制台

```shell
echo $PATH
```

#### head 指令

显示文件的开头部分的内容 默认显示的是前 10 行的内容

```shell
head aaaa.txt
head aaaa.txt -n 5 # 显示前5行的内容
```

#### tail 指令

tail 用于输出文件中尾部的内容 默认情况下显示文件的后 10 行内容

```shell
tail 文件

tail -n 5 文件

tail -f 文件 # 实时追踪该文档的所有更新 有变化就会显示在终端上 比较常用
```

#### ln 指令

类似于 windows 的快捷方式 创建一个软连接的方式 主要存放了连接其他文件的路径

```shell
ln -s [原文件或目录] [软连接名]
ln -s /tmp/detail mydetail

# 进入软连接后 使用pwd 还是看到的是当前的目录 不是软链接指向的目录
```

#### history 指令

查看已经执行过的历史指令 也可以执行历史指令

```shell
history 10 # 显示最近的10条历史指令

# 执行历史指令

!233 # 233是历史指令的前面的编号 可以使用history 查看
```

### 时间日期类

#### date 指令 显示当前日期

```shell
date # 显示当前的时间

date +%Y 显示当前年份
date +%m 显示月份
date +%d 显示当前是哪一天

date "+%Y-%m-%d %H:%M:%S" #显示年月日时分秒
```

##### 设置系统时间

```shell
date -s "2018-01-01 12:12:12"
```

#### cal 指令 显示当前的日历

```shell
cal # 显示当前的日历

cal 2020 #显示2020年的日历
```

### 查找指令

#### find 指令

find 指令将从指定的目录乡下递归的遍历其各个子目录 将满足条件的文件或者目录显示在终端

```shell

find [搜索范围] [选项]

find /home d.txt

# 选项说明
# -name <查询方式> 按照指定的文件名查找模式查找文件
find -name a.txt

find -name *.txt
# -user <用户名> 查找属于指定用户名的所有文件
find /etc -user root
# -size <文件大小> 按照指定的文件大小查找文件
find -size +20M # 查找文件大于20M
# +n 大于 -n小于 n等于
```

#### locate 指令

locate 指令可以快速定位文件的路径 使用之前需要使用 `updatedb` 创建 `locate` 数据库

#### grep 过滤查找

grep 可以过滤查找数据
管道符 `|` 表示将前一个命令的处理结果输出传递给后面的命令处理

```shell
grep [选项] 查找内容 源文件

grep -n aa hello.txt
# 常用选项
-n 显示匹配行以及行号
-i 忽略字母大小写

# 也可以使用管道符操作
cat hello.txt | grep -n aa # 显示hello.txt中包含aa的行
```

### 压缩指令

#### gzip 指令

```shell
gzip 文件 # 将文件压缩成.gz文件 压缩完成后 原先的文件会被删除
gunzip 文件.gz # 解压缩文件
```

#### zip 指令

```shell
zip [选项] <xxx.zip> <path>

zip -r package.zip /home/ # 将home目录文件压缩到 package.zip中

# -r 递归压缩目录
unzip [选项] xxx.zip

unzip -d /opt/tmp package.zip # 解压到指令的文件夹中
```

#### 打包指令

tar 指令 打包指令 打包过后的文件是.tar.gz 的文件

```shell
tar [选项] xxx.tar.gz <打包的内容>

# -c 产生 .tar打包文件
# -v 显示详细信息
# -f 指定压缩后的文件名
# -z 打包同时压缩

tar -zcvf package.tar.gz a.txt b.txt # 将 a.txt b.txt压缩

tar -zcvf package.tar.gz aaaa.txt hello.tx

tar -zcvf pack.tar.gz /tmp/ # 打包tmp下面的所有文件
# -x 解包.tar文件
tar -zxvf package.tar.gz # 解压到当前的目录

tar -zxvf package.tar.gz -C /opt # 解压到指定的目录下 目录需要事先存在
```

##

* ps -ef
* df -h

## scp 传输指令

```shell
# 从本地将文件传输到服务器
scp【本地文件的路径】【服务器用户名】@【服务器地址】：【服务器上存放文件的路径】

# 从本地将文件夹传输到服务器
scp -r【本地文件的路径】【服务器用户名】@【服务器地址】：【服务器上存放文件的路径】
scp -r ./dist root@8.210.91.28:/tmp/nigix

# 将服务器上的文件传输到本地
scp 【服务器用户名】@【服务器地址】：【服务器上存放文件的路径】【本地文件的路径】

scp root@8.210.91.28:/tmp/nest.tar ./

# 将服务器上的文件夹传输到本地
scp -r 【服务器用户名】@【服务器地址】：【服务器上存放文件的路径】【本地文件的路径】
```

## 查看进程

> https://cloud.tencent.com/developer/article/1711858

```shell
ps aux
```

## 查看端口占用情况

```shell
lsof -i:端口号
```

> https://www.runoob.com/w3cnote/linux-check-port-usage.html

## kill进程

在查到端口占用的进程后，如果你要杀掉对应的进程可以使用 kill 命令：

```shell
kill -9 PID
```
