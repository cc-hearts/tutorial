---
title: 约束constraint
categories: Mysql
---

# 约束

![image.png](../assets/img/mysql/nrdipi/1647233661046-c6be2b05-1b2b-4a37-b46f-bf3f1ff351df.png)

# 约束的作用范围

## 列级约束

将此约束声明在对应的字段的后面

## 表级约束

在表中的所有字段都声明完 在所有字段的声明的后面添加约束

# 约束的作用

- not null 非空约束
- unique 唯一约束
- primary key 主键约束
- foreign key 外键约束
- check 检查约束
- default 默认值约束

# 添加约束

create table 时添加约束
alter table 时增加约束 删除约束

### 查看约束

```sql
select * from information_schema.TABLE_CONSTRAINTS
where TABLE_NAME = 'employees';
```

```sql
# 修改约束
alter table test01_library.test03_companyd
    modify `is` varchar(255) not null;

# 删除约束
alter table test01_library.test03_companyd
modify `is` varchar(255) null ;
```

![image.png](../assets/img/mysql/nrdipi/1647234713289-66a73852-c407-44b8-b2e3-5c3255dc3fe7.png)

![image.png](../assets/img/mysql/nrdipi/1647235205055-1af805f0-4cd7-424c-8a68-5aea004d9c23.png)

![image.png](../assets/img/mysql/nrdipi/1647237826576-a5b81bfe-143a-4d87-9d79-9cd9283538ef.png)
可以向声明 unique 的字段上添加 null 值 而且可以多次添加 null 值

## 表级约束

```sql

create table test3
(
    id        int unique,
    last_name varchar(255),
    # 表级约束
    constraint uk unique(id)
);
```

添加约束

```sql
alter table tes2
# 这里想弹雨添加了一个复合约束
add constraint uk_test_sal unique(salary,id)

alter table tes2
modify last_name varchar(15) unique;
```

# 删除唯一性的约束

添加唯一性约束的列上会自动创建唯一索引
删除唯一约束只能通过删除唯一索引的方式删除
删除时需要指定唯一索引名字 唯一索引名就是和唯一约束名一样
如果创建唯一约束时未指定名称 单列的话默认和列名相同 多列的话默认和第一个列名相同 也可以自定义唯一约束名

```sql
show index from test3;
# 删除唯一索引
alter table test3
drop index uk;
```

> 可以通过 show index from 表名称 查看表的索引

# 主键约束

![image.png](../assets/img/mysql/nrdipi/1647268978619-2d05e5a6-ea87-4985-bef9-744cd4fba71e.png)
![image.png](../assets/img/mysql/nrdipi/1647268991265-ec6ea742-ad08-4034-9d5b-787d6f51a423.png)
主键约束 ： 非空且唯一

表级约束和列级约束的区别：

```sql
create table t(
  id int primary key # 列级约束
)
cteate table t1(
  id int ,
  constraint pk_id5 primary key(id) # 表级约束 起名字没有作用  主键名总是primary
  )


```

```sql
# 添加主件约束
alter table test3
add primary key (id);

# 删除主件约束
alter table test3
drop primary key;
```

# 子增列

![image.png](../assets/img/mysql/nrdipi/1647270254308-fffd2f6b-04a5-41aa-8fea-ff13141262ec.png)

> 向主含有(auto_increment)的字段添加 0 或者 null 的时候 会自动往上添加值

```sql
insert into demo3(id,name)
values (null,'tom');

insert into demo3(id,name)
values (0,'tom');
```

在 alter table 添加主键约束

```sql
alter table d
modify id int auto_increment
```

删除主键约束

```sql
alter table d
modify id;
```

唯一键和主键都是通过删除唯一索引和主索引来删除的 所有用的搜时 drop 而修改类型用的是 modify

# sql5.7 在内存中维护了一个 auto_increment

一个字段 重启内存字段会丢失
插入的数据不再是 123（4 被删除） 5&#x20;
在此插入就是 123 4

swql8.0 能够维持持久化的数据
![image.png](../assets/img/mysql/nrdipi/1647271378505-5acabe04-7c85-4e5f-8dda-153509996839.png)
![image.png](../assets/img/mysql/nrdipi/1647271386938-efa88e55-d7e6-4d90-bcc0-5ca04bc42193.png)

# 外键约束

> 暂时跳过

```sql
# 添加外键约束
alter table emp2 # REFERENCES 后面关联的表的字段需要是主键约束
add constraint fK foreign key (`dept_id`) REFERENCES dep2(id)
```

![image.png](../assets/img/mysql/nrdipi/1647271544943-e4084dab-3b84-471f-9047-e8615755d5b6.png)
![image.png](../assets/img/mysql/nrdipi/1647271592480-47e2c830-380a-46f5-87b0-954a5d6d745a.png)

# check 约束

mysql5.7 不支持

```sql
create table de22
(
    id     int primary key,
    salary decimal(10, 2) check ( salary > 2000 )
);

# Check constraint 'de22_chk_1' is violated.
insert into de22
values (1,1500);
```

# default 约束

不赋值的默认值

```sql
alter table  d
modify salsary decimal(10,2) default 2000
 alter  table d
                       modify salary decimal(10,2)
```

![image.png](../assets/img/mysql/nrdipi/1647272325906-3a7622b1-407a-40fe-ba0b-685e5a15e37b.png)

> create database if not exists xxx character set 'utf8'
