---
title: sql 实践
---

## 分组之后根据时间查出最新的一条记录

```sql

select * from
             exam_paper e
inner join (select MAX(exam_paper.create_time) ct,version_id
from exam_paper group by exam_paper.version_id having MAX(exam_paper.create_time)) e1
on e.create_time = e1.ct and e1.version_id = e.version_id;
```
