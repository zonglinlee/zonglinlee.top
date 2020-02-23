## 关系模型
### 主键
对于关系表，有个很重要的约束，就是任意两条记录不能重复。不能重复不是指两条记录不完全相同，而是指能够通过某个字段唯一区分出不同的记录，这个字段被称为主键
对主键的要求，最关键的一点是：记录一旦插入到表中，主键最好不要再修改，因为主键是用来唯一定位记录的，修改了主键，会造成一系列的影响。
选取主键的一个基本原则是：不使用任何业务相关的字段作为主键。
因此，身份证号、手机号、邮箱地址这些看上去可以唯一的字段，均不可用作主键。
作为主键最好是完全业务无关的字段，我们一般把这个字段命名为id。常见的可作为id字段的类型有：
自增整数类型：数据库会在插入数据时自动为每一条记录分配一个自增整数，这样我们就完全不用担心主键重复，也不用自己预先生成主键；
全局唯一GUID类型：使用一种全局唯一的字符串作为主键，类似8f55d96b-8acc-4636-8cb8-76bf8abc2f57。GUID算法通过网卡MAC地址、时间戳和随机数保证任意计算机在任意时间生成的字符串都是不同的，大部分编程语言都内置了GUID算法，可以自己预算出主键。
### 联合主键
关系数据库实际上还允许通过多个字段唯一标识记录，即两个或更多的字段都设置为主键，这种主键被称为联合主键。对于联合主键，允许一列有重复，只要不是所有主键列都重复即可。没有必要的情况下，我们尽量不使用联合主键，因为它给关系表带来了复杂度的上升。
### 外键
在students表中，通过class_id的字段，可以把数据与另一张表关联起来，这种列称为外键。

外键并不是通过列名实现的，而是通过定义外键约束实现的：
ALTER TABLE students
ADD CONSTRAINT fk_class_id
FOREIGN KEY (class_id)
REFERENCES classes (id);
其中，外键约束的名称fk_class_id可以任意，FOREIGN KEY (class_id)指定了class_id作为外键，REFERENCES classes (id)指定了这个外键将关联到classes表的id列（即classes表的主键）。

通过定义外键约束，关系数据库可以保证无法插入无效的数据。即如果classes表不存在id=99的记录，students表就无法插入class_id=99的记录。

由于外键约束会降低数据库的性能，大部分互联网应用程序为了追求速度，并不设置外键约束，而是仅靠应用程序自身来保证逻辑的正确性。这种情况下，class_id仅仅是一个普通的列，只是它起到了外键的作用而已。

要删除一个外键约束，也是通过ALTER TABLE实现的：
ALTER TABLE students
DROP FOREIGN KEY fk_class_id;
注意：删除外键约束并没有删除外键这一列。删除列是通过DROP COLUMN ...实现的。
### 索引
在关系数据库中，如果有上万甚至上亿条记录，在查找记录的时候，想要获得非常快的速度，就需要使用索引。

索引是关系数据库中对某一列或多个列的值进行预排序的数据结构。通过使用索引，可以让数据库系统不必扫描整个表，而是直接定位到符合条件的记录，这样就大大加快了查询速度。
ALTER TABLE students ADD INDEX idx_score (score);
索引如果有多列，可以在括号里依次写上
ALTER TABLE students ADD INDEX idx_name_score (name, score);
索引的效率取决于索引列的值是否散列，即该列的值如果越互不相同，那么索引效率越高。反过来，如果记录的列存在大量相同的值，例如gender列，大约一半的记录值是M，另一半是F，因此，对该列创建索引就没有意义。
可以对一张表创建多个索引。索引的优点是提高了查询效率，缺点是在插入、更新和删除记录时，需要同时修改索引，因此，索引越多，插入、更新和删除记录的速度就越慢。
对于主键，关系数据库会自动对其创建主键索引。使用主键索引的效率是最高的，因为主键会保证绝对唯一。
### 唯一索引
在设计关系数据表的时候，看上去唯一的列，例如身份证号、邮箱地址等，因为他们具有业务含义，因此不宜作为主键。
但是，这些列根据业务要求，又具有唯一性约束：即不能出现两条记录存储了同一个身份证号。这个时候，就可以给该列添加一个唯一索引。
ALTER TABLE students
ADD UNIQUE INDEX uni_name (name);
也可以只对某一列添加一个唯一约束而不创建唯一索引：
ALTER TABLE students
ADD CONSTRAINT uni_name UNIQUE (name);
这种情况下，name列没有索引，但仍然具有唯一性保证。

## 查询数据
### 基本查询
SELECT * FROM <表名>
SELECT 100+200;//用于计算
虽然SELECT可以用作计算，但它并不是SQL的强项。但是，不带FROM子句的SELECT语句有一个有用的用途，就是用来判断当前到数据库的连接是否有效。许多检测工具会执行一条SELECT 1;来测试数据库连接。
### 条件查询
SELECT * FROM <表名> WHERE <条件表达式>
如果不加括号，条件运算按照NOT、AND、OR的优先级进行，即NOT优先级最高，其次是AND，最后是OR。加上括号可以改变优先级。
SELECT * FROM students WHERE score >= 80;
SELECT * FROM students WHERE score >= 80 AND gender = 'M';
SELECT * FROM students WHERE score >= 80 OR gender = 'M';
SELECT * FROM students WHERE NOT class_id = 2;
SELECT * FROM students WHERE (score < 80 OR score > 90) AND gender = 'M';
### 投影查询
只希望返回某些列的数据，而不是所有列的数据，我们可以用SELECT 列1, 列2, 列3 FROM ...，让结果集仅包含指定列。这种操作称为投影查询。
SELECT id, score, name FROM students;
SELECT 列1 别名1, 列2 别名2, 列3 别名3 FROM ...
SELECT id, score points, name FROM students  WHERE gender = 'M';
### 排序
使用SELECT查询时，细心的读者可能注意到，查询结果集通常是按照id排序的，也就是根据主键排序。这也是大部分数据库的做法。如果我们要根据其他条件排序怎么办？可以加上ORDER BY子句。默认的排序规则是ASC：“升序”，即从小到大。
SELECT id, name, gender, score FROM students WHERE class_id = 1 ORDER BY score;
SELECT id, name, gender, score FROM students ORDER BY score DESC;//按照score倒序排列
SELECT id, name, gender, score FROM students ORDER BY score DESC, gender;//先按照score降序排列，如果分数相同再按照gender排序
### 分页查询
分页实际上就是从结果集中“截取”出第M~N条记录。这个查询可以通过LIMIT <M> OFFSET <N>子句实现，随着N越来越大，查询效率也会越来越低。
分页查询的关键在于，首先要确定每页需要显示的结果数量pageSize（这里是3），然后根据当前页的索引pageIndex（从1开始），确定LIMIT和OFFSET应该设定的值：
LIMIT总是设定为pageSize；
OFFSET计算公式为pageSize * (pageIndex - 1)

SELECT id, name, gender, score FROM students ORDER BY score DESC LIMIT 3 OFFSET 0;//先排序再分页，对结果集从0号记录开始，最多取3条。注意SQL记录集的索引从0开始。
### 聚合查询
对于统计总数、平均数这类计算，SQL提供了专门的聚合函数，使用聚合函数进行查询，就是聚合查询，它可以快速获得结果。COUNT/SUM/AVG/MAX/MIN
SELECT COUNT(*) FROM students;//查询一个表有多少条记录
COUNT(*)表示查询所有列的行数，要注意聚合的计算结果虽然是一个数字，但查询的结果仍然是一个二维表，只是这个二维表只有一行一列，并且列名是COUNT(*)
通常，使用聚合查询时，我们应该给列名设置一个别名，便于处理结果
SELECT COUNT(*) num FROM students;
SELECT COUNT(*) boys FROM students WHERE gender = 'M';
如果聚合查询的WHERE条件没有匹配到任何行，COUNT()会返回0，而SUM()、AVG()、MAX()和MIN()会返回NULL
对于聚合查询，SQL还提供了“分组聚合”的功能。聚合查询的列中，只能放入分组的列
SELECT class_id, COUNT(*) num FROM students GROUP BY class_id;
### 多表查询
使用多表查询可以获取M x N行记录；多表查询的结果集可能非常巨大，要小心使用
SELECT * FROM <表1> <表2>
SELECT * FROM students, classes;//查询的结果也是一个二维表，它是students表和classes表的“乘积”，即students表的每一行与classes表的每一行都两两拼在一起返回。结果集的列数是students表和classes表的列数之和，行数是students表和classes表的行数之积。
SELECT
    s.id sid,
    s.name,
    s.gender,
    s.score,
    c.id cid,
    c.name cname
FROM students s, classes c
WHERE s.gender = 'M' AND c.id = 1; //设置表的别名简化写法，设置列的别名去除列重名
### 连接查询
连接查询是另一种类型的多表查询，连接查询对多个表进行JOIN运算，简单地说，就是先确定一个主表作为结果集，然后，把其他表的行有选择性地“连接”在主表结果集上。
SELECT s.id, s.name, s.class_id, c.name class_name, s.gender, s.score FROM students s INNER JOIN classes c
ON s.class_id = c.id;
内连接——INNER JOIN 获取交集
外连接—— LEFT OUTER JOIN/RIGHT OUTER JOIN/FULL OUTER JOIN


## 修改数据
### INSERT
INSERT INTO <表名> (字段1, 字段2, ...) VALUES (值1, 值2, ...);
id字段是一个自增主键，它的值可以由数据库自己推算出来。此外，如果一个字段有默认值，那么在INSERT语句中也可以不出现
//一次插入多条语句
INSERT INTO students (class_id, name, gender, score) VALUES
  (1, '大宝', 'M', 87),
  (2, '二宝', 'M', 81);
### UPDATE
UPDATE <表名> SET 字段1=值1, 字段2=值2, ... WHERE ...;
在UPDATE语句中，更新字段时可以使用表达式。
UPDATE students SET name='大牛', score=66 WHERE id=1;
//一次性更新多条记录
UPDATE students SET name='小牛', score=77 WHERE id>=5 AND id<=7;
UPDATE students SET score=score+10 WHERE score<80;
//要特别小心的是，UPDATE语句可以没有WHERE条件,这时，整个表的所有记录都会被更新
UPDATE students SET score=60;
### DELETE
DELETE FROM <表名> WHERE ...;
DELETE FROM students WHERE id=1;
DELETE FROM students WHERE id>=5 AND id<=7;
DELETE FROM students;(小心操作)